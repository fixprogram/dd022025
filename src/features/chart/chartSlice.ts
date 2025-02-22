import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Chart {
  id: number
  name: string
  type: string
  color: string
  dataseries: string
  xAxisName: string
  yAxisName: string
  description: string
}

const initialState: { charts: Chart[]; activeChart: Chart | null; searchQuery: string } = {
  charts: [],
  activeChart: null,
  searchQuery: ''
}

export const counterSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    createChart: (state, { payload: chart }: PayloadAction<Omit<Chart, 'id'>>) => {
      state.charts.push({ ...chart, id: Date.now() })
      if (state.charts.length === 1) {
        state.activeChart = state.charts[0]
      }
    },
    editChart: ({ charts }, { payload: chart }: PayloadAction<Chart>) => {
      charts.splice(
        charts.findIndex(({ id }) => id === chart.id),
        1,
        chart
      )
    },
    removeChart: ({ charts }, { payload }: PayloadAction<number>) => {
      charts.splice(
        charts.findIndex(({ id }) => id === payload),
        1
      )
    },
    selectChart: (state, { payload }: PayloadAction<number>) => {
      state.activeChart = state.charts.find(({ id }) => id === payload) || null
    },
    searchChart: (state, { payload }: PayloadAction<string>) => {
      state.searchQuery = payload
    }
  }
})

export const { createChart, editChart, removeChart, selectChart, searchChart } =
  counterSlice.actions

export default counterSlice.reducer
