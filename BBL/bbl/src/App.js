import React, { Route, BrowserRouter } from 'react';

import './App.css';
import Login from './Login/Login';
import MachineDashboard from './Login/Dashboard/MachineDashboard';



class App extends React.Component {

 

  render() {
    const routes = [{
      path: '/',
      component: Login,
    }, {
      path: '/MachineDashboard',
      component: MachineDashboard,
    }];
    
    const routeComponents = routes.map(({ path, component }, key) => 
    <Route exact path={path}  key={key} render={(props) => <path.component {...props} />} />)

    return (
      <BrowserRouter> 
        {routeComponents}
       
      </BrowserRouter>
    );
  }
}

export default App;
