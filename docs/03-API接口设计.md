# AIHues v8 API 接口设计

> **协议**: Next.js Server Actions（无 REST API，直接调用函数）
> **类型**: TypeScript（端到端类型安全）
> **认证**: NextAuth.js (OAuth + JWT)

---

## 为什么选择 Server Actions？

传统 REST API 需要写路由 + 控制器 + 服务层，Next.js 14 的 Server Actions 让前端直接调用后端函数，省去所有样板代码：

```typescript
// 前端直接调用，像本地函数一样
const result = await submitRating({ toolId: "json", score: 5 })
// 自动处理：序列化、HTTP请求、认证、错误处理
```

---

## 认证相关 (NextAuth.js 自动处理)

| 端点 | 方法 | 说明 |
|------|------|------|
| `/api/auth/signin` | POST | 登录（GitHub/Google/邮箱） |
| `/api/auth/signout` | POST | 退出 |
| `/api/auth/session` | GET | 获取当前会话 |
| `/api/auth/providers` | GET | 可用登录方式 |

不需要手动写这些，NextAuth.js 自动提供。

---

## 工具相关

### 获取工具列表

```typescript
// app/actions/tools.ts
'use server'

import { prisma } from '@/lib/prisma'

export async function getTools(filter?: {
  category?: 'DEV' | 'UTILITY' | 'AI_WRITING' | 'GAME'
  search?: string
  sortBy?: 'name' | 'rating' | 'uses' | 'newest'
  limit?: number
}) {
  return prisma.tool.findMany({
    where: {
      ...(filter?.category && { category: filter.category }),
      ...(filter?.search && {
        OR: [
          { name: { contains: filter.search, mode: 'insensitive' } },
          { description: { contains: filter.search, mode: 'insensitive' } },
          { tags: { has: filter.search } },
        ],
      }),
    },
    orderBy: filter?.sortBy === 'rating' ? { avgRating: 'desc' }
      : filter?.sortBy === 'uses' ? { totalUses: 'desc' }
      : filter?.sortBy === 'newest' ? { createdAt: 'desc' }
      : { order: 'asc' },
    take: filter?.limit || 100,
    include: {
      _count: { select: { ratings: true, favorites: true } },
    },
  })
}
```

**调用示例**:
```typescript
const tools = await getTools({ category: 'DEV', sortBy: 'rating', limit: 10 })
```

---

### 获取单个工具详情

```typescript
export async function getToolBySlug(slug: string) {
  return prisma.tool.findUnique({
    where: { slug },
    include: {
      ratings: {
        orderBy: { createdAt: 'desc' },
        take: 20,
        include: {
          user: { select: { name: true, avatar: true } },
        },
      },
      _count: { select: { ratings: true, favorites: true } },
    },
  })
}
```

---

### 记录工具使用

```typescript
export async function recordToolUsage(toolId: string, duration?: number) {
  const session = await auth() // NextAuth 获取当前用户
  
  // 记录使用
  await prisma.toolUsage.create({
    data: {
      userId: session?.user?.id || 'anonymous',
      toolId,
      duration,
    },
  })
  
  // 更新工具使用计数
  await prisma.tool.update({
    where: { id: toolId },
    data: { totalUses: { increment: 1 } },
  })
  
  return { success: true }
}
```

---

## 评分系统

### 提交评分

```typescript
// app/actions/ratings.ts
'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function submitRating(data: {
  toolId: string
  score: number  // 1-5
  review?: string
}) {
  const session = await auth()
  if (!session?.user) {
    return { error: '请先登录' }
  }
  
  // 验证分数
  if (data.score < 1 || data.score > 5) {
    return { error: '评分必须在 1-5 之间' }
  }
  
  // 创建或更新评分
  const rating = await prisma.rating.upsert({
    where: {
      userId_toolId: {
        userId: session.user.id,
        toolId: data.toolId,
      },
    },
    update: {
      score: data.score,
      review: data.review,
    },
    create: {
      userId: session.user.id,
      toolId: data.toolId,
      score: data.score,
      review: data.review,
    },
  })
  
  // 重新计算平均分
  const stats = await prisma.rating.groupBy({
    by: ['toolId'],
    where: { toolId: data.toolId },
    _avg: { score: true },
    _count: { score: true },
  })
  
  await prisma.tool.update({
    where: { id: data.toolId },
    data: {
      avgRating: stats[0]?._avg.score || 0,
      totalRatings: stats[0]?._count.score || 0,
    },
  })
  
  // 刷新页面缓存
  revalidatePath(`/tools/${data.toolId}`)
  
  return { success: true, rating }
}
```

