import {getOpenId} from '@/api/index.js'

export function getSetting (auth, onSuccess, onFail) {
  mpvue.getSetting({
    success (res) {
      console.log(res)
      if (res.authSetting[`scope.${auth}`]) { onSuccess() }
    },
    fail (res) {
      onFail()
    }
  })
}

export function getUserInfo (onSuccess, onFail) {
  mpvue.getUserInfo({
    success (res) {
      console.log('getUserInfo', res)
      const {userInfo} = res
      if (userInfo) {
        onSuccess(userInfo)
      } else {
        onFail(res)
      }
    },
    fail (res) {
      console.log(res)
    }
  })
}

export function setStorageSync (key, value) {
  mpvue.setStorageSync(key, value)
}

export function getStorageSync (key) {
  return mpvue.getStorageSync(key)
}

export function login (callback) {
  mpvue.login({
    success (res) {
      console.log(res)
      const {code} = res
      getOpenId(code).then(res => {
        console.log('openId', res)
        const {data: {data: openid}} = res
        setStorageSync('openId', openid)
        callback && callback(openid)
      }).catch(e => {
        console.log(e)
      })
    },
    fail (res) {
      console.log(res) // 抛出异常
    }
  })
}

export function showLoading (title) {
  mpvue.showLoading({
    title,
    mask: true,
    duration: 2000
  })
}

export function hideLoading () {
  mpvue.hideLoading()
}

export function showToast (title) {
  mpvue.showToast({
    title,
    duration: 2000
  })
}

export function setNavigationBarTitle (param) {
  mpvue.setNavigationBarTitle({title: param})
}
