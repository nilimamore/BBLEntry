import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter  as Router, Switch, Route  } from "react-router-dom"; 
import './index.css';
import reportWebVitals from './reportWebVitals';
import OperatorLevel from './Operator/OperatorLevel';
// import SuperVisor from './Supervisor/Supervisor';
import UniversalLogin from './Login/UniversalLogin';
import Supervisor from './Supervisor/Supervisor';

const routes = [{
  path: '/',
  component: UniversalLogin,
  name:"UniversalLogin"
}, {
  path: '/OperatorLevel',
  component: OperatorLevel,
  name:"OperatorLevel"
},
{
  path: '/Supervisor',
  component: Supervisor,
  name:"SuperVisor"
}
];

ReactDOM.render(
  <Router>
            <Switch>
              {
                routes.map(({path,component})=>{
                return (<Route exact path={path} component={component}/>)
              })
            }
              <Route  component={UniversalLogin}/>
            </Switch>
      </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
