/* eslint-disable no-unused-vars */
import Footer from '../../components/footer/footer';
import TextInput from '../../components/textField/textField';
import Button from '../../components/button/button';
import { Link } from 'react-router-dom';
import Styles from './styles/authentication.module.css';
import Logo from '../../assets/images/blackLogo.png';
import World from '../../assets/images/worldWord.png';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, getUserInfo, reset } from '../../features/authSlice';
import { toast, ToastContainer } from 'react-toastify';
import { Modal, Box, CircularProgress } from '@mui/material';

const SignIn = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const [formErrors, setFormErrors] = useState({
		email: false,
		password: false,
	});

	const { email, password } = formData;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user, isLoading, isError, message, isSuccess, accessToken } = useSelector((state) => state.auth);

	const handleChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleLogin = (e) => {
		e.preventDefault();
		const validateEmail = (email) => {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			return emailRegex.test(email);
		};
		const newFormErrors = {
			email: email.trim() === '' || !validateEmail(email),
			password: password.trim() === '',
		};
		setFormErrors(newFormErrors);
		if (newFormErrors.email || newFormErrors.password) {
			return;
		}
		const userData = { email, password };
		dispatch(login(userData))
			.unwrap()
			.then((response) => {
				dispatch(getUserInfo());
			})
			.catch((error) => {
				console.error('Login error:', error);
			});
		dispatch(reset());
		localStorage.setItem('accessToken', accessToken);
	};

	useEffect(() => {
		if (isError) {
			if (message === 'Account not activated') {
				toast.error(
					'Account not activated',
					'Your account is not activated yet. Please check your email for the activation link.'
				);
			} else {
				toast.error(message);
			}
		}

		if (isSuccess || user) {
			navigate('/VortexMedia/World');
			localStorage.setItem('accessToken', accessToken);
		}

		dispatch(reset());
		dispatch(getUserInfo());
	}, [isError, isSuccess, message, user, navigate, dispatch, accessToken]);

	return (
		<div className={Styles.container}>
			<ToastContainer />
			<Modal open={isLoading} aria-labelledby="loading-modal" aria-describedby="loading-modal-description">
				<Box display="flex" justifyContent="center" alignItems="center" height="100vh">
					<CircularProgress size={80} />
				</Box>
			</Modal>
			<div className={Styles.content}>
				<div className={Styles.leftContainer}>
					<div className={Styles.logoContainer}>
						<img src={Logo} alt="Vortex Media Logo" />
					</div>
					<div className={Styles.signInText}>
						<h2>Enter your email and password</h2>
						<TextInput
							label="Email Address"
							width={500}
							marginBottom={2}
							emailError={formErrors.email}
							value={formData.email}
							onChange={handleChange}
							name="email"
						/>
						<TextInput
							label="Password"
							password
							width={500}
							onChange={handleChange}
							marginBottom={2}
							passwordError={formErrors.password}
							value={formData.password}
							name="password"
						/>
						<Button label="Continue" onClick={handleLogin} className={Styles.button} />
						<Link to="/VortexMedia/ResetPass" className={Styles.underlineLink}>
							Forgot Password?
						</Link>
						<hr className={Styles.divider} />
						<p className={Styles.accountText}>Dont have an account?</p>
						<Link to="/VortexMedia/SignUp" className={Styles.registerLink}>
							Register Now
						</Link>
					</div>
				</div>
				<div className={Styles.wordCloudContainer}>
					<img src={World} alt="World word cloud" />
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default SignIn;
