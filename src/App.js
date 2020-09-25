import React, { createContext, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Review from './components/Review/Review';
import Manage from './components/Manage/Manage';
import NotFound from './components/NotFound/NotFound';
import Detail from './components/ProductDetail/Detail';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link 
} from "react-router-dom";
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const userContext = createContext();

function App() {
  const [loggedInUser, setloggedInUser] = useState({});
  return (
    <userContext.Provider value = {[loggedInUser, setloggedInUser]}>
     <p>email:{loggedInUser.email}</p>
      <Router>
      <Header></Header> 
        <Switch>
          <Route path='/Shop'> 
            <Shop></Shop>
          </Route>
          <Route path='/Review'>
          <Review></Review>
          </Route>
          <Route path='/Manage'>
            <Manage></Manage>
          </Route>
          <Route path='/login'>
            <Login></Login>
          </Route>
          <PrivateRoute path='/shipment'>
            <Shipment></Shipment>
          </PrivateRoute>
          <Route exact path='/'>
            <Shop></Shop>
          </Route>
          <Route path="/product/:productKey">
            <Detail></Detail>
          </Route>
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;
