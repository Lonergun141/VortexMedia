/* eslint-disable no-unused-vars */
import axios from 'axios';

const BACKEND_DOMAIN = 'https://d4ngk.pythonanywhere.com';

const REGISTER_URL = `${BACKEND_DOMAIN}/api/v1/auth/users/`;
const LOGIN_URL = `${BACKEND_DOMAIN}/api/v1/auth/jwt/create/`;
const ACTIVATE_URL = `${BACKEND_DOMAIN}/api/v1/auth/users/activation/`;
const RESET_PASSWORD_URL = `${BACKEND_DOMAIN}/api/v1/auth/users/reset_password/`;
const RESET_PASSWORD_CONFIRM_URL = `${BACKEND_DOMAIN}/api/v1/auth/users/reset_password_confirm/`;
const GET_USER_INFO = `${BACKEND_DOMAIN}/api/v1/auth/users/me/`;
const DELETE_USER = `${BACKEND_DOMAIN}/api/v1/auth/users/me/`;
// Register user

const register = async (userData) => {
	const config = {
		headers: {
			'Content-type': 'application/json',
		},
	};

	const response = await axios.post(REGISTER_URL, userData, config);

	return response.data;
};

// Login user

const login = async (userData) => {
	const config = {
		headers: {
			'Content-type': 'application/json',
		},
	};

	const response = await axios.post(LOGIN_URL, userData, config);

	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data));
	}

	return response.data;
};

// Logout

const logout = () => {
	return localStorage.removeItem('user');
};

// Activate user

const activate = async (userData) => {
	const config = {
		headers: {
			'Content-type': 'application/json',
		},
	};

	const response = await axios.post(ACTIVATE_URL, userData, config);

	return response.data;
};

// Reset Password

const resetPassword = async (userData) => {
	const config = {
		headers: {
			'Content-type': 'application/json',
		},
	};

	const response = await axios.post(RESET_PASSWORD_URL, userData, config);

	return response.data;
};

// Reset Password

const resetPasswordConfirm = async (userData) => {
	const config = {
		headers: {
			'Content-type': 'application/json',
		},
	};

	const response = await axios.post(RESET_PASSWORD_CONFIRM_URL, userData, config);

	return response.data;
};

// Get User Info

const getUserInfo = async (accessToken) => {
	const config = {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	};

	const response = await axios.get(GET_USER_INFO, config);

	return response.data;
};

export const deleteUser = async (accessToken, currentPassword) => {
	const config = {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	};
	const requestData = { current_password: currentPassword };
	try {
		await axios.delete(DELETE_USER, { ...config, data: requestData });
		return true;
	} catch (error) {
		if (error.response && error.response.status === 400) {
			console.error('Incorrect password:', error.response.data.message);
			return false;
		} else {
			console.error('Error deleting user:', error.message);
			return false;
		}
	}
};



const authService = {
	register,
	login,
	logout,
	activate,
	resetPassword,
	resetPasswordConfirm,
	getUserInfo,
	deleteUser,
};

export default authService;
