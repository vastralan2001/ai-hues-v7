# AIHues v6 — Product Requirements Document (PRD)

> **Version**: 6.1  
> **Last Updated**: 2026-05-19  
> **Status**: Phase 2 In Progress — 18 new tools shipped

---

## 1. 产品概述

### 1.1 产品定位
AIHues 是一个面向AI创作者的纯前端工具站 + 小游戏社区，覆盖文本处理、开发工具、增长工具三大场景，通过小游戏驱动用户留存和积分循环。

### 1.2 核心价值主张
> "39+ AI 工具、小游戏和实用工具，像人一样自然。"

### 1.3 目标用户
- AI应用开发者（需要JWT/JSON/正则等开发工具）
- 内容创作者（需要写作/SEO/增长工具）
- 日常用户（需要日历/二维码/时间戳等实用工具）

---

## 2. 已完成的功能清单

### 2.1 首页 (index.html) ✅
| 功能 | 状态 | 说明 |
|------|------|------|
| AI Agent搜索框 | ✅ v3 | 🤖图标+自然语言匹配+24工具数据库+thinking动画 |
| 分类浏览卡 | ✅ | 4分类(写作/开发/增长/游戏) |
| 统计栏 | ✅ | 39工具 / 3游戏 |
| 工具展示网格 | ✅ | NEW badge + 图标 |
| 游戏中心 | ✅ | 3游戏 + Credit余额 |
| i18n切换 | ✅ | EN/中文全局切换 |

### 2.2 AI文本工具 (29个) ✅ — 原有
ad-copy, alt-text, blog-outline, changelog, code-explain, code-review, cold-email, docs, faq, git-commit, humanize, linkedin, lp-hero, meta, newsletter, pr-desc, pseudo, push, readability, seo-title, shell, sql, tagline, tldr, video-title, x-post, yt-script 等

### 2.3 开发工具 (18个) ✅ — 本轮新建

| # | 工具 | 图标 | 核心功能 | 难度 | 来源 |
|---|------|------|----------|------|------|
| 1 | JWT解析器 | 🔐 | Base64Url解码、过期检测 | L1 | Excel |
| 2 | JSON格式化 | 📋 | 格式化/压缩/校验、语法高亮 | L1 | Excel |
| 3 | 正则测试器 | 🔍 | 实时匹配高亮、8种预设 | L2 | Excel |
| 4 | UUID生成器 | 🆔 | 批量生成、格式选项 | L1 | Excel |
| 5 | 时间戳转换 | ⏱️ | 秒/毫秒自动识别、双向转换 | L1 | Excel |
| 6 | Markdown预览 | 📝 | 双栏可拖拽、GFM渲染 | L2 | Excel |
| 7 | 二维码生成 | 📱 | URL/WiFi/Email/Phone多类型 | L2 | Excel |
| 8 | SHA256哈希 | 🔒 | SHA-256/SHA-1/MD5、文件哈希 | L1 | Excel |
| 9 | 全角半角转换 | ↔️ | 转换+空格/换行清理 | L1 | Excel |
| 10 | A/B测试计算 | 📊 | 卡方检验、置信区间 | L2 | Excel |
| 11 | **URL编解码** | 🔗 | 4种模式、查询参数表格 | L1 | Excel |
| 12 | **进制转换器** | 🔢 | 二/八/十/十六进制+位运算 | L1 | Excel |
| 13 | **密码生成器** | 🔑 | 强度评估+短语密码+历史 | L1 | Excel |
| 14 | **标题大小写** | 📰 | 12种格式(AP/Chicago/camel等) | L1 | Excel |
| 15 | **HTTP状态码** | 🌐 | 完整状态码查表+搜索+复制 | L1 | Excel |
| 16 | **HTML实体转换** | ◈ | 24实体速查+Unicode/Decimal | L1 | Excel |
| 17 | **番茄钟** | 🍅 | 圆形进度条+音效+通知+统计 | L1 | Excel |
| 18 | **Cron解析器** | ⏰ | 12预设+自然语言+5次执行时间 | L1 | Excel |

