# Apple Music Redesign

**Apple Music Redesign** 是一个基于 React + Vite + TypeScript 的 Apple Music 体验重设计项目，涵盖播放控制、迷你播放器、沉浸式全屏播放器、搜索、资料库和设置等核心功能。项目使用本地模拟数据，适合用作 UI/交互展示与前端技术实践。

**主要特性**
- 播放控制：播放/暂停、上一首/下一首、进度与音量控制、基础队列管理
- 迷你播放器：底部悬浮迷你控件，展示当前曲目信息与进度条
- 全屏播放器：专辑封面/歌词切换、动画过渡与沉浸式交互
- 搜索页：按标题与艺人实时过滤，热门搜索与分类浏览
- 资料库页：歌单展示、最近播放/收藏/下载等入口
- 设置页：订阅与偏好设置展示
- 响应式布局：桌面侧边栏与移动端底部导航

**技术栈**
- React 19、React Router 7、TypeScript、Vite 6
- Framer Motion（动效）、Lucide React（图标）
- Tailwind（通过 CDN 引入，见 [index.html](file:///Users/oneofakind/Desktop/AI/apple-music/index.html)）
- 路由采用 HashRouter，适合静态站点部署（见 [index.tsx](file:///Users/oneofakind/Desktop/AI/apple-music/index.tsx)）

**项目结构**
- 入口与路由： [App.tsx](file:///Users/oneofakind/Desktop/AI/apple-music/App.tsx)、[index.tsx](file:///Users/oneofakind/Desktop/AI/apple-music/index.tsx)
- 状态管理： [PlayerContext.tsx](file:///Users/oneofakind/Desktop/AI/apple-music/context/PlayerContext.tsx)
- 组件： [Layout.tsx](file:///Users/oneofakind/Desktop/AI/apple-music/components/Layout.tsx)、[MiniPlayer.tsx](file:///Users/oneofakind/Desktop/AI/apple-music/components/MiniPlayer.tsx)、[PlayerOverlay.tsx](file:///Users/oneofakind/Desktop/AI/apple-music/components/PlayerOverlay.tsx)
- 页面： [Home.tsx](file:///Users/oneofakind/Desktop/AI/apple-music/pages/Home.tsx)、[Search.tsx](file:///Users/oneofakind/Desktop/AI/apple-music/pages/Search.tsx)、[Library.tsx](file:///Users/oneofakind/Desktop/AI/apple-music/pages/Library.tsx)、[Settings.tsx](file:///Users/oneofakind/Desktop/AI/apple-music/pages/Settings.tsx)
- 类型与数据： [types.ts](file:///Users/oneofakind/Desktop/AI/apple-music/types.ts)、[mockData.ts](file:///Users/oneofakind/Desktop/AI/apple-music/mockData.ts)
- 构建配置： [vite.config.ts](file:///Users/oneofakind/Desktop/AI/apple-music/vite.config.ts)、[tsconfig.json](file:///Users/oneofakind/Desktop/AI/apple-music/tsconfig.json)

**关键模块说明**
- 播放状态与逻辑：在 [PlayerContext.tsx](file:///Users/oneofakind/Desktop/AI/apple-music/context/PlayerContext.tsx) 中维护
  - currentSong、isPlaying、progress、volume、queue 等核心状态
  - playSong、togglePlay、nextSong、prevSong、setProgress、setVolume、队列增删等方法
  - 定时器模拟播放进度，并在曲目结束时自动切换到下一首
- 迷你播放器： [MiniPlayer.tsx](file:///Users/oneofakind/Desktop/AI/apple-music/components/MiniPlayer.tsx)
  - 展示当前曲目封面、标题与艺术家
  - 提供播放/暂停与下一首操作，点击可打开全屏播放器
- 全屏播放器： [PlayerOverlay.tsx](file:///Users/oneofakind/Desktop/AI/apple-music/components/PlayerOverlay.tsx)
  - 支持封面/歌词两种视图、播放进度与音量滑轨
  - 上一首/播放/下一首控制与动效过渡
- 布局与导航： [Layout.tsx](file:///Users/oneofakind/Desktop/AI/apple-music/components/Layout.tsx)
  - 桌面端侧边导航 + 移动端底部导航

**快速开始**
- 前置要求：建议 Node.js 18+
- 安装依赖：`npm install`
- 本地运行：`npm run dev`（默认 3000 端口）
- 生产构建：`npm run build`
- 本地预览：`npm run preview`

**数据与演示**
- 项目使用本地模拟数据（歌曲/歌单/艺人），见 [mockData.ts](file:///Users/oneofakind/Desktop/AI/apple-music/mockData.ts) 与 [types.ts](file:///Users/oneofakind/Desktop/AI/apple-music/types.ts)
- 歌词为示例文本；播放为进度模拟，不涉及真实音频

**注意事项**
- Tailwind 通过 CDN 引入，无需安装 `tailwindcss` 包；如需离线或主题拓展，可改为本地构建方案
- 路由使用 HashRouter，部署到静态主机会更省心；如需使用 BrowserRouter，请同步配置服务端路由回退
- [index.html](file:///Users/oneofakind/Desktop/AI/apple-music/index.html) 引用了 `/index.css`，该文件为可选；如未提供可移除引用或新增样式文件
- 环境变量：当前项目未使用任何外部 API 密钥；`vite.config.ts` 中的 `GEMINI_API_KEY` 仅为占位

**许可证**
- 未声明许可证；如需开源，推荐添加 MIT 许可证
