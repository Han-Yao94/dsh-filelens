# dsh-filelens

[English](README.md) | 中文

**FileLens** —— DeepSeek Harness Web UI 的右侧栏文件浏览器：懒加载目录树、多格式预览、文件名与内容搜索、多标签页，以及内联编辑文本文件——内置越界防护（containment）与版本守卫写入。

一个 npm 包同时提供两个半区：

- **Host 半区** —— `filelens` Remote 服务（`root` / `list` / `search` / `grep` / `read` / `readMore` / `readHex` / `write` / `readImage`），基于宿主的 `fs` 服务。调用定义在服务构造时**运行时注册**进宿主 Typert 注册表（`typert.local`）——无需任何生成产物、无需装饰器标记，与安装形态（npm / git / tarball）无关。
- **浏览器半区** —— details 列 UI，通过内置客户端连接同款 `/api` Remote 传输与 Host 通信。不需要 `ctx.remote` 命名空间注入，不存在死锁或配置陷阱。

## 功能

- **懒加载目录树** —— 展开/收起、隐藏点开头条目、面包屑导航、可拖拽调宽列，**全部条目都显示**（无每目录上限）。刷新不会关闭已打开的标签。
- **多标签预览** —— 标签可拖拽排序，`Ctrl+Tab` / `Ctrl+Shift+Tab` 循环切换；每个标签独立记忆「原文/美化」与换行偏好。
- **类型化渲染**
  - Markdown：标题、列表、任务列表、引用、对齐表格、带语法高亮和复制按钮的围栏代码块、自动目录 TOC、蓝色链接（URL scheme 白名单）。
  - 图片：0.2–8× 缩放、旋转、1:1 复位、下载、像素尺寸显示。
  - JSON（格式化 + 高亮）、CSV/TSV 表格、diff/log 着色。
  - 30+ 语言语法高亮（带行号、跨行块注释处理）。
  - 二进制文件显示 Hex 视图（偏移 + 十六进制 + ASCII）。
- **大文件** —— 256 KB 头部预览 + 增量「加载更多」（Host 端续读同一流，不从头重读）、超过 800 行启用虚拟滚动。
- **搜索** —— 递归文件名搜索（深度 8 / 目录 3000 / 结果 300）、内容 grep（≤256 KB 文本文件、单文件 5 处、点击跳转到行）、`Ctrl+P` 快速打开。搜索按 family 可取消，按键不会在共享宿主进程上堆积重型扫描。
- **对话联动** —— 点击对话中的文件引用，树切换到该文件的**所在文件夹**并高亮该文件行。
- **工作区感知** —— 面板是 `session` 作用域的 details 席位：打开时解析**当前会话的工作区**；在不同工作区的会话之间切换时，面板自动跟随当前会话重新定位。
- **内联编辑** —— 文本文件就地编辑；保存经宿主 `fs` 服务真实写盘，带版本守卫（见安全模型）。
- **右键菜单** —— 复制路径 / 在系统中打开 / 打开所在文件夹 / 在新标签打开。
- **状态持久化** —— 展开目录与打开的标签经 `localStorage`（键 `dsh-filex-state`）在刷新后恢复；根目录始终跟随当前工作区，不会被旧的存储值劫持。

## 安装

### 前置条件

- 已安装并运行的 DeepSeek Harness（`dsh` CLI）。
- 一个用于安装的 profile（配置档）——默认部署启动的是 `web` profile（`dsh web` 即其别名）。以下示例统一使用 `web`；名字可随意，首次 `add` 会自动初始化。

### 方式 A —— 从 GitHub 仓库安装

```sh
dsh plugin --profile web add github:Han-Yao94/dsh-filelens
```

### 方式 B —— 从 Release tarball 安装（无需构建）

