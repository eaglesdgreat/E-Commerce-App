const signin = (data) => {
  return fetch('/auth/signin', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

const signout = () => {
  return fetch('/api/signout', {
    method: 'GET',
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

export { signin, signout }
