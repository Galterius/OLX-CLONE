import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ListingProvider } from './store/ListingContext';
//store is a globalized state where you can pull data from with redux so you don't have to go down on the component tree


ReactDOM.render(
    <React.StrictMode>
      <ListingProvider>
        <App />
      </ListingProvider>
    </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
