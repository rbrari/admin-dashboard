import type { Component } from 'vue'

export interface NavItem {
  name: string
  url: string
  icon: Component
  active?: boolean
}

export interface NavBarProps {
  items: NavItem[]
  title?: string
  className?: string
}
