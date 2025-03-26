import axios from 'axios'
import { getContentType } from '../api/api.helper'
import Cookies from 'js-cookie'
import { saveToStorage } from '../api/auth.helper'
import { IAuthResponse, IEmailPassword } from '../../store/user.interface'
import { instance } from '../api/api.interceptor'

export const AuthService = {
	async main(type: string, data: IEmailPassword) {
		const response = await instance<IAuthResponse>({
			url: `auth/${type}`,
			method: 'POST',
			data
		})

		if (response.data.accessToken) saveToStorage(response.data)

		return response.data
	},

	async getNewTokens() {
		const refreshToken = Cookies.get('refresh-token')

		const response = await axios.post<string, { data: IAuthResponse }>(
			process.env.SERVER_URL + 'auth/login/access-token',
			{ refreshToken },
			{ headers: getContentType() }
		)
		if (response.data.accessToken) saveToStorage(response.data)
	}
}
