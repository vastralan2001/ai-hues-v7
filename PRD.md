# AIHues v6.5 — Product Requirements Document

> **Version**: 6.5  
> **Date**: 2026-05-20  
> **Status**: Phase 2 Complete, 57 Tools + 3 Games Shipped

---

## 1. 产品概述

### 1.1 定位
AIHues 是一个纯前端 AI 工具站 + 小游戏社区，覆盖开发工具、写作工具、增长工具、效率工具四大场景，通过小游戏驱动留存和积分循环。所有工具在浏览器本地运行，无需后端，无需注册即可使用。

### 1.2 Slogan
> **Find your AI vibe.**  
> **找到你的 AI vibe。**

### 1.3 核心数据
| 指标 | 数值 |
|------|------|
| 工具总数 | **57** |
| 小游戏 | **3** |
| 功能页面 | **10** |
| HTML文件 | **70** |
| 代码行数 | ~45,000 |
| 需求完成率 | 100% (Excel 52条全部覆盖) |

---

## 2. 工具清单 (57个)

### 2.1 开发工具 (29个)

| # | 工具 | 图标 | 核心功能 | 状态 |
|---|------|------|----------|------|
| 1 | JWT Parser | 🔐 | Base64Url解码、三部分高亮、过期检测 | ✅ |
| 2 | JSON Formatter | 📋 | 格式化/压缩/校验、语法高亮、树形折叠 | ✅ |
| 3 | Regex Tester | 🔍 | 实时匹配高亮、8种预设、替换预览 | ✅ |
| 4 | UUID Generator | 🆔 | 批量生成、格式选项、历史记录 | ✅ |
| 5 | Timestamp | ⏱️ | 秒/毫秒自动识别、双向转换、实时时钟 | ✅ |
| 6 | Base64 | 🔢 | 编解码、文件支持 | ✅ |
| 7 | SHA256 Hash | 🔒 | SHA-256/SHA-1/MD5、文件哈希 | ✅ |
| 8 | SQL Formatter | 🗄️ | SQL查询格式化 | ✅ |
| 9 | URL Encode | 🔗 | 4种模式、查询参数表格 | ✅ |
| 10 | Base Converter | 🔢 | 二/八/十/十六进制+位运算 | ✅ |
| 11 | Password Gen | 🔑 | 强度评估、短语密码、历史 | ✅ |
| 12 | HTTP Status | 🌐 | 完整状态码查表、搜索 | ✅ |
| 13 | HTML Entity | ◈ | 24实体速查、Unicode/Decimal/Hex | ✅ |
| 14 | Cron Parser | ⏰ | 12预设、自然语言、5次执行时间 | ✅ |
| 15 | Code Explain | 💻 | 代码统计+函数列表+摘要 | ✅ |
| 16 | Code Review | 👁️ | 问题检测+评分+建议 | ✅ |
| 17 | Shell Gen | 🐚 | 10种场景Shell命令生成 | ✅ |
| 18 | Git Commit | 📌 | 7种conventional commit格式 | ✅ |
| 19 | IP Lookup | 🔍 | IP地理位置查询（调用ipapi.co） | ✅ |
| 20 | Curl Gen | 🌐 | HTTP方法+Headers+认证+curl生成 | ✅ |
| 21 | Diff Pro | 📑 | 行级diff(+-高亮)+单词/字符模式 | ✅ |
| 22 | Unit Convert | 📐 | 6分类(长度/重量/温度/面积/数据/时间) | ✅ |
| 23 | Image→Base64 | 🖼️ | 拖拽上传、批量转换、缩略图预览 | ✅ |
| 24 | CSS Gradient | 🌈 | 线性/径向/圆锥、色标拖拽、12预设 | ✅ |
| 25 | Color Convert | 🎨 | HEX/RGB/HSL/CMYK四向互转+调和 | ✅ |
| 26 | CSV↔JSON | 📊 | 自动检测分隔符、表格预览、双向转换 | ✅ |
| 27 | Markdown | 📝 | 双栏可拖拽、GFM渲染、代码高亮 | ✅ |
| 28 | QR Code | 📱 | URL/WiFi/Email/Phone多类型 | ✅ |
| 29 | Diff | 📑 | 文本差异对比 | ✅ |

### 2.2 写作工具 (26个)