---

### 获取工具评分

```typescript
export async function getToolRatings(toolId: string, page = 1) {
  const perPage = 20
  
  const [ratings, total] = await Promise.all([
    prisma.rating.findMany({
      where: { toolId },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * perPage,
      take: perPage,
      include: {
        user: { select: { name: true, avatar: true } },
      },
    }),
    prisma.rating.count({ where: { toolId } }),
  ])
  
  return {
    ratings,
    pagination: {
      page,
      perPage,
      total,
      totalPages: Math.ceil(total / perPage),
    },
  }
}
```

---

## 用户系统

### 获取当前用户信息

```typescript
// app/actions/user.ts
'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function getCurrentUser() {
  const session = await auth()
  if (!session?.user) return null
  
  return prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      achievements: {
        include: { achievement: true },
        orderBy: { unlockedAt: 'desc' },
      },
      favorites: {
        include: { tool: true },
      },
      _count: {
        select: {
          ratings: true,
          toolUsages: true,
          achievements: true,
        },
      },
    },
  })
}
```

---

### 更新用户资料

```typescript
export async function updateUserProfile(data: {
  name?: string
  avatar?: string
}) {
  const session = await auth()
  if (!session?.user) {
    return { error: '未登录' }
  }
  
  return prisma.user.update({
    where: { id: session.user.id },
    data,
  })
}
```

---

## 收藏系统

### 添加/移除收藏

```typescript
// app/actions/favorites.ts
'use server'

export async function toggleFavorite(toolId: string) {
  const session = await auth()
  if (!session?.user) {
    return { error: '请先登录' }
  }
  
  const existing = await prisma.favorite.findUnique({
    where: {
      userId_toolId: {
        userId: session.user.id,
        toolId,
      },
    },
  })
  
  if (existing) {
    await prisma.favorite.delete({
      where: { id: existing.id },
    })
    return { favorited: false }
  } else {
    await prisma.favorite.create({
      data: {
        userId: session.user.id,
        toolId,
      },
    })
    return { favorited: true }
  }
}
```

---

## 排行榜

### 获取排行榜

```typescript
// app/actions/leaderboard.ts
'use server'

export async function getLeaderboard(period: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ALL_TIME' = 'WEEKLY') {
  return prisma.leaderboardEntry.findMany({
    where: { period },
    orderBy: { score: 'desc' },
    take: 50,
    include: {
      user: {
        select: {
          name: true,
          avatar: true,
          _count: {
            select: {
              toolUsages: true,
              ratings: true,
              achievements: true,
            },
          },
        },
      },
    },
  })
}
```

---

### 计算用户得分（定时任务）

```typescript
// 每日/每周定时任务（Vercel Cron Job）
export async function calculateLeaderboard(period: 'DAILY' | 'WEEKLY' | 'MONTHLY') {
  const now = new Date()
  const startDate = period === 'DAILY'
    ? new Date(now.getFullYear(), now.getMonth(), now.getDate())
    : period === 'WEEKLY'
    ? new Date(now.getTime() - now.getDay() * 86400000)
    : new Date(now.getFullYear(), now.getMonth(), 1)
  
  // 计算每个用户的得分
  const scores = await prisma.toolUsage.groupBy({
    by: ['userId'],
    where: { usedAt: { gte: startDate } },
    _count: { id: true },
    _sum: { duration: true },
  })
  
  // 得分 = 使用次数 * 10 + 使用时长(秒) * 0.1
  const entries = scores.map(s => ({
    userId: s.userId,
    score: (s._count.id * 10) + Math.floor((s._sum.duration || 0) * 0.1),
    period,
  }))
  
  // 清空旧数据并插入新数据
  await prisma.leaderboardEntry.deleteMany({ where: { period } })
  await prisma.leaderboardEntry.createMany({ data: entries })
  
  return { updated: entries.length }
}
```

