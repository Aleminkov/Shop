import { BrowserRouter, Routes, Route } from 'react-router'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './components/Home/Home.tsx'
import { AuthLayout } from './components/auth/AuthLayout.tsx'
import { Login } from './components/auth/login/Login.tsx'
import { Register } from './components/auth/Register/Register.tsx'


createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<Routes>
			<Route path='/' element={<Home />} />
			<Route element={<AuthLayout />}>
				<Route path='login' element={<Login />} />
				<Route path='register' element={<Register />} />
			</Route>
		</Routes>
	</BrowserRouter>
)
