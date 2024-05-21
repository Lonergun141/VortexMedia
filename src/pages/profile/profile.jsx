import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Box, CircularProgress, Typography, TextField } from '@mui/material';
import { getUserInfo, deleteUser, logout, reset } from '../../features/authSlice';
import Footer from '../../components/footer/footer';
import NavigationBar from '../../components/navBar/navBar';
import styles from './styles/profile.module.css';
import DeleteIcon from '@mui/icons-material/Delete';
import QR from '../../assets/qr/frame.jpg';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
	const { user, userInfo, isLoading, isError, message } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const [currentPassword, setCurrentPassword] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getUserInfo());
	}, [dispatch]);

	const handleDeleteAccount = async () => {
        if (!currentPassword) {
            return;
        }
    
        try {
            const { access: accessToken } = JSON.parse(localStorage.getItem('user')) || {};
            const resultAction = await dispatch(deleteUser({ accessToken, currentPassword }));
    
            if (deleteUser.fulfilled.match(resultAction)) {
                await dispatch(logout());
                dispatch(reset());
				navigate('/VortexMedia/');
            }
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    };
    
    
	if (isLoading && (!user || !userInfo)) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<NavigationBar />
			<div className={styles.content}>
				<div style={{ display: 'flex' }}>
					<div style={{ flexBasis: '80%' }}>
						<h3>
							Hi, {userInfo.firstname} {userInfo.lastname}
						</h3>
						<p className={styles.user}>{userInfo.email}</p>
					</div>
					<div
						style={{
							flexBasis: '20%',
							justifyContent: 'center',
							alignItems: 'center',
							display: 'flex',
							flexDirection: 'column',
						}}>
						<img src={QR} style={{ height: '15rem', width: '13rem' }} alt="QR Code" />
						<p style={{ color: '#1C1C1C', fontSize: '1rem', fontFamily: 'Inter' }}>Download our app now</p>
						<p style={{ color: '#1C1C1C', fontSize: '1rem', fontFamily: 'Inter' }}>Android 10+ Only</p>
					</div>
				</div>

				<div
					style={{
						display: 'flex',
						justifyContent: 'flex-start',
						alignItems: 'flex-start',
						paddingTop: '3%',
						flexDirection: 'row',
					}}>
					<div style={{ backgroundColor: '#63a7ff', height: '20px', width: '140px' }}></div>
					<div style={{ backgroundColor: '#000', height: '1px', width: '90%' }}></div>
				</div>
				<div>
					<h3>Account settings</h3>
					<div>
						<Typography variant="body1" color="textSecondary" gutterBottom>
							Deleting your account will permanently remove all your data from our servers. This action cannot be undone.
						</Typography>
						<Button
							variant="contained"
							sx={{
								backgroundColor: '#1C1C1C',
								color: 'white',
								'&:hover': {
									backgroundColor: '#D9D9D9',
								},
							}}
							onClick={() => setOpen(true)}
							disableElevation
							startIcon={<DeleteIcon />}>
							Delete Account
						</Button>
					</div>
				</div>
			</div>

			<Footer />

			<Modal open={open} onClose={() => setOpen(false)}>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: 400,
						bgcolor: '#fff',
						boxShadow: 24,
						p: 4,
						borderRadius: 2,
					}}>
					<h3>Confirm Delete</h3>
					<div>
						<p className={styles.modalP}>Are you sure you want to delete your account? This action cannot be undone.</p>
						<TextField
							fullWidth
							type="password"
							label="Current Password"
							variant="outlined"
							value={currentPassword}
							onChange={(e) => setCurrentPassword(e.target.value)}
							error={isError && message === 'Incorrect password'}
							helperText={isError && message === 'Incorrect password' ? 'Incorrect password' : ''}
							style={{ marginBottom: '20px' }}
						/>
					</div>

					<div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '50px' }}>
						<Button
							variant="contained"
							sx={{
								backgroundColor: '#1C1C1C',
								color: 'white',
								padding: '15px 50px',
								'&:hover': { backgroundColor: '#333333' },
							}}
							onClick={() => setOpen(false)}
							size="large">
							Cancel
						</Button>
						<Button
							variant="contained"
							sx={{
								backgroundColor: '#1C1C1C',
								color: 'white',
								padding: '15px 50px',
								'&:hover': { backgroundColor: '#333333' },
							}}
							onClick={handleDeleteAccount}
							size="large"
							disabled={isLoading}>
							{isLoading ? <CircularProgress size={24} /> : 'Delete'}
						</Button>
					</div>
				</Box>
			</Modal>
		</div>
	);
};

export default Profile;