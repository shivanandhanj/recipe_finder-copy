import React, { useState } from 'react';
import { signInWithEmailAndPassword, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth} from '../firebase/firebaseConfig';  // Import the auth instance
import '../styles/Login.css'
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isEmailLogin, setIsEmailLogin] = useState(true);
  const [verificationId, setVerificationId] = useState('');

  // Email Login
  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('User logged in successfully!');
    } catch (error) {
      console.error('Error during email login', error);
      alert('Error during login');
    }
  };

  // Phone Login
  const handlePhoneLogin = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then(confirmationResult => {
        setVerificationId(confirmationResult.verificationId);
        alert('OTP sent!');
      })
      .catch(error => {
        console.error('Error during phone login', error);
        alert('Error during login');
      });
  };

  const handleOtpVerification = () => {
    const credential = auth.PhoneAuthProvider.credential(verificationId, otp);
    auth.signInWithCredential(credential)
      .then(() => {
        alert('Phone number verified and user logged in!');
      })
      .catch(error => {
        console.error('Error verifying OTP', error);
        alert('Error verifying OTP');
      });
  };

  return (
    <div>
      <h1>Login</h1>

      <div>
        <label>
          <input
            type="radio"
            value="email"
            checked={isEmailLogin}
            onChange={() => setIsEmailLogin(true)}
          />
          Log in with Email
        </label>
        <label>
          <input
            type="radio"
            value="phone"
            checked={!isEmailLogin}
            onChange={() => setIsEmailLogin(false)}
          />
          Log in with Phone
        </label>
      </div>

      {isEmailLogin ? (
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button onClick={handleEmailLogin}>Log In with Email</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone Number"
          />
          <button onClick={handlePhoneLogin}>Send OTP</button>
          
          <div id="recaptcha-container"></div>

          {verificationId && (
            <div>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
              />
              <button onClick={handleOtpVerification}>Verify OTP</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Login;
