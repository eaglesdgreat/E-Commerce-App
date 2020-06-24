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

const listByOwner = (params, credentials) => {}

export {
  create,
  list,
  listByOwner,
}