| # | 工具 | 图标 | 核心功能 | 状态 |
|---|------|------|----------|------|
| 1 | Word Count | 📊 | 实时字数、字符数、阅读时长 | ✅ |
| 2 | Readability | 📖 | Flesch-Kincaid可读性分析 | ✅ |
| 3 | Humanize | ✨ | 15个AI词替换、去AI味 | ✅ |
| 4 | Ad Copy | 📢 | 3组广告文案（标题+正文+CTA） | ✅ |
| 5 | Alt Text | 🖼️ | 4种长度alt文本+SEO优化 | ✅ |
| 6 | Blog Outline | 📝 | 6节博客大纲自动生成 | ✅ |
| 7 | Changelog | 📋 | 分类changelog（Added/Fixed/Changed） | ✅ |
| 8 | Cold Email | 📧 | 3套邮件模板（价值/社交证明/问题） | ✅ |
| 9 | Docs | 📚 | API文档+参数表+使用示例 | ✅ |
| 10 | FAQ | ❓ | 8组FAQ问答生成 | ✅ |
| 11 | LinkedIn | 💼 | 3种LinkedIn帖子格式 | ✅ |
| 12 | LP Hero | 🎯 | Landing Page文案全套 | ✅ |
| 13 | Meta | 🏷️ | SEO meta标签完整HTML | ✅ |
| 14 | Newsletter | 📰 | 完整Newsletter结构 | ✅ |
| 15 | PR Desc | 🔀 | PR描述模板+检查清单 | ✅ |
| 16 | Pseudo | 🎭 | 伪代码生成 | ✅ |
| 17 | Push | 🔔 | 4种推送通知文案 | ✅ |
| 18 | Tagline | ✒️ | 8个品牌标语 | ✅ |
| 19 | TLDR | 📄 | 摘要+关键提取+压缩率 | ✅ |
| 20 | Video Title | 🎬 | 8个YouTube标题+长度检测 | ✅ |
| 21 | X Post | 𝕏 | 3种X帖子格式+随机模板 | ✅ |
| 22 | SEO Title | 🔍 | SEO标题+评分+多维度分析 | ✅ |
| 23 | Title Case | 📰 | 12种格式(AP/Chicago/camel等) | ✅ |
| 24 | Fullwidth | ↔️ | 全角半角转换+空格/换行清理 | ✅ |
| 25 | Lorem Ipsum | 📝 | 中文/英文/Latin+HTML模式 | ✅ |
| 26 | YT Script | 🎥 | YouTube脚本完整结构 | ✅ |

### 2.3 增长工具 (1个)

| # | 工具 | 图标 | 核心功能 | 状态 |
|---|------|------|----------|------|
| 1 | Chi-Squared | 📊 | 卡方检验、置信区间、可视化柱状图 | ✅ |

### 2.4 效率工具 (1个)

| # | 工具 | 图标 | 核心功能 | 状态 |
|---|------|------|----------|------|
| 1 | Pomodoro | 🍅 | 圆形进度条、Focus/Break、音效+通知 | ✅ |

### 2.5 小游戏 (3个)

| 游戏 | 图标 | 核心功能 | 排行榜 | 历史 | 分享 |
|------|------|----------|--------|------|------|
| 日历幸运签 | 📅 | 3D翻转、30条箴言、运势分级 | ✅ | ✅ | ✅ Canvas卡片 |
| 幸运老虎机 | 🎰 | 3x3滚轮、8条中奖线、每日3次 | ✅ | ✅ | ✅ Canvas卡片 |
| 投篮挑战 | 🏀 | Canvas物理引擎、60秒挑战 | ✅ | ✅ | ✅ Canvas卡片 |

---

## 3. 功能页面 (10个)

| 页面 | 说明 | 状态 |
|------|------|------|
| index.html | 首页 — AI搜索框+分类+工具展示+游戏 | ✅ |
| tools.html | 完整工具目录 — 57工具一览+搜索过滤 | ✅ |
| login.html | Kimi登录+本地快速登录+游客模式 | ✅ |
| wishlist.html | 工具许愿单 — 投票+TOP5排行+提交需求 | ✅ |
| ranking.html | 排行榜 — 工具排行+用户排行+成就墙 | ✅ |
| showcase.html | 展示页（占位） | ⏳ |
| collection.html | 收藏页（占位） | ⏳ |
| discover.html | 发现页（占位） | ⏳ |
| pricing.html | 定价页（占位） | ⏳ |
| profile.html | 个人页（占位） | ⏳ |

