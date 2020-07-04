// import fetch from 'isomorphic-fetch'

const create = (param, credentials, shop) => {
  return fetch(`/api/shops/by/${param.userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${credentials.t}`,
    },
    body: shop,
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

const list = () => {
  return fetch('/api/shops', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

const listByOwner = (params, credentials) => {
  return fetch(`/api/shops/by/${params.userId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${credentials.t}`,
    },
  })
    .then((res) => { return res.json() })
    .catch((err) => console.log(err))
}

const read = (params) => {
  return fetch(`/api/shop/${params.shopId}`, {
    method: 'GET',
  })
    .then((res) => { return res.json() })
    .catch((err) => console.log(err))
}

const update = (params, credentials, shop) => {
  return fetch(`/api/shop/${params.shopId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${credentials.t}`,
    },
    body: shop,
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

const remove = (params, credentials) => {
  return fetch(`/api/shop/${params.shopId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${credentials.t}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

export {
  create,
  list,
  listByOwner,
  read,
  update,
  remove,
}
