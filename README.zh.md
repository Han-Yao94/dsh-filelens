# dsh-filelens

[English](README.md) | 中文

**FileLens** —— DeepSeek Harness Web UI 的右侧栏文件浏览器。支持懒加载目录树、多格式预览、文件名与内容搜索、多标签页，以及内联编辑文本文件——内置越界防护（containment）与版本守卫写入。

一个 npm 包同时提供两个半区：Host 服务（`filelens` Remote 命名空间）与浏览器 UI（details 列）。无需任何 Typert 生成产物——Host 网关在运行时通过 SRC 标记发现 Remote 方法。

## 安装

下面的 `<name>` 是 profile（配置档）的名字——示例统一使用 `web`（即默认部署启动所用的 profile，`dsh web` 就是它的别名）；你可以随意取名，首次 `add` 会自动初始化该 profile。

```sh
dsh plugin --profile web add dsh-filelens          # 从 npm
# 或直接从 git 仓库安装：
dsh plugin --profile web add github:Han-Yao94/dsh-filelens
# 或从本地 tarball 安装：
dsh plugin --profile web add ./dsh-filelens-1.0.0.tgz
```

> **git 安装与构建脚本**：本包自带 `prepare` 脚本从源码构建 `lib/`，同时 `lib/` 构建产物也已提交入库，因此两种方式都可直接使用。pnpm ≥10 默认拒绝运行 git 依赖的 `prepare` 脚本，直到显式放行——如果首次 `add` 失败，请把 pnpm 打印的精确包键复制到 profile 的 `pnpm-workspace.yaml` 中再重试：
>
> ```yaml
> allowBuilds:
>   dsh-filelens: true
> ```
>
> 该放行意味着允许该包的构建代码在安装时于你的机器上执行；只放行你信任的源码包，并建议固定 commit：`github:Han-Yao94/dsh-filelens#<sha>`。

如果 profile 尚不存在，首次 `add` 会用 `@deepseek-ai/dsh-base` 初始化；Web GUI 还需要 `dsh-web-app`：

```sh
dsh plugin --profile web add @deepseek-ai/dsh-web-app
```

然后用 `dsh --profile web`（或 `dsh web`）启动，从对话头部（文件夹图标）或 details 列打开文件浏览器。

## 功能

- **懒加载目录树** —— 展开/收起、隐藏点开头条目、面包屑导航、可拖拽调宽列、文件名/内容双模式搜索。
- **多标签预览** —— 独立标签页，支持拖拽排序、`Ctrl+Tab` / `Ctrl+Shift+Tab` 切换；每个标签独立记忆「原文/美化」与换行偏好。
- **类型化渲染** —— Markdown（标题、任务列表、表格、带复制按钮的围栏代码块、目录 TOC）、图片（缩放/旋转/下载）、JSON、CSV/TSV、diff/log 着色、30+ 语言语法高亮（带行号）、二进制文件的 Hex 视图。
- **大文件** —— 256 KB 头部预览 + 增量「加载更多」（Host 端续读流，不从头重读）、超过 800 行启用虚拟滚动。
- **搜索** —— 递归文件名搜索（深度 8 / 目录 3000 / 结果 300）、内容 grep（≤256 KB 文本文件）、`Ctrl+P` 快速打开。
- **快捷键** —— `↑/↓/←/→/Enter` 树导航、`Ctrl+F` 文件内查找（n/N、跳转、高亮）、`Ctrl+P` 快速打开、`Ctrl+T` 切换标签、编辑时 `Ctrl+S` 保存、`Ctrl+W` 关闭标签、`Esc` 逐层退出。
- **对话联动** —— 点击对话中的文件引用直接在 FileLens 打开。
- **内联编辑** —— 文本文件就地编辑；保存经 Host `fs` 服务真实写盘。状态（根目录、展开目录、标签）持久化在 `localStorage`（键 `dsh-filelens-state`）。

## 安全模型

| 层级 | 防护 |
| --- | --- |
| 浏览根目录 | 每次读写都对显式根目录做 containment 校验；守卫 **fail-closed**（根目录无法解析、或目标不在根内即拒绝） |
| 写入 | `file.write` **强制要求显式根目录**（链接打开的标签可按显式用户意图免根读取，但绝不能免根写入） |
| 版本守卫 | 保存携带读取时的 `FsVersion`；文件被其他程序修改后保存返回 `stale` 拒绝，而非静默覆盖 |
| 截断防护 | 未完整加载（>256 KB）的文件禁止编辑，保存永远不会截断文件其余部分 |
| Host 沙箱 | 底层 `fs` 沙箱（如 `workspace-write`）始终是最外层边界 |
| Markdown | 链接/图片 URL 做 scheme 白名单（`javascript:`/`data:` 渲染为惰性） |

失败绝不静默：保存 / 加载更多 / 选择目录的错误都会在面板内提示。

## 注意事项

- 列宽拖拽范围取决于宿主的 details 列常量。未修改的宿主允许的拖拽范围比开发时用的布局更窄；FileLens 在两种情况下都能工作，只是继承宿主的范围。
- 编辑会**真实写盘**——保存前请确认内容；版本守卫可防止并发的外部修改被覆盖。
- 本 bundle 以单个 Loader 行挂载（`id: filelens`）；浏览器半区由 `dsh.client` 声明自动接入。

## 开发

```sh
npm install
npm run build          # tsc（Host 半区）+ esbuild（浏览器 bundle）
node scripts/make-client.mjs   # 从 ../client.js 重新生成 src/client
```

除 harness 提供的 `@deepseek-ai/cordis` / `@deepseek-ai/dsh-typert-protocol` 对等依赖外，Host 半区零运行时 npm 依赖；`zod` 内联进浏览器 bundle 用于 Remote descriptor 编解码。

## 许可证

MIT。UI 中的 SVG 图标路径源自 Lucide 图标集（ISC）——完整声明见 `LICENSE`。
