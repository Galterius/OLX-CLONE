import React, { useState, useEffect } from 'react';
import { getOneListing } from '../actions/listing_actions';
import { ShowItem } from '../components/ShowItem';
import { useListingStore } from '../store/ListingContext';
import { toJS } from 'mobx';
import { useObserver } from 'mobx-react-lite';

let initialS = [];
//if you like to something then it passes a the params and you can get is those with match
function Listing({ match }) {
  const listingStore = useListingStore();
  const [listing, setListing] = useState('');
  const [imageURLS, setImageUrl] = useState(initialS);

  useEffect(() => {
    fetchOneListing();
  }, []);

  const fetchOneListing = async () => {
    const oneListing = toJS(listingStore.selectedListing);

    if (oneListing[0]?._id != match.params.id) {
      const apiSelectedListing = await getOneListing(match.params.id);
      await listingStore.addOneListing(apiSelectedListing);
      setListing(apiSelectedListing);
      fillUrls(apiSelectedListing);
    } else {
      await setListing(oneListing[0]);
      fillUrls(oneListing[0]);
    }
  };

  const fillUrls = (plisting) => {
    initialS = [];
    plisting?.image?.forEach((img) => {
      initialS.push({ src: `${img}` });
    });
    setImageUrl(initialS);
  };

  return useObserver(() => (
    <div>
      {console.log(imageURLS)}
      <ShowItem listing={listing} listingId={match.params.id} imageURL={imageURLS} />
    </div>
  ));
}

export default Listing;
