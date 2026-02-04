# Apple Music 风格音乐 Web 应用

基于 React + TypeScript + Vite 开发的现代化音乐播放器应用，模仿 Apple Music 的简洁高级设计风格。

## 🎯 项目特点

- **简洁高级的 UI 设计** - 模仿 Apple Music 的视觉风格
- **沉浸式音乐体验** - 流畅的播放和交互
- **响应式布局** - 适配各种屏幕尺寸
- **现代化技术栈** - React 18 + TypeScript + Vite
- **类型安全** - 完整的 TypeScript 类型定义
- **状态管理** - 使用 Zustand 进行轻量级状态管理
- **Tailwind CSS** - 实用优先的 CSS 框架

## 🛠️ 技术栈

### 核心框架
- **React 18** - 用户界面库
- **TypeScript** - 类型安全的 JavaScript
- **Vite** - 快速的构建工具

### 状态管理
- **Zustand** - 轻量级状态管理库

### UI 和样式
- **Tailwind CSS** - 实用优先的 CSS 框架
- **Lucide React** - 精美的图标库

### 其他
- **Axios** - HTTP 请求库（预留）
- **ESLint** - 代码质量检查

## 📁 项目结构

```
apple-music/
├── public/              # 静态资源
├── src/
│   ├── api/            # API 接口定义和 Mock 数据
│   │   └── index.ts     # OpenSpec 风格的接口定义
│   ├── components/     # React 组件
│   │   ├── common/     # 通用组件
│   │   │   └── AlbumCard.tsx
│   │   ├── layout/     # 布局组件
│   │   │   └── Sidebar.tsx
│   │   └── player/     # 播放器组件
│   │       └── Player.tsx
│   ├── hooks/          # 自定义 Hooks
│   │   └── index.ts
│   ├── pages/          # 页面组件
│   │   ├── Browse/     # 浏览页面
│   │   │   └── Browse.tsx
│   │   ├── Home/       # 首页
│   │   │   └── Home.tsx
│   │   └── Library/    # 资料库
│   │       └── Library.tsx
│   ├── store/          # Zustand 状态管理
│   │   └── index.ts
│   ├── types/          # TypeScript 类型定义
│   │   └── index.ts
│   ├── utils/          # 工具函数
│   ├── App.tsx         # 主应用组件
│   ├── main.tsx        # 应用入口
│   └── index.css       # 全局样式
├── index.html          # HTML 模板
├── package.json        # 项目配置
├── tailwind.config.js # Tailwind 配置
├── tsconfig.json       # TypeScript 配置
└── vite.config.ts     # Vite 配置
```

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173 查看应用

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 🎨 功能特性

### 已实现功能

- ✅ 精美的侧边栏导航
- ✅ 专辑浏览和展示
- ✅ 音乐播放器控制（播放/暂停/上下曲）
- ✅ 音量控制
- ✅ 播放进度条
- ✅ 播放模式切换（顺序/随机/循环）
- ✅ 最近播放记录
- ✅ 喜欢歌曲功能
- ✅ 响应式设计

### 待实现功能

- 🔲 搜索功能
- 🔲 用户认证
- 🔲 真实 API 集成
- 🔲 歌词显示
- 🔲 播放列表管理
- 🔲 播放历史
- 🔲 电台功能
- 🔲 艺术家页面
- 🔲 专辑详情页
- 🔲 音频可视化

## 📝 API 设计

项目遵循 OpenSpec 规范设计接口，所有 API 定义都在 `src/api/index.ts` 中。

当前使用 Mock 数据进行开发，后续可以轻松替换为真实 API。

### 主要接口

- **歌曲 API** - 获取歌曲列表、歌曲详情
- **专辑 API** - 获取专辑列表、专辑详情
- **艺术家 API** - 获取艺术家信息
- **播放列表 API** - 管理用户播放列表
- **搜索 API** - 搜索歌曲、专辑、艺术家
- **用户 API** - 用户喜欢、最近播放等

## 🎯 设计理念

### Apple Music 风格

- **简洁高级** - 大量留白，精致的排版
- **毛玻璃效果** - backdrop-blur 营造层次感
- **流畅动画** - 所有交互都有平滑过渡
- **大图展示** - 专辑封面突出显示
- **沉浸体验** - 界面元素为音乐让路

### 色彩系统

- **背景** - 深色主题 (#1c1c1e)
- **主色** - Apple Music 红 (#fa2d48)
- **辅助色** - 各类灰色层次

## 🔧 开发说明

### 添加新功能

1. 在 `src/types/` 中定义数据类型
2. 在 `src/api/` 中添加接口定义
3. 在 `src/store/` 中添加状态（如需要）
4. 在 `src/components/` 或 `src/pages/` 中实现组件

### 样式开发

项目使用 Tailwind CSS，推荐使用 Tailwind 的实用类进行样式开发。

自定义样式可以在 `src/index.css` 中添加。

## 📄 License

MIT
