function create () {
  if (mpvuePlatform === 'wx') {
    const Fly = require('Flyio/dist/npm/wx')
    return new Fly()
  }
  return null
}

export function get (url, params, showError = true) {
  const flyio = create()
  if (flyio) {
    return new Promise((resolve, reject) => {
      flyio.get(url, params).then(response => {
        console.log(response)
        if (response && response.data && response.data.error_code === 0) {
          resolve(response)
        } else {
          if (showError) {
            const msg = (response && response.data && response.data.msg) || '请求失败'
            mpvue.showToast({
              title: msg,
              duration: 2000
            })
          }
          reject(response)
        }
      })
    })
  }
}

function handleError (err) {
  console.log(err)
}

export function post (url, params, showError = true) {
  const flyio = create()
  if (flyio) {
    return new Promise((resolve, reject) => {
      flyio.post(url, params).then(response => {
        console.log(response)
        if (response && response.data && response.data.error_code === 0) {
          resolve(response)
        } else {
          if (showError) {
            const msg = (response && response.data && response.data.msg) || '请求失败'
            mpvue.showToast({
              title: msg,
              duration: 2000
            })
          }
          reject(response)
        }
      }).catch(err => {
        handleError(err)
        reject(err)
      })
    })
  }
}
