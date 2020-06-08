import {get, post} from '../utils/request'
import {WECHAT_CONFIG} from '@/utils/const.js'

const API_URL = 'https://test.youbaobao.xyz:18081'

export function getHomeData (params) {
  return get(`${API_URL}/book/home/v2`, params)
}

export function recommend () {
  return get(`${API_URL}/book/home/recommend/v2`)
}

export function freeRead () {
  return get(`${API_URL}/book/home/freeRead/v2`)
}

export function hotBook () {
  return get(`${API_URL}/book/home/hotBook/v2`)
}

export function getOpenId (code) {
  return get(`${API_URL}/openId/get`, {
    appId: WECHAT_CONFIG.APP_ID,
    secret: WECHAT_CONFIG.SECRETE_KEY,
    code
  })
}

export function register (openId, userInfo) {
  return post(`${API_URL}/user/register`, {
    openId,
    platform: mpvuePlatform,
    ...userInfo
  })
}

export function getList (params) {
  return get(`${API_URL}/book/search`, params)
}

export function getHotSearchList () {
  return get(`${API_URL}/book/hot-search`)
}

export function getBookDetail (params) {
  return get(`${API_URL}/book/detail`, params)
}

export function rankSave (params) {
  return get(`${API_URL}/book/rank/save`, params)
}

export function getContents (params) {
  return get(`${API_URL}/book/contents`, params)
}

export function getShelfStatus (params) {
  return get(`${API_URL}/book/shelf/get`, params)
}

export function bookShelfSave (params) {
  return get(`${API_URL}/book/shelf/save`, {
    shelf: JSON.stringify(params)
  })
}

export function bookShelfRemove (params) {
  return get(`${API_URL}/book/shelf/remove`, {
    shelf: JSON.stringify(params)
  })
}

export function getSearchList (params) {
  return get(`${API_URL}/book/search-list`, params)
}

export function getCategoryList () {
  return get(`${API_URL}/book/category/list/v2`)
}
