import PropTypes from 'prop-types';
import ButtonStyles from './button.module.css';

const Button = ({ onClick, label }) => {
	return (
		<button className={ButtonStyles.customButton} onClick={onClick}>
			{label}
		</button>
	);
};

Button.propTypes = {
	onClick: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired,
};

export default Button;
