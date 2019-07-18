
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://lh3.googleusercontent.com/-URo4uEZUh1U/AAAAAAAAAAI/AAAAAAAAAAA/kDc_AFetj78/mo/photo.jpg?sz=96',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://lh3.googleusercontent.com/-URo4uEZUh1U/AAAAAAAAAAI/AAAAAAAAAAA/kDc_AFetj78/mo/photo.jpg?sz=96',
    name: 'Normal Editor'
  }
}

export default [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  {
    url: '/user/aut222h',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users['admin-token']

      return {
        code: 20000,
        data: info
      }

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: '查询不到用户信息.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
