export const signup = user => (
  $.ajax({
    method: 'POST',
    url: '/users',
    data: {
      user
    },
  })
);

export const login = user => (
  $.ajax({
    method: 'POST',
    url: '/session',
    data: {
      user
    },
  })
);

export const logout = () => (
  $.ajax({
    method: 'DELETE',
    url: '/session'
  })
);
