import React from 'react';
import { useListingStore } from '../store/ListingContext';
import { useObserver } from 'mobx-react-lite';
import { CardView } from '../components/views/CardView';
import { makeStyles } from '@material-ui/core/styles';

function Listings() {
  const listingStore = useListingStore();
  const useStyles = makeStyles((theme) => ({
    alignItemsAndJustifyContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }));

  const classes = useStyles();

  return useObserver(() => (
    <div className={classes.alignItemsAndJustifyContent}>
      {listingStore.listings.map((listing) => (
        <CardView
          key={listing._id}
          id={listing._id}
          title={listing.title}
          description={listing.description}
          createdAt={listing.createdAt}
          imgUrl={listing.image[0]}
        />
      ))}
    </div>
  ));
}

export default Listings;
