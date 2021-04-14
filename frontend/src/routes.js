import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Users/Login';
import Signup from './components/Users/Signup';
import Contact from './components/Contact';
import Detail from './components/Listings/Detail';
import Create from './components/Listings/Create';
import ImagesUpload from './components/Listings/imgUpload';
import imgUpload from './components/Listings/COPY';
import Profile from './components/Users/Profile';
import Edit from './components/Listings/Edit';
import About from './components/About';
import ConfirmDel from './components/Listings/ConfirmDel';
import ConfirmRes from './components/Listings/ConfirmRes';

const BaseRouter = () => (
  <div>
    <Switch>
      <Route exact path='/contact' component={Contact} />
      <Route exact path='/about' component={About} />
      <Route exact path='/' component={Home} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/profile' component={Profile} />

      {/* all listing routes */}
      <Route exact path='/listing/create' component={Create} />
      <Route exact path='/listing/imgupload/:listingId' component={imgUpload} />
      <Route exact path='/listing/edit/:listingId' component={Edit} />
      <Route exact path='/listing/:listingId' component={Detail} />
      <Route
        exact
        path='/listing/confirm/delete/:listingId'
        component={ConfirmDel}
      />
      <Route exact path='/reservation/confirm/' component={ConfirmRes} />
    </Switch>
  </div>
);

export default BaseRouter;