---

## Credit 系统

### 获取/消耗 Credits

```typescript
// app/actions/credits.ts
'use server'

export async function getUserCredits() {
  const session = await auth()
  if (!session?.user) return { credits: 0 }
  
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { credits: true },
  })
  
  return { credits: user?.credits || 0 }
}

export async function spendCredits(amount: number, reason: string) {
  const session = await auth()
  if (!session?.user) {
    return { error: '请先登录' }
  }
  
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { credits: true },
  })
  
  if (!user || user.credits < amount) {
    return { error: 'Credits 不足' }
  }
  
  await prisma.user.update({
    where: { id: session.user.id },
    data: { credits: { decrement: amount } },
  })
  
  return { success: true, remaining: user.credits - amount }
}

export async function earnCredits(amount: number, reason: string) {
  const session = await auth()
  if (!session?.user) return { error: '未登录' }
  
  await prisma.user.update({
    where: { id: session.user.id },
    data: { credits: { increment: amount } },
  })
  
  return { success: true }
}
```

---

## 成就系统

### 检查并解锁成就

```typescript
// app/actions/achievements.ts
'use server'

export async function checkAchievements() {
  const session = await auth()
  if (!session?.user) return []
  
  const userId = session.user.id
  
  // 获取用户统计
  const [toolCount, ratingCount, streak, gamesPlayed, leaderboardRank] = await Promise.all([
    prisma.toolUsage.groupBy({
      by: ['toolId'],
      where: { userId },
      _count: true,
    }).then(r => r.length),
    prisma.rating.count({ where: { userId } }),
    calculateStreak(userId),
    prisma.toolUsage.count({
      where: { userId, tool: { category: 'GAME' } },
    }),
    prisma.leaderboardEntry.findFirst({
      where: { userId, period: 'ALL_TIME' },
      select: { rank: true },
    }).then(r => r?.rank || 999),
  ])
  
  // 检查成就条件
  const conditions = [
    { slug: 'first-visit', met: toolCount >= 1 },
    { slug: 'tool-explorer', met: toolCount >= 5 },
    { slug: 'power-user', met: toolCount >= 20 },
    { slug: 'tool-master', met: toolCount >= 57 },
    { slug: 'first-rate', met: ratingCount >= 1 },
    { slug: 'critic', met: ratingCount >= 10 },
    { slug: 'daily-streak-3', met: streak >= 3 },
    { slug: 'daily-streak-7', met: streak >= 7 },
    { slug: 'game-player', met: gamesPlayed >= 3 },
    { slug: 'high-scorer', met: leaderboardRank <= 10 },
  ]
  
  const unlocked = []
  for (const condition of conditions) {
    if (condition.met) {
      const achievement = await prisma.achievement.findUnique({
        where: { slug: condition.slug },
      })
      if (achievement) {
        const existing = await prisma.userAchievement.findUnique({
          where: {
            userId_achievementId: {
              userId,
              achievementId: achievement.id,
            },
          },
        })
        if (!existing) {
          const ua = await prisma.userAchievement.create({
            data: { userId, achievementId: achievement.id },
            include: { achievement: true },
          })
          // 奖励积分
          await prisma.user.update({
            where: { id: userId },
            data: { credits: { increment: ua.achievement.points } },
          })
          unlocked.push(ua)
        }
      }
    }
  }
  
  return unlocked
}

async function calculateStreak(userId: string) {
  const usages = await prisma.toolUsage.findMany({
    where: { userId },
    orderBy: { usedAt: 'desc' },
    select: { usedAt: true },
  })
  
  if (usages.length === 0) return 0
  
  let streak = 1
  let currentDate = new Date(usages[0].usedAt)
  currentDate.setHours(0, 0, 0, 0)
  
  for (let i = 1; i < usages.length; i++) {
    const date = new Date(usages[i].usedAt)
    date.setHours(0, 0, 0, 0)
    
    const diffDays = (currentDate.getTime() - date.getTime()) / 86400000
    if (diffDays === 1) {
      streak++
      currentDate = date
    } else if (diffDays > 1) {
      break
    }
  }
  
  return streak
}
```

