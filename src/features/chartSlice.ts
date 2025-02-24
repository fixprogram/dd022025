import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export const chartTypes = ['line', 'bar'] as const
export const chartColors = ['blue', 'red', 'green', 'yellow', 'orange'] as const

export interface Chart {
  id: number
  name: string
  type: (typeof chartTypes)[number]
  color: (typeof chartColors)[number]
  dataseries: string
  xAxisName: string
  yAxisName: string
  description: string
}

const initialState: { charts: Chart[]; searchQuery: string | null } = {
  charts: [],
  searchQuery: null
}

export const counterSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    createChart: (state, { payload: chart }: PayloadAction<Omit<Chart, 'id'>>) => {
      state.charts.push({ ...chart, id: Date.now() })
    },
    editChart: (state, { payload: chart }: PayloadAction<Chart>) => {
      state.charts.splice(
        state.charts.findIndex(({ id }) => id === chart.id),
        1,
        chart
      )
    },
    removeChart: (state, { payload }: PayloadAction<number>) => {
      state.charts.splice(
        state.charts.findIndex(({ id }) => id === payload),
        1
      )
    },
    searchChart: (state, { payload }: PayloadAction<string | null>) => {
      state.searchQuery = payload
    }
  }
})

export const { createChart, editChart, removeChart, searchChart } = counterSlice.actions

export default counterSlice.reducer
