import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { loadServer } from "jira-dev-tool";
import 'antd/dist/antd.less';
import { AppProviders } from './context';

loadServer(() => {
  ReactDOM.render(
    <AppProviders>
      <App />
    </AppProviders>,
    document.getElementById("root")
  );
});