---

## 许愿单

### 提交愿望

```typescript
// app/actions/wishlist.ts
'use server'

export async function submitWish(data: {
  title: string
  description?: string
}) {
  const session = await auth()
  if (!session?.user) {
    return { error: '请先登录' }
  }
  
  const wish = await prisma.wishlistItem.create({
    data: {
      userId: session.user.id,
      title: data.title,
      description: data.description,
      votes: 1, // 创建者自动投票
    },
  })
  
  return { success: true, wish }
}

export async function voteWish(wishId: string) {
  const session = await auth()
  if (!session?.user) return { error: '未登录' }
  
  await prisma.wishlistItem.update({
    where: { id: wishId },
    data: { votes: { increment: 1 } },
  })
  
  return { success: true }
}

export async function getWishlist(status?: string) {
  return prisma.wishlistItem.findMany({
    where: status ? { status } : undefined,
    orderBy: [{ votes: 'desc' }, { createdAt: 'desc' }],
    include: {
      user: { select: { name: true } },
    },
  })
}
```

---

## 错误处理约定

所有 Server Actions 统一返回格式：

```typescript
type ActionResult<T> = 
  | { success: true; data: T }
  | { success: false; error: string; code?: string }

// 使用示例
export async function someAction(): Promise<ActionResult<User>> {
  try {
    // ... 业务逻辑
    return { success: true, data: user }
  } catch (error) {
    return { success: false, error: '操作失败', code: 'INTERNAL_ERROR' }
  }
}
```

前端统一处理：

```typescript
// 调用
const result = await submitRating({ toolId, score: 5 })

if (!result.success) {
  toast.error(result.error) // 显示错误提示
  return
}

// 使用 result.data
```

---

## 文件位置约定

```
app/
├── actions/              # Server Actions（所有后端函数）
│   ├── tools.ts          # 工具相关
│   ├── ratings.ts        # 评分系统
│   ├── user.ts           # 用户资料
│   ├── favorites.ts      # 收藏
│   ├── leaderboard.ts    # 排行榜
│   ├── credits.ts        # Credit 系统
│   ├── achievements.ts   # 成就系统
│   └── wishlist.ts       # 许愿单
├── api/                  # API 路由（极少用，NextAuth 专用）
│   └── auth/             # NextAuth.js
├── tools/                # 工具页面
│   ├── [slug]/page.tsx   # 动态路由
│   └── layout.tsx
├── games/                # 游戏页面
├── (pages)/              # 普通页面
│   ├── page.tsx          # 首页
│   ├── discover/page.tsx
│   ├── ranking/page.tsx
│   ├── wishlist/page.tsx
│   └── profile/page.tsx
├── lib/
│   ├── prisma.ts         # Prisma Client 单例
│   └── utils.ts          # 工具函数
└── auth.ts               # NextAuth 配置
```

---

## 环境变量

```bash
# .env.local
DATABASE_URL="postgres://..."           # Vercel Postgres 连接串
NEXTAUTH_SECRET="your-secret-here"      # openssl rand -base64 32
NEXTAUTH_URL="https://aihues.com"       # 生产域名
GITHUB_CLIENT_ID="xxx"                  # GitHub OAuth
GITHUB_CLIENT_SECRET="xxx"
GOOGLE_CLIENT_ID="xxx"                  # Google OAuth
GOOGLE_CLIENT_SECRET="xxx"
VERCEL_KV_URL="redis://..."             # Vercel KV (排行榜缓存)
VERCEL_KV_REST_API_TOKEN="xxx"
```

---

*文档由 AI 助手准备，2026-05-20*
