import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { resetPasswordConfirm } from '../../features/authSlice';
import TextInput from '../../components/textField/textField';
import Button from '../../components/button/button';
import { Modal, Box, CircularProgress, Typography, Container } from '@mui/material';
import PasswordStrength from '../../components/PasswordMeter/PasswordStrengthMeter';
import styles from './styles/Resetpasswordchange.module.css';
import Logo from '../../assets/images/blackLogo.png';
import Footer from '../../components/footer/footer';

const Resetpasswordchange = () => {
	const { uid, token } = useParams();
	const [formData, setFormData] = useState({
		new_password: '',
		re_new_password: '',
	});
	const { new_password, re_new_password } = formData;
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);
	const [formErrors, setFormErrors] = useState({
		new_password: false,
		re_new_password: false,
	});
	const [showRequirements, setShowRequirements] = useState(false);

	const handlePasswordFocus = () => {
		setShowRequirements(true);
	};

	const handlePasswordBlur = () => {
		setShowRequirements(false);
	};

	const handleChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const newFormErrors = {
			password: new_password.trim() === '' || new_password.length <= 12,
			cpassword: new_password.trim() !== re_new_password.trim(),
		};
		setFormErrors(newFormErrors);
		if (newFormErrors.password || newFormErrors.cpassword) {
			return;
		}
		const userData = { uid, token, new_password, re_new_password };
		dispatch(resetPasswordConfirm(userData));
	};

	useEffect(() => {
        if (isError) {
          toast.error(message);
        }
        if (isSuccess) {
          toast.success('Your password was reset successfully.');
        }
      }, [isError, isSuccess, message, navigate, dispatch]);

	return (
		<div className={styles.root}>
			<ToastContainer />
			<Modal open={isLoading} aria-labelledby="loading-modal" aria-describedby="loading-modal-description">
				<Box display="flex" justifyContent="center" alignItems="center" height="100vh">
					<CircularProgress size={80} />
				</Box>
			</Modal>
			<div className={styles.content}>
				<Container maxWidth="md">
					<div>
						<img src={Logo} alt="Vortex Media Logo" />
					</div>
					<Typography variant="h4" className={styles.title}>
						Reset Your Password
					</Typography>

					<TextInput
						label="New Password"
						password
						width="100%"
						onChange={handleChange}
						marginTop={2}
						marginBottom={2}
						passwordError={formErrors.new_password}
						value={formData.new_password}
						name="new_password"
						onFocus={handlePasswordFocus}
						onBlur={handlePasswordBlur}
						className={styles.input}
					/>
					<PasswordStrength
						password={formData.new_password}
						showRequirements={showRequirements}
						setShowRequirements={setShowRequirements}
					/>

					<TextInput
						label="Confirm New Password"
						password
						width="100%"
						marginTop={2}
						marginBottom={2}
						passwordError={formErrors.re_new_password}
						PassNotMatch={formErrors.re_new_password}
						value={formData.re_new_password}
						onChange={handleChange}
						name="re_new_password"
						className={styles.input}
					/>

					<Button label="Reset Password" onClick={handleSubmit} className={styles.button} />
				</Container>
			</div>
			<Footer />
		</div>
	);
};

export default Resetpasswordchange;
