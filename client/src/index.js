import React from 'react';
import ReactDOM from 'react-dom';
import Main from "./routes/main"
import {Provider} from "react-redux"
import Redux_store from "./store/index"
ReactDOM.render(
  <>
    <Provider store={Redux_store()}>
    <Main/>
    </Provider>
    </>
,
  document.getElementById('root')
);

