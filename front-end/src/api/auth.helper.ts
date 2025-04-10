import Cookies from 'js-cookie'
import { IAuthResponse, ITokens } from './../../store/user.interface'

export const getAccessToken = () =>{
    const accessToken = Cookies.get('accessToken')
    return accessToken || null
}

export const getUserFromStorage = () => {
	return JSON.parse(localStorage.getItem('user') || '{}')
}

export const saveTokensStorage = (data: ITokens) => {
	Cookies.set('accessToken', data.accessToken)
	Cookies.set('refreshToken', data.refreshToken)
}

export const removeTokensStorage = () => {
	Cookies.remove('accessToken')
	Cookies.remove('refreshToken')
}

export const saveToStorage = (data: IAuthResponse) => {
	saveToStorage(data)
	localStorage.setItem('user', JSON.stringify(data.user))
}
