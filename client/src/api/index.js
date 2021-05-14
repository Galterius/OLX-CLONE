import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchListings = () => API.get('/api/listings');
export const fetchOneListing = (id) => API.get(`/api/listings/${id}`);
export const newListing = (listing, options) => API.post('/api/listings', listing, options);
export const editListing = (id, updateList, listingCreator) =>
  API.put(`/api/listings/${id}`, updateList, { params: { listingCreator } });
export const deleteListing = (id, listingCreator) =>
  API.delete(`/api/listings/${id}`, { params: { listingCreator } });

export const createComment = (listingId, comment) =>
  API.post(`/api/listings/${listingId}/comments`, comment);
export const editComment = (commentId, comment) =>
  API.put(`/api/listings/:id/comments/${commentId}`, comment);
export const deleteComment = (commentId) => API.delete(`/api/listings/:id/comments/${commentId}`);

export const getUser = (id) => API.get(`/user/userprofile/${id}`);
export const updatedUser = (id, updatedUser) => API.put(`/user/userprofile/${id}`, updatedUser);

export const singIn = (formData) => API.post('/auth/login', formData);
export const singUp = (formData) => API.post('/auth/register', formData);
export const googleSignIn = (authData) => API.post('/auth/gsignin', authData);
