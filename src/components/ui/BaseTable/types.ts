import type { Component } from 'vue'

export interface TableColumn {
  key: string
  label: string
  renderFunction?: Component | ((value: unknown) => string)
  benchmark?: { target: number; unit: string }
}

export type TableRow = Record<string, unknown> & { id: string }
