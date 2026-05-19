# GitHub 推送说明

## 本地仓库已初始化并提交

当前本地仓库位于：`/mnt/agents/output/ai-hues-dev/`

## 推送到你的 GitHub 仓库

在你的本地终端运行以下命令：

```bash
# 1. 添加远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/vastralan2001/ai-hues-v6.git

# 2. 拉取远程分支历史（保留你的原始提交）
git pull origin main --rebase
# 如果分支名是 master：git pull origin master --rebase

# 3. 推送
# 如果你想作为新分支提交：
git checkout -b v6-week2-dev
git push origin v6-week2-dev

# 或者如果你想合并到主分支：
git checkout -b main
git rebase origin/main
git push origin main
```

## 如果没有原始仓库的写权限

1. Fork 原始仓库到你的账号
2. 添加你fork后的地址：`git remote set-url origin https://github.com/YOUR_USERNAME/ai-hues-v6.git`
3. 推送：`git push origin v6-week2-dev`
4. 在GitHub上提交 Pull Request

## 快速方式（一次性patch）

如果以上方式不便，可以直接把 `ai-hues-dev/` 目录下的所有文件复制到你的本地仓库中：

```bash
cp -r /mnt/agents/output/ai-hues-dev/* /path/to/your/ai-hues-v6/
cd /path/to/your/ai-hues-v6/
git add .
git commit -m "feat: v6-week2-dev 10 tools + 3 games + wishlist + ranking + login + i18n"
git push origin main
```

## 本次提交统计

- 54 files changed
- 20,600 insertions(+)
- 分支: master (本地)
- 提交: db962d2
