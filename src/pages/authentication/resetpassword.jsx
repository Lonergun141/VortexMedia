import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { resetPassword, reset } from '../../features/authSlice';
import TextInput from '../../components/textField/textField';
import Button from '../../components/button/button';
import Styles from './styles/resetPassword.module.css';
import { Modal, Box, CircularProgress } from '@mui/material';
import Logo from '../../assets/images/blackLogo.png';
import Footer from '../../components/footer/footer';

const ResetPassword = () => {
	const [formData, setFormData] = useState({
		email: '',
	});

	const { email } = formData;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

	const handleChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const userData = {
			email,
		};
		dispatch(resetPassword(userData));
	};

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		if (isSuccess) {
			toast.success('A reset password email has been sent to you.');
			dispatch(reset());
		}
	}, [isError, isSuccess, message, navigate, dispatch]);

	return (
		<div className={Styles.container}>
			<ToastContainer />
			<Modal open={isLoading} aria-labelledby="loading-modal" aria-describedby="loading-modal-description">
				<Box display="flex" justifyContent="center" alignItems="center" height="100vh">
					<CircularProgress size={80} />
				</Box>
			</Modal>

			<div className={Styles.content}>
				<div className={Styles.logoContainer}>
					<img src={Logo} alt="Vortex Media Logo" />
				</div>
				<h1 className={Styles.mainTitle}>Reset Password</h1>
				<p>Forgot your password? Dont worry we can help you</p>
				<div className={Styles.inputfield}>
					<TextInput
						label="Email Address"
						width={900}
						marginBottom={2}
						emailError={false}
						value={formData.email}
						onChange={handleChange}
						name="email"
					/>
				</div>

				<Button label="Reset Password" onClick={handleSubmit} className={Styles.button} />
			</div>

			<Footer />
		</div>
	);
};

export default ResetPassword;
