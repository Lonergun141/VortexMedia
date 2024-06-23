import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const TextInput = ({
    label,
    multiline,
    password,
    emailError,
    passwordError,
    error,
    marginLeft,
    marginBottom,
    marginTop,
    nameError,
    PassNotMatch,
    width,
    ...props
}) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Box
            sx={{
                marginBottom: marginBottom,
                marginLeft: marginLeft,
                marginTop: marginTop,
                textAlign: 'center',
                width: isSmallScreen ? '100%' : width,
                padding: isSmallScreen ? '0 0' : '0',
            }}>
            <TextField
                fullWidth
                label={label || 'Label'}
                id="standard-basic"
                multiline={multiline || false}
                type={password && !showPassword ? 'password' : 'text'}
                error={emailError || passwordError || error || nameError || PassNotMatch}
                helperText={
                    emailError && passwordError && error && nameError
                        ? 'Please enter a username, password, and valid email'
                        : emailError && passwordError
                        ? 'Please enter a username and password'
                        : emailError && error
                        ? 'Please enter a valid email'
                        : passwordError && error
                        ? 'Please enter a password and valid email'
                        : emailError
                        ? 'Please enter a valid email'
                        : passwordError
                        ? 'Please enter a valid password'
                        : nameError
                        ? 'Please enter a valid name'
                        : PassNotMatch
                        ? 'Password Does Not Match'
                        :''
                }
                InputProps={
                    password
                        ? {
                              endAdornment: (
                                  <InputAdornment position="end">
                                      <IconButton
                                          aria-label="toggle password visibility"
                                          onClick={handleClickShowPassword}
                                          onMouseDown={handleMouseDownPassword}
                                      >
                                          {showPassword ? <Visibility /> : <VisibilityOff />}
                                      </IconButton>
                                  </InputAdornment>
                              ),
                          }
                        : undefined
                }
                {...props}
            />
        </Box>
    );
};

TextInput.propTypes = {
    label: PropTypes.string,
    multiline: PropTypes.bool,
    password: PropTypes.bool,
    emailError: PropTypes.bool,
    passwordError: PropTypes.bool,
    error: PropTypes.bool,
    marginLeft: PropTypes.number,
    marginBottom: PropTypes.number,
    marginTop: PropTypes.number,
    nameError: PropTypes.bool,
    PassNotMatch: PropTypes.bool,
    width: PropTypes.number,
};

export default TextInput;
