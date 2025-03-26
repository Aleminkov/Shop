import { useState } from 'react'

export function Register() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	return (
		<div className='flex justify-center'>
			<form action='' className='flex flex-col'>
				<input
					type='email'
					className='border-1'
					placeholder='Email'
					onChange={e => setEmail(e.target.value)}
				/>
				<input
					type='password'
					className='border-1'
					placeholder='Password'
					onChange={e => setPassword(e.target.value)}
				/>
				<button className='border-1'>Зарегестрироваться</button>
			</form>
		</div>
	)
}
