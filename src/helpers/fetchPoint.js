import axios from 'axios'
import store from '../store'

export const getToken = () => sessionStorage.getItem('token')

export const setToken = token => {
  sessionStorage.setItem('token', token)
}
export const removeToken = () => {
  sessionStorage.removeItem('token')
}

export const getSelectYear = () => localStorage.getItem('selectYear')

export const setSelectYear = item => {
  localStorage.setItem('selectYear', item)
}
export const removeSelectYear = () => {
  localStorage.removeItem('selectYear')
}
export const getDocument = () => localStorage.getItem('document')

export const setDocument = item => {
  localStorage.setItem('document', item)
}
export const removeDocument = () => {
  localStorage.removeItem('document')
}

export const getCsiDocument = () => localStorage.getItem('csi-document')

export const setCsiDocument = item => {
  localStorage.setItem('csi-document', item)
}
export const removeCsiDocument = () => {
  localStorage.removeItem('csi-document')
}
export const getTeam = () => localStorage.getItem('team')

export const setTeam = item => {
  localStorage.setItem('team', item)
}
export const removeTeam = () => {
  localStorage.removeItem('team')
}

export const getCsiTeam = () => localStorage.getItem('csi-team')

export const setCsiTeam = item => {
  localStorage.setItem('csi-team', JSON.stringify(item))
}
export const removeCsiTeam = () => {
  localStorage.removeItem('csi-team')
}

export const getPlan = () => localStorage.getItem('planId')

export const setPlan = item => {
  localStorage.setItem('planId', item)
}
export const removePlan = () => {
  localStorage.removeItem('planId')
}

export const getDarkTheme = () => localStorage.getItem('dark_theme')
export const setDarkTheme = theme => {
  localStorage.setItem('dark_theme', theme)
}

export const getPro = () => localStorage.getItem('pro')
export const setPro = val => {
  localStorage.setItem('pro', val)
}
export const removePro = () => {
  localStorage.removeItem('pro')
}
export const baseURL = axios.create({
  baseURL: 'http://sks-back.beeline.kg:8060',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  }
})
export const getAxios = url => {
  store.state.loading = true
  store.state.error = false
  return axios({
    method: 'GET',
    url,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  })
    .then(r => {
      store.state.loading = false
      return r.data
    })
    .catch(e => {
      store.state.loading = false
      store.commit('setError')
      store.commit('setSnackbars', e.message)
    })
}
export const postAxios = (url, payload, snackbars) => {
  store.state.loading = true
  store.state.error = false
  return axios({
    method: 'POST',
    url,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    data: payload,
  })
    .then(r => {
      store.state.loading = false
      store.commit('setSnackbars', 'Успешно добавлено')
      return r.data
    })
    .catch(e => {
      store.state.loading = false
      if (snackbars) {
        store.commit('setSnackbars', snackbars)
        return
      }
      if (e.response) {
        store.commit('setSnackbars', e.response.data)
        return
      }
      store.commit('setError')
      store.commit('setSnackbars', e.message)
    })
}
export const postWithoutSnack = (url, payload) => {
  store.state.loading = true
  store.state.error = false
  return axios({
    method: 'POST',
    url,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    data: payload,
  })
    .then(r => {
      store.state.loading = false
      return r.data
    })
    .catch(e => {
      store.state.loading = false
      store.commit('setError')
      store.commit('setSnackbars', e.message)
    })
}

export const uploadAxios = (url, formData) => {
  store.state.loading = true
  store.state.error = false
  return axios.post(
    url,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${getToken()}`,
      },
    },
  )
    .then(r => {
      store.state.loading = false
      store.commit('setSnackbars', 'Успешно отправлено')
      return r.data
    })
    .catch(e => {
      store.state.loading = false
      store.commit('setError')
      store.commit('setSnackbars', e.message)
    })
}

export const extraAxios = (method, url, payload) => {
  store.state.loading = true
  store.state.error = false
  axios({
    method: method,
    url,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    data: payload,
  }).then(r => {
    store.state.loading = false
    store.commit('setSnackbars', 'Успешно изменено')
    return r.data
  })
    .catch(e => {
      store.state.loading = false
      store.commit('setError')
      store.commit('setSnackbars', e.message)
    })
}

export const putAxios = (url, payload) => {
  store.state.loading = true
  store.state.error = false
  const data = axios({
    method: 'PUT',
    url,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    data: payload,
  }).then(r => {
    store.state.loading = false
    store.commit('setSnackbars', 'Успешно изменено')
    return r.data
  })
    .catch(e => {
      store.state.loading = false
      if (e.response) {
        store.commit('setSnackbars', e.response.data)
        return
      }
      store.commit('setError')
      store.commit('setSnackbars', e.message)
    })
  return data
}
export const deleteAxios = (url, payload) => {
  store.state.loading = true
  store.state.error = false
  const data = axios({
    method: 'DELETE',
    url,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    data: payload,
  }).then(r => {
    r.data
    store.state.loading = false
    store.commit('setSnackbars', 'Успешно удалено')
  })
    .catch(e => {
      store.state.loading = false
      store.commit('setError')
      store.commit('setSnackbars', e.message)
    })
  return data
}

export function debounce (fn, delay) {
  let timeoutID = null
  return function () {
    clearTimeout(timeoutID)
    let args = arguments
    let that = this
    timeoutID = setTimeout(function () {
      fn.apply(that, args)
    }, delay)
  }
}