从 [Releases 页面](https://github.com/Han-Yao94/dsh-filelens/releases) 下载 `dsh-filelens-1.0.0.tgz`，然后：

```sh
dsh plugin --profile web add ./dsh-filelens-1.0.0.tgz
```

### 方式 C —— 从 npm 安装（发布后可用）

```sh
dsh plugin --profile web add dsh-filelens
```

### Web GUI 组合包

如果 profile 尚不存在，首次 `add` 会用 `@deepseek-ai/dsh-base` 初始化；浏览器 GUI 还需要 web-app 组合包：

```sh
dsh plugin --profile web add @deepseek-ai/dsh-web-app
```

然后用 `dsh --profile web`（或 `dsh web`）启动。

### git 安装与构建脚本

本包自带 `prepare` 脚本从源码构建 `lib/`，同时 `lib/` 构建产物也已提交入库，因此两种方式都可直接使用。pnpm ≥10 默认拒绝运行 git 依赖的 `prepare` 脚本，直到显式放行——如果首次 `add` 失败，请把 pnpm 打印的精确包键复制到 profile 的 `pnpm-workspace.yaml` 中再重试：

```yaml
allowBuilds:
  dsh-filelens: true
```

该放行意味着允许该包的构建代码在安装时于你的机器上执行；只放行你信任的源码包，并建议固定 commit：`github:Han-Yao94/dsh-filelens#<sha>`。

### 验证安装

```sh
dsh --profile web --dump-config   # 查找 "# == dsh-filelens" 层
```

## 使用指南

用对话头部（或 details 列）的文件夹图标打开面板，然后：

| 操作 | 方式 |
| --- | --- |
| 树导航 | 点击，或 `↑` / `↓` / `←` / `→` / `Enter` |
| 打开文件 | 点击文件行（打开预览标签） |
| 打开文件的文件夹 | 点击对话中的文件引用 |
| 返回目录树 | `Esc` |
| 文件名 / 内容搜索 | 搜索框；切换「文件名 / 内容」模式 |
| 快速打开 | `Ctrl+P`，输入过滤，`Enter` 打开 |
| 文件内查找 | `Ctrl+F`，`Enter` / `Shift+Enter` 上一个 / 下一个，`Esc` 关闭 |
| 切换标签 | 点击、`Ctrl+Tab`、`Ctrl+Shift+Tab`；`Ctrl+W` 关闭 |
| 编辑文本文件 | 铅笔按钮（文件未完整加载前禁用） |
| 保存 / 取消 | `Ctrl+S` 或「保存」按钮 /「取消」 |
| 图片缩放 | 0.2–8× 按钮、旋转、1:1、下载 |
| 复制代码 | 围栏代码块上的复制按钮 |

## 安全模型

| 层级 | 防护 |
| --- | --- |
| 浏览根目录 | 每次读写都对显式根目录做 containment 校验；守卫 **fail-closed**（根目录无法解析、或目标不在根内即拒绝） |
| 写入 | `file.write` **强制要求显式根目录**——链接打开或恢复的标签可按显式用户意图免根读取，但绝不能免根写入 |
| 版本守卫 | 保存携带读取时的 `FsVersion`；文件被其他程序修改后保存返回 `stale` 拒绝，而非静默覆盖 |
| 截断防护 | 未完整加载（>256 KB）的文件禁止编辑，保存永远不会截断文件其余部分 |
| Host 沙箱 | 底层 `fs` 沙箱（如 `workspace-write`）始终是最外层边界 |
| Markdown | 链接/图片 URL 做 scheme 白名单（`javascript:`/`data:` 渲染为惰性） |

失败绝不静默：保存 / 加载更多 / 选择目录的错误都会在面板内提示。

## 架构说明

- **一个包，两个半区。** Loader 行（`id: filelens`）加载 Host 服务；浏览器半区由 `dsh.client` 声明自动接入。
- **无生成产物。** Host 在服务构造时把 9 个调用定义注册进 `typert.local`（src-json codec，零额外依赖），网关在任何安装形态下都能解析。
- **直连传输。** 浏览器半区直接向 `/api` 发送与内置连接同款的 `client-request` 信封——无 `ctx.remote` 命名空间注入，无挂载顺序陷阱。
- **Host 侧工程。** 增量读取续用缓存的流（每会话 O(n) 而非 O(n²)）；搜索/grep 在新请求到来时通过 AbortController 中止；错误映射为结构化 `FsError` 代码。
- **零运行时 npm 依赖**（除 harness 已提供的 `@deepseek-ai/cordis` / `@deepseek-ai/dsh-typert-protocol` 对等依赖）。

## 注意事项

- 列宽拖拽范围继承宿主的 details 列常量（未修改的宿主允许的范围比开发布局窄；FileLens 在两种情况下都能工作）。
- 编辑会**真实写盘**——保存前请确认内容；版本守卫可防止并发的外部修改被覆盖。
- `details` 席位是 `session` 作用域的：每个会话有独立的面板状态，切换会话时自动定位到该会话的工作区。

## 开发

```sh
npm install
npm run build                       # tsc（Host 半区）+ esbuild（浏览器 bundle）
node scripts/make-client.mjs        # 从 ../client.js 重新生成 src/client
```

UI 逻辑的源之源头是 `../client.js`（动态插件版）；`make-client.mjs` 将其转换为静态客户端半区。

## 许可证

MIT。UI 中的 SVG 图标路径源自 Lucide 图标集（ISC）——完整声明见 `LICENSE`。