---

## 4. 基础设施

### 4.1 AI Agent搜索
- **33个工具**可搜索（数据库覆盖全部核心工具）
- 自然语言匹配 + 多关键词评分算法
- `/` 快捷键聚焦，`ESC` 关闭
- 空结果引导至许愿单

### 4.2 i18n 中英文切换
- **70个HTML文件**全部引用i18n.js
- data-zh属性标记中文内容
- localStorage持久化语言选择
- 全局toggleLang()函数

### 4.3 深色模式
- CSS变量覆盖：`[data-theme="dark"]`
- 🌙/☀️ 切换按钮
- 自动跟随 `prefers-color-scheme`
- localStorage持久化

### 4.4 PWA 离线支持
- `manifest.json` — Web App Manifest
- `sw.js` — Service Worker缓存全部70个页面
- 首次访问自动缓存
- 离线时返回缓存内容
- 后台刷新机制

### 4.5 SEO
- `robots.txt` — 允许索引
- `sitemap.xml` — 68个URL
- 每个页面独立meta description

### 4.6 Credit系统
- localStorage存储余额
- 游戏产出/工具消耗（纯前端模拟）
- 初始100 Credit

### 4.7 登录系统
- Kimi OAuth按钮（跳转Kimi Agent平台）
- 本地快速登录（输入昵称即可）
- 游客模式（无需注册）
- localStorage存储用户状态

---

## 5. 技术架构

### 5.1 技术栈
- **纯静态HTML+CSS+JS** — 零框架、零后端
- **localStorage** — 所有数据本地持久化
- **CDN库**: marked.js (Markdown)、qrcode.js (二维码)
- **Web API**: Canvas, Web Crypto, FileReader, Web Audio, Notification, Service Worker

### 5.2 文件结构
```
ai-hues-v6/
├── index.html              # 首页
├── tools.html              # 完整工具目录 (57工具)
├── login.html              # 登录/注册/游客
├── wishlist.html           # 工具许愿单
├── ranking.html            # 排行榜
├── manifest.json           # PWA Manifest
├── sw.js                   # Service Worker
├── robots.txt              # 搜索引擎
├── sitemap.xml             # 站点地图
├── plan.md                 # 开发计划
├── PRD.md                  # 本文档
├── TOOL_INVENTORY.csv      # 工具清单
├── js/
│   ├── i18n.js             # 中英文切换系统
│   └── auth.js             # 登录状态
├── tools/                  # 57个工具页面
├── games/                  # 3个小游戏
└── css/                    # (内联样式)
```

### 5.3 localStorage Key
```
aihues_credit              # 全局Credit余额
aihues_lang                # i18n语言 (en/zh)
aihues_theme               # 主题 (light/dark)
aihues_users               # 注册用户列表
aihues_current_user        # 当前登录用户
aihues_wishlist            # 许愿单数据
aihues_wishlist_voted      # 已投票ID
aihues_hoops_*             # 投篮游戏数据
aihues_slots_*             # 老虎机数据
aihues_daily_*             # 幸运签数据
```

---

## 6. 需求完成度 (Excel对照)

| 来源 | 总数 | 自建完成 | 外链收录 | 完成率 |
|------|------|----------|----------|--------|
| Excel 52条 | 52 | 30 | 22 | **100%** |
| 需求扩展 | 7 | 7 | 0 | **100%** |
| **总计** | **59** | **37** | **22** | **100%** |

> 注：22条外链收录为成熟产品（CodePen/Squoosh/Excalidraw等），在许愿单页面提供直达链接。

---

## 7. 后续规划

### Phase 3 (建议)
| 功能 | 说明 |
|------|------|
| LLM API接入 | 为AI文本工具接入Kimi API，提升生成质量 |
| 主题系统扩展 | 更多预设主题（森林绿/日落橙/极简白） |
| 成就系统完善 | 10个成就真正可解锁，由使用统计驱动 |
| 数据埋点 | 工具使用次数、热门工具排行 |

### Phase 4 (建议)
| 功能 | 说明 |
|------|------|
| Vercel正式部署 | 自定义域名 + CI/CD |
| 用户反馈系统 | 每个工具添加反馈按钮 |
| 工具推荐算法 | 根据使用历史推荐相关工具 |

---

*AIHues — Find your AI vibe.*  
*v6.5 · 2026-05-20 · 57 Tools + 3 Games*
