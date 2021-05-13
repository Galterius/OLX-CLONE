import React from 'react';

import { AddFormItem } from '../components/AddListingForm/NewListingFormItem';

function NewListing() {
  const user = JSON.parse(localStorage.getItem('profile'));

  if (!user?.result?.name) {
    return (
      <div>
        <p>Please log in to submit a listing. Thank you</p>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-6 offset-3">
        <AddFormItem name={user?.result?.name} />
      </div>
    </div>
  );
}

export default NewListing;
