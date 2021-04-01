import React from 'react';
import { createListingsStore } from './listingStore';
import { useLocalStore } from 'mobx-react';

const ListingContext = React.createContext(null);

export const ListingProvider = ({ children }) => {
  const listingStore = useLocalStore(createListingsStore);

  return <ListingContext.Provider value={listingStore}> {children} </ListingContext.Provider>;
};

export const useListingStore = () => React.useContext(ListingContext);
