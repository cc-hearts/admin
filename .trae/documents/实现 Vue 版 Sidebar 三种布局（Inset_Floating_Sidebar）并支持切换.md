## 目标
- 在 `d:\repo\js\admin` 中实现与 `shadcn-admin` 一致的三种 Sidebar 布局：`inset`、`floating`、`sidebar`，并提供交互切换。
- 保持样式与语义对齐，复用现有 Tailwind 主题变量（`bg-sidebar`、`text-sidebar-foreground` 等已在 `src/style.css` 定义）。
- 移动端使用抽屉（Sheet）形式显示侧栏，桌面端支持 `offcanvas`、`icon`、`none` 三种可折叠策略。

## 参考实现要点（对齐源项目）
- 变体与折叠策略：`src/context/layout-provider.tsx:4-15` 定义 `Collapsible` 与 `Variant` 以及默认值。
- Sidebar 结构与样式：`src/components/ui/sidebar.tsx:151-172`（非可折叠常规渲染）、`src/components/ui/sidebar.tsx:180-202`（移动端 Sheet 渲染）、`src/components/ui/sidebar.tsx:215-248`（桌面端 gap 与 container，针对 `floating`/`inset` 的宽度与圆角/边框处理）。
- 布局组合：`src/components/layout/authenticated-layout.tsx:18-37` 展示 `LayoutProvider`、`SidebarProvider` 与 `SidebarInset` 的组合方式。
- 切换 UI：`src/components/config-drawer.tsx:214-253`（三种 Sidebar 变体切换），`src/components/config-drawer.tsx:257-312`（布局折叠策略与展开状态切换）。

## 拟新增/修改文件
- 新增 `src/lib/cookies.ts`
  - 提供 `getCookie(name)`、`setCookie(name, value, maxAge)`，用于持久化 `layout_collapsible`、`layout_variant`、`sidebar_state`。
- 新增 `src/composables/use-layout.ts`
  - 定义类型 `Collapsible = 'offcanvas' | 'icon' | 'none'`、`Variant = 'inset' | 'sidebar' | 'floating'`，默认值与 `cookies` 同步（参考 React 版）。
  - 通过 `provide/inject` 暴露：`collapsible`、`setCollapsible`、`variant`、`setVariant`、`resetLayout`。
- 新增 `src/layouts/sidebar/SidebarProvider.vue`
  - 作为外层容器，设置 CSS 变量（`--sidebar-width`、`--sidebar-width-icon`），注册键盘快捷键 `Ctrl/Cmd + B` 切换，负责 `open/openMobile/toggleSidebar` 与 `document.cookie` 同步。
  - 使用现有 `provideSidebarContext`（`src/composables/use-sidebar.ts:30-32`）注入上下文。
- 完整实现 `src/layouts/sidebar/sidebar.vue`
  - 对齐 React 结构：
    - 非可折叠分支（`collapsible === 'none'`）渲染固定宽度列（参考 `src/components/ui/sidebar.tsx:165-177`）。
    - 移动端分支使用 `components/ui/sheet` 右侧抽屉（参考 `src/components/ui/sidebar.tsx:180-202`），宽度取 `SIDEBAR_WIDTH_MOBILE`。
    - 桌面端分支包含 `sidebar-gap` 与 `sidebar-container` 两层，`gap` 宽度根据 `collapsible` 与 `variant` 变化（参考 `src/components/ui/sidebar.tsx:215-236`），`inner` 处理 `floating` 的圆角与边框（参考 `src/components/ui/sidebar.tsx:241-247`）。
  - 保持现有类名与数据属性（`data-slot`、`data-state`、`data-variant`、`data-collapsible`），以便样式选择器生效。
  - 完成 `toggleSidebar`/`rail` 交互（`src/layouts/sidebar/sidebar.vue:4-18` 当前留有 FIXME）。
- 新增 `src/layouts/sidebar/SidebarInset.vue`
  - 包裹主内容区域，应用 `inset` 形态的容器类（参照 `src/components/ui/sidebar.tsx:309-320` 与 `src/components/layout/authenticated-layout.tsx:22-34` 高度处理）。
- 新增 `src/layouts/sidebar/AppSidebar.vue`
  - 读取 `useLayout()` 的 `variant/collapsible`，拼装 Header/Content/Footer 与 Rail（对齐 `src/components/layout/app-sidebar.tsx:15-35`）。
- 新增（可选）`src/components/ConfigDrawer.vue`
  - 提供三组单选：`Sidebar` 变体、`Layout` 折叠策略、主题/方向（若需要），逻辑参考 `src/components/config-drawer.tsx:214-312`，使用现有 `components/ui/sheet`。
- 修改 `src/layouts/sidebar/index.vue`
  - 用 `SidebarProvider` 包裹页面，演示 `AppSidebar + SidebarInset` 组合与切换，替换当前占位内容（`src/layouts/sidebar/index.vue:1-6`）。

## 交互与持久化
- Cookie 名称与时长：
  - `sidebar_state`（展开/折叠）、`layout_collapsible`、`layout_variant`，`max-age` 为 7 天。
- 快捷键：
  - `Ctrl/Cmd + B` 切换展开状态（与源实现一致，参考 `src/components/ui/sidebar.tsx:93-107`）。
- 数据属性/类名：
  - 通过 `data-state='expanded|collapsed'`、`data-collapsible`、`data-variant`、`data-side` 驱动样式变更（源实现的选择器已在上述行号体现）。

## 移动端行为
- 使用现有 `components/ui/sheet` 作为抽屉组件，边侧为 `right`，隐藏 `Sheet` 的默认关闭按钮（与 React 版 `[&>button]:hidden` 类同效）。
- 宽度取 `SIDEBAR_WIDTH_MOBILE = '18rem'`，由 `props.side` 控制左右。

## 验证与演示
- 在 `src/layouts/sidebar/index.vue` 提供演示：
  - 切换 `Sidebar` 变体（`inset`/`floating`/`sidebar`）与 `Layout` 折叠策略（`default`/`icon`/`offcanvas`）。
  - 验证桌面端 gap 与 container 的宽度动画、移动端抽屉、`inset` 圆角与边框样式。
- 运行 `pnpm dev`，打开页面进行切换测试；检查 `document.cookie` 是否正确更新。

## 注意事项
- 保持类名与结构一致以复用 `src/style.css` 中的主题变量。
- 组件/组合式 API 不添加多余注释；使用 `cn` 合并类（`src/lib/utils.ts:5-7`）。
- 文件命名与目录遵循现有 `layouts/sidebar` 与 `components/ui/sheet` 的组织风格。