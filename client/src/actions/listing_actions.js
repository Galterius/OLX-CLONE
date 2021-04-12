import { FETCH_ALL, FETCH_ONE, CREATE, UPDATE, DELETE } from '../constants/actionTypes';
import * as api from '../api/index';

export const getListing = async () => {
  try {
    const { data } = await api.fetchListings();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getOneListing = async (id) => {
  try {
    const { data } = await api.fetchOneListing(id);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createListing = async (formData) => {
  try {
    const { data } = await api.newListing(formData);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteListing = async (id, listingCreator, history) =>{
  try {
    console.log(listingCreator);
    const { data } = await api.deleteListing(id, listingCreator);

    history.push('/listings');

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const editListing = async (id, listing, history, listingCreator) =>{
  try {
    const { data } = await api.editListing(id, listing, listingCreator);

    history.push('/listings');
    return data;
    
  } catch (error) {
    console.log(error);
  }
};
