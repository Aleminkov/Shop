export function Login() {
	return (
		<div className='flex justify-center'>
			<form action='' className='flex flex-col'>
				<input type='email' className='border-1' placeholder='Email' />
				<input type='password' className='border-1' placeholder='Password' />
				<button className='border-1'>Войти</button>
			</form>
		</div>
	)
}
