import { Link, Outlet, useLocation } from 'react-router'

export function AuthLayout() {
	const location = useLocation()

	return (
		<>
			<Outlet></Outlet>
			{location.pathname === '/login' && (
				<div>
					<div className='flex justify-center mt-1'>
						Нет аккаунта ?
						<Link to='/register' className='ml-2'>Зарегистрироваться</Link>
					</div>
				</div>
			)}
			{location.pathname === '/register' && (
				<div className='flex justify-center mt-1'>
				Уже зарегистрировались ? <Link to='/login' className='ml-2'>Войти</Link>
				</div>
			)}
		</>
	)
}
