import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Users/Login';
import Signup from './components/Users/Signup';
import Contact from './components/Contact';
import Detail from './components/Listings/Detail';
import Create from './components/Listings/Create';
import ImagesUpload from './components/Listings/imgUpload';
import Profile from './components/Users/Profile';
import Edit from './components/Listings/Edit';
import About from './components/About';

const BaseRouter = () => (
  <div>
    <Switch>
      <Route exact path='/contact' component={Contact} />
      <Route exact path='/about' component={About} />
      <Route exact path='/' component={Home} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/profile' component={Profile} />
      <Route exact path='/listing/create' component={Create} />
      <Route
        exact
        path='/listing/imgupload/:listingId'
        component={ImagesUpload}
      />
      <Route exact path='/listing/edit/:listingId' component={Edit} />
      <Route exact path='/listing/:listingId' component={Detail} />
    </Switch>
  </div>
);

export default BaseRouter;