### 2.4 小游戏 (3个) ✅ — 新建+增强
| 游戏 | 排行榜 | 历史记录 | 分享卡片 |
|------|--------|----------|----------|
| 日历幸运签 | ✅ | ✅ 统计+日历 | ✅ Canvas |
| 幸运老虎机 | ✅ | ✅ 中奖+统计 | — |
| 投篮挑战 | ✅ | ✅ 得分+Swish | — |

### 2.5 功能页面 ✅
| 页面 | 说明 |
|------|------|
| wishlist.html | 许愿单+TOP5排行+投票 |
| ranking.html | 工具排行+用户排行+成就墙 |
| login.html | 登录/注册/游客模式 |
| js/i18n.js | 中英文切换系统 |

---

## 3. 待开发功能清单

### P0 — 新工具 (Excel需求剩余)
| # | 工具 | 来源 | 难度 | 状态 |
|---|------|------|------|------|
| 1 | CSS渐变生成器 | Excel#38 | L1 | ⏳ |
| 2 | IP地址查询 | Excel#28 | L1 | ⏳ |
| 3 | 色值转换器(HEX/RGB/HSL) | Excel | L1 | ⏳ |
| 4 | CSV转JSON/表格 | Excel#49 | L1 | ⏳ |
| 5 | 图片转Base64 | Excel | L2 | ⏳ |
| 6 | Curl命令转换 | Excel#52 | L1 | ⏳ |

### P1 — 系统功能
| # | 功能 | 说明 | 状态 |
|---|------|------|------|
| 1 | i18n全局生效 | 所有工具页面data-zh | ⏳ |
| 2 | Login状态全局 | 所有页面显示登录状态 | ⏳ |
| 3 | 导航栏统一 | 旧工具页面nav更新 | ⏳ |
| 4 | SEO优化 | meta/og标签 | ⏳ |
| 5 | PWA支持 | manifest+service worker | ⏳ |

### ❌ 不做清单
| 需求 | 原因 |
|------|------|
| Go Playground / CodePen / VueJS | 需后端沙箱 |
| Excalidraw / Squoosh / StackEdit | 成熟产品，外链 |
| OCR / PDF处理 / 视频转换 | 需后端处理 |
| 番茄钟(外部) / Noisli / 世界时钟 | 有自建番茄钟替代 |
| 贪吃蛇 / 2048 | PRD已砍 |
| DNS检测 | 需外部API |
| SVG压缩 | 需后端 |

---

## 4. 需求完成度统计

| 来源 | 总数 | 已完成 | 计划中 | 外链/不做 |
|------|------|--------|--------|-----------|
| Excel需求 | 52条 | 18条 | 6条 | 28条 |
| **完成率** | | **35%** | 12% | 54% |

> 注：18条自建工具已完成，6条计划中，其余28条为成熟产品外链收录或需后端支持。

---

## 5. 排期

### Week 1 ✅
3个快启工具：字数统计、Base64、Diff

### Week 2 ✅
10个开发工具 + 3游戏 + 首页重设计 + wishlist/ranking/login + i18n + AI搜索框

### Week 3 ✅ (本轮)
8个新工具：URL编解码、进制转换、密码生成、标题大小写、HTTP状态码、HTML实体、番茄钟、Cron

### Week 4 (建议)
- 6个剩余工具：CSS渐变、IP查询、色值、CSV、图片Base64、Curl
- i18n全局生效
- SEO + PWA

---

## 6. 技术架构

### 6.1 技术栈
- 纯静态HTML+CSS+JS，无框架无后端
- localStorage数据持久化
- CDN: marked.js, qrcode.js
- Web API: Canvas, Web Crypto, FileReader, Web Audio, Notification

### 6.2 文件统计
```
56 HTML files
1 JS file (i18n.js)
~28,000 lines of code
```

### 6.3 localStorage Key规范
```
aihues_credit          # 全局Credit
aihues_lang            # i18n语言
aihues_users           # 注册用户
aihues_current_user    # 当前用户
aihues_wishlist        # 许愿单
aihues_wishlist_voted  # 已投票ID
aihues_hoops_*         # 投篮游戏
aihues_slots_*         # 老虎机
aihues_daily_*         # 幸运签
```
