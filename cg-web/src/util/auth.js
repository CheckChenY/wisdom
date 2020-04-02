import Cookies from 'js-cookie'
const TokenKey = 'x-access-token'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

export function getCookieData(key) {
    return Cookies.get(key)
}

export function setCookieData(key, token) {
    return Cookies.set(key, token)
}

export function removeCookieData(key) {
    return Cookies.remove(key)
}