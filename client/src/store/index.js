import React from "react";
import {createStore,applyMiddleware,compose} from "redux"
import thunk from "redux-thunk";

import AppReducers from "./reducers";

const Redux_store=()=>{
  
  
    const composeenhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    const store=createStore(AppReducers,composeenhancer(applyMiddleware(thunk)))
    return store
}
export default Redux_store
