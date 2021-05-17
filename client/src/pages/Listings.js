import React from 'react';
import { useListingStore } from '../store/ListingContext';
import { useObserver } from 'mobx-react-lite';
import { CardView } from '../components/views/CardView';
import { makeStyles } from '@material-ui/core/styles';
import { Container, CssBaseline, Grid } from '@material-ui/core';

function Listings() {
  const listingStore = useListingStore();
  const classes = useStyles();

  return useObserver(() => (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container spacing={2}>
          {listingStore.listings.map((listing, index) => (
            <Grid key={index} item xs={12}>
              <CardView
                key={listing._id}
                id={listing._id}
                title={listing.title}
                description={listing.description}
                createdAt={listing.createdAt}
                imgUrl={listing.image[0]}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </Container>
  ));
}

export default Listings;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));
