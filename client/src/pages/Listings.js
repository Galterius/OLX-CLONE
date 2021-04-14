import React from 'react';
import { ListItem } from '../components/ListItem';
import { useListingStore } from '../store/ListingContext';
import { useObserver } from 'mobx-react-lite';

function Listings() {
  const listingStore = useListingStore();

  return useObserver(() => (
    <div>
      <ul>
        {listingStore.listings.map((listing) => (
          <ListItem key={listing._id} title={listing.title} id={listing._id} />
        ))}
      </ul>
    </div>
  ));
}

export default Listings;
