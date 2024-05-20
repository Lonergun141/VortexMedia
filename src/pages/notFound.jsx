import whiteLogo from '../assets/images/blackLogo.png';

const NotFound = () => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
				fontSize: '4rem',
				color: '#1C1C1C',
				fontFamily: 'PoppinsMedium',
				flexDirection: 'column',
			}}>
			<img src={whiteLogo} alt="Vortex Media Logo" />
			404 Not Found
		</div>
	);
};

export default NotFound;
