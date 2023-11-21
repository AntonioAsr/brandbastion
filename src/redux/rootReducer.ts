import { combineReducers } from "redux"
import { api } from "../app/brandbastion"

export const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
})

export type RootState = ReturnType<typeof rootReducer>
