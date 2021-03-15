import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import About from './components/pages/About'
import Home from './components/pages/Home'

import Listings from './components/pages/Listings'
import Show from './components/pages/Show'
import NewListing from './components/pages/NewListing'
import Edit from './components/pages/Edit'

import Register from './components/pages/Register';

import  NavigationBar  from './components/NavigationBar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


function App() {
  return (
    //eveything that is between the router tag will have the ability to route
    <Router>
    <div className="App">
      <NavigationBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About}/>

        <Route exact path="/listings" component={Listings}/>
        <Route exact path='/listing/:id' component={Show}/>
        <Route exact path='/listing/edit/:id' component={Edit} />
        <Route path="/addlisting" component={NewListing} />

        <Route exact path='/register' component={Register}/>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
