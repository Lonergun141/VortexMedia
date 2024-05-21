/* eslint-disable no-unused-vars */
import React from 'react';
import Footer from '../../components/footer/footer';
import TextInput from '../../components/textField/textField';
import Button from '../../components/button/button';
import { Link } from 'react-router-dom';
import Styles from './styles/authentication.module.css';
import Logo from '../../assets/images/blackLogo.png';
import World from '../../assets/images/worldWord.png';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Box, Typography, Backdrop, Fade, CircularProgress } from '@mui/material';
import { register, reset } from '../../features/authSlice';
import PasswordStrength from '../../components/PasswordMeter/PasswordStrengthMeter';

const SignUp = () => {
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [showRequirements, setShowRequirements] = useState(false);

	const handlePasswordFocus = () => {
		setShowRequirements(true);
	};

	const handlePasswordBlur = () => {
		setShowRequirements(false);
	};

	const handleBack = () => {
		navigate('/VortexMedia/');
		dispatch(reset());
	};

	const [formData, setFormData] = useState({
		firstname: '',
		lastname: '',
		email: '',
		password: '',
		re_password: '',
	});
	const [formErrors, setFormErrors] = useState({
		email: false,
		name: false,
		password: false,
	});

	const { user, isLoading, isError, message, isSuccess } = useSelector((state) => state.auth);
	const { firstname, lastname, email, password, re_password } = formData;

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const validateEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const handleChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	//register

	const handleRegistration = (e) => {
		e.preventDefault();

		const newFormErrors = {
			email: email.trim() === '' || !validateEmail(email),
			name: firstname.trim() === '' || lastname.trim() === '',
			password: password.trim() === '' || password.length <= 12,
			cpassword: password.trim() !== re_password.trim(),
		};

		setFormErrors(newFormErrors);

		if (newFormErrors.email || newFormErrors.name || newFormErrors.password || newFormErrors.cpassword) {
			return;
		}

		const userData = {
			firstname,
			lastname,
			email,
			password,
			re_password,
		};

		dispatch(register(userData));
		console.log('New User', userData);
	};

	useEffect(() => {
		if (isSuccess) {
			handleOpen();
		}
		if (isError) {
			if (message === 'Email already in use') {
				toast.error('Email already in use');
			} else {
				toast.error(message);
			}
			dispatch(reset());
		}
	}, [isError, isSuccess, message, user, navigate, dispatch]);

	return (
		<div className={Styles.container}>
			<ToastContainer />
			<Modal open={isLoading} aria-labelledby="loading-modal" aria-describedby="loading-modal-description">
				<Box display="flex" justifyContent="center" alignItems="center" height="100vh">
					<CircularProgress size={80} />
				</Box>
			</Modal>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						bgcolor: 'white',
						boxShadow: 24,
						p: 4,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						borderRadius: '8px',
						maxWidth: '500px',
						width: '100%',
					}}>
					<Typography
						variant="h5"
						component="h1"
						sx={{ fontSize: '35px', fontWeight: 'bold', mb: 2, fontFamily: 'JuanaMedium' }}>
						<img src={Logo} alt="Vortex Media Logo" />
					</Typography>
					<img src="src/assets/GIF/mail-delivery.gif" alt="Envelope Icon" style={{ width: '200px', height: '200px' }} />
					<Typography
						id="modal-modal-description"
						sx={{ mt: 1, textAlign: 'center', mb: 1, fontSize: '30px', fontWeight: 'Medium', fontFamily: 'Poppins' }}>
						Check your Email
					</Typography>
					<Typography
						id="modal-modal-description"
						sx={{
							mt: 1,
							textAlign: 'center',
							mb: 1,
							fontSize: '12px',
							fontFamily: 'Poppins',
							color: 'gray',
							marginBottom: '20px',
						}}>
						Thank you for registering to our platform! We extend our heartfelt gratitude for choosing to join our community.
						Your registration marks the beginning of an exciting journey with us. Thank you for entrusting us with your
						presence and participation!
					</Typography>
				</Box>
			</Modal>
			<div className={Styles.content}>
				<div className={Styles.leftContainer}>
					<div className={Styles.logoContainer}>
						<img src={Logo} alt="Vortex Media Logo" />
					</div>
					<div className={Styles.signInText}>
						<h2>Enter your account information</h2>
						<TextInput
							label="Firstname"
							marginBottom={2}
							value={formData.firstname}
							onChange={handleChange}
							nameError={formErrors.name}
							name="firstname"
						/>
						<TextInput
							width={500}
							label="Lastname"
							marginBottom={2}
							value={formData.lastname}
							onChange={handleChange}
							nameError={formErrors.name}
							name="lastname"
						/>
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
							onFocus={handlePasswordFocus}
							onBlur={handlePasswordBlur}
						/>
						<PasswordStrength
							password={formData.password}
							showRequirements={showRequirements}
							setShowRequirements={setShowRequirements}
						/>
						<TextInput
							label="Confirm Password"
							password
							width={500}
							marginTop={2}
							marginBottom={2}
							passwordError={formErrors.password}
							PassNotMatch={formErrors.cpassword}
							value={formData.re_password}
							onChange={handleChange}
							name="re_password"
						/>
						<Button label="Register" onClick={handleRegistration} className={Styles.button} />
						<hr className={Styles.divider} />
						<p className={Styles.accountText}>Have an account?</p>
						<p className={Styles.registerLink} onClick={handleBack}>
							Sign In
						</p>
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

export default SignUp;
