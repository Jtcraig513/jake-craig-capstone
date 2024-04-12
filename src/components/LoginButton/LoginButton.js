import './LoginButton.scss';
import google from '../../assets/logos/google.png';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const LoginButton = () => {
  return (
    // The link will take user to `http://localhost:8080/auth/google` which starts the authentication process with Google, just like we were testing on the server side
    // After successful authentication user will be redirected back to client-side app with the cookie set
    <a className="login-button" href={`${SERVER_URL}/auth/google`}>
      <img className='login-button-logo' height='32' width='32' src={google} alt='google' />
      <span className="login-button__text">Login with Google</span>
    </a>
  );
};

export default LoginButton;