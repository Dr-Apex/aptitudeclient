import {API} from '../../backend';

// topic calls
// get all topics
export const getTopics = () => {
  return fetch(`${API}/topics`, {
    method: 'GET'
  })
  .then(response => {
    return response.json();
  })
  .catch(err => console.log(err));
};

// get a topic
export const getTopic = topicId => {
  return fetch(`${API}/topic/${topicId}`, {
    method: 'GET'
  })
  .then(response => {
    return response.json();
  })
  .catch(err => console.log(err));
};

// category calls
// get all categories
export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: 'GET'
  })
  .then(response => {
    return response.json();
  })
  .catch(err => console.log(err));
};

// get a category
export const getCategory = categoryId => {
  return fetch(`${API}/category/${categoryId}`, {
    method: 'GET'
  })
  .then(response => {
    return response.json();
  })
  .catch(err => console.log(err));
};

// product calls
// get all products
export const getProducts = () => {
  return fetch(`${API}/products`, {
    method: 'GET'
  })
  .then(response => {
    return response.json();
  })
  .catch(err => console.log(err));
};

// get a product
export const getProduct = productId => {
  return fetch(`${API}/product/${productId}`, {
    method: 'GET'
  })
  .then(response => {
    return response.json();
  })
  .catch(err => console.log(err));
};

// update
export const updateProduct = (productId, userId, token, product) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(product)
  })
  .then(response => {
    return response.json();
  })
  .catch(err => console.log(err));
};
