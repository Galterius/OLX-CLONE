import React,{useState, useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import About from './pages/About'
import Home from './pages/Home'

import Listings from './pages/Listings'
import Show from './pages/Show'
import NewListing from './pages/NewListing'
import Edit from './pages/Edit'

import Register from './pages/Register';

import  NavigationBar  from './components/NavigationBar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import * as api from './api/index';
import { useListingStore } from './store/ListingContext'

function App() {
  const listingStore = useListingStore();

  // const [listings, setListing] = useState([])
  // useEffect(() => {
  //     fetchAllListings(); 
  // },[])

  // const fetchAllListings = async () =>{
  //     const { data } = await api.fetchListings();
  //     data.forEach(element => listingStore.addListings(element))
  //     setListing(listingStore.listings)
  //     console.log("1")
  // }


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
