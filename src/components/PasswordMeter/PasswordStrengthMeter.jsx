import PropTypes from 'prop-types';
import styles from '../PasswordMeter/styles/password.module.css'

// eslint-disable-next-line no-unused-vars
const PasswordStrength = ({ password, showRequirements, setShowRequirements }) => {
	if (!password) return '';

	const calPassStrength = () => {
		let strength = 0;
		const hasNumber = /\d/.test(password);
		const hasUppercase = /[A-Z]/.test(password);
		const hasLowercase = /[a-z]/.test(password);
		const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

		if (password.length > 15) strength += 1;
		if (hasNumber) strength += 1;
		if (hasUppercase) strength += 1;
		if (hasLowercase) strength += 1;
		if (hasSpecialChar) strength += 1;

		return strength;
	};

	const getBarColor = (strength) => {
		switch (strength) {
			case 1:
				return 'red';
			case 2:
				return '#EE9626';
			case 3:
				return '#FEDD00';
			case 4:
				return '#63a7ff';
			case 5:
				return '#98FB98';
			default:
				return 'grey';
		}
	};

	const getStrengthText = (strength) => {
		if (strength === 0) return;
		if (strength <= 2) return 'Weak';
		if (strength <= 4) return 'Medium';
		return 'Strong';
	};

	const strengthValue = calPassStrength();
	const strengthBarColor = getBarColor(strengthValue);
	const strengthBarStyle = {
		width: `${(strengthValue / 5) * 100}%`,
		backgroundColor: strengthBarColor,
	};
	const strengthText = getStrengthText(strengthValue);

	return (
		<div className={styles.passwordStrengthMeter}>
			<div className={styles.container}>
				<div className={styles.bar} style={strengthBarStyle}></div>
			</div>
			<div className={styles.strengthText}>{strengthText}</div>
			{showRequirements && (
				<div className={styles.requirements}>
					<p className={password.length > 8 ? styles.fulfilled : styles.unfulfilled}>At least 15 characters</p>
					<p className={/\d/.test(password) ? styles.fulfilled : styles.unfulfilled}>Contains at least one number</p>
					<p className={/[A-Z]/.test(password) ? styles.fulfilled : styles.unfulfilled}>
						Contains at least one uppercase letter
					</p>
					<p className={/[a-z]/.test(password) ? styles.fulfilled : styles.unfulfilled}>
						Contains at least one lowercase letter
					</p>
					<p className={/[!@#$%^&*(),.?":{}|<>]/.test(password) ? styles.fulfilled : styles.unfulfilled}>
						Contains at least one special character
					</p>
				</div>
			)}
		</div>
	);
};

PasswordStrength.propTypes = {
	password: PropTypes.string.isRequired,
	showRequirements: PropTypes.bool.isRequired,
	setShowRequirements: PropTypes.func.isRequired,
};

export default PasswordStrength;
