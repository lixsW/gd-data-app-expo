import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store/index'

interface CounterState {
  value: number
}
const initialState: CounterState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

export const { increment, incrementByAmount } = counterSlice.actions

// 选择器等其他代码可以使用导入的 `RootState` 类型
export const selectCount = (state: RootState) => state.counter.value

export default counterSlice.reducer
