import type { Component } from 'vue'

export interface User {
  name: string
  email: string
  avatar: string
}

export interface Team {
  name: string
  logo: Component
  plan: string
}

export interface BaseNavItem {
  title: string
  badge?: string
  icon?: Component
}

export type NavLink = BaseNavItem & {
  url: string
  items?: never
}

export type NavCollapsible = BaseNavItem & {
  items: (BaseNavItem & { url: string })[]
  url?: never
}

export type NavItemType = NavCollapsible | NavLink

export interface NavGroup {
  title: string
  items: NavItemType[]
}

export interface SidebarData {
  user: User
  teams: Team[]
  navGroups: NavGroup[]
}
