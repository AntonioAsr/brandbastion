import { configureStore } from "@reduxjs/toolkit"
import { rootReducer } from "../redux/rootReducer"
import { api } from "../app/brandbastion"

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export default store
