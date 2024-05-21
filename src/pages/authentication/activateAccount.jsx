import Button from '../../components/button/button';
import Activate from './styles/activate.module.css';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { activate, reset } from '../../features/authSlice';
import { toast } from 'react-toastify';
import { Modal, Box, CircularProgress } from '@mui/material';
import Logo from '../../assets/images/blackLogo.png';

const ActivateAccount = () => {
	const { uid, token } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { isError, isSuccess, message, isLoading } = useSelector((state) => state.auth);

	const handleSubmit = (e) => {
		e.preventDefault();

		const userData = {
			uid,
			token,
		};
		dispatch(activate(userData));
		toast.success('Your account has been activated! You can login now');
	};

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		if (isSuccess) {
			navigate('/VortexMedia/SignIn');
		}

		dispatch(reset());
	}, [isError, message, isSuccess, navigate, dispatch]);

	return (
		<div className={Activate.container}>
			<Modal open={isLoading} aria-labelledby="loading-modal" aria-describedby="loading-modal-description">
				<Box display="flex" justifyContent="center" alignItems="center" height="100vh">
					<CircularProgress size={80} />
				</Box>
			</Modal>
			<img src={Logo} alt="Vortex Media Logo" />
			<div className={Activate.rightText}>Vortex Media</div>
			<div className={Activate.rightTextOutline}>Vortex Media</div>

			<div className={Activate.content}>
				<h1>Activate Account</h1>
				<p>
					Activate and elevate your experience with our News world wide. A single click is all it takes to unlock a seamless
					learning experience
				</p>

				<Button label="Activate" onClick={handleSubmit} />
			</div>

			<div className={Activate.footerText}>Terms of use | Privacy policy</div>
		</div>
	);
};

export default ActivateAccount;
