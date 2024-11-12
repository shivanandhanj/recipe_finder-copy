import React, { useState } from 'react';
import { createUserWithEmailAndPassword, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
// Import the auth instance
import { auth} from '../firebase/firebaseConfig';   // Import the auth instance

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [isEmailSignup, setIsEmailSignup] = useState(true);
    const [verificationId, setVerificationId] = useState('');
  
    const handleEmailSignup = async () => {
      console.log('Email:', email);   // Log email to check if it's valid
      console.log('Password:', password);   // Log password to check if it's valid
    
      if (!email || !password) {
        alert('Email and Password are required');
        return;
      }
    
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('User registered successfully!');
      } catch (error) {
        console.error('Error during email signup', error);
        alert('Error during signup: ' + error.message);  // More detailed error message
      }
    };
  
    const handlePhoneSignup = () => {
        // Check if recaptchaVerifier is already defined
        if (window.recaptchaVerifier) {
          window.recaptchaVerifier.clear(); // Clear previous instances
        }
        
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          'recaptcha-container', // ID of the div where reCAPTCHA will be rendered
          { size: 'invisible' } // Use invisible reCAPTCHA if needed
          
        );
      
        const appVerifier = window.recaptchaVerifier;
      
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
          .then(confirmationResult => {
            setVerificationId(confirmationResult.verificationId);
            alert('OTP sent!');
          })
          .catch(error => {
            console.log(error);
            console.error('Error during phone signup', error);
            alert('Error during signup');
          });
      };
  
    const handleOtpVerification = () => {
      const credential = auth.PhoneAuthProvider.credential(verificationId, otp);
      auth.signInWithCredential(credential)
        .then(() => {
          alert('Phone number verified and user signed up!');
        })
        .catch(error => {
          console.error('Error verifying OTP', error);
          alert('Error verifying OTP');
        });
    };
  
    return (
      <div>
        <h1>Signup</h1>
        <div>
          <label>
            <input
              type="radio"
              value="email"
              checked={isEmailSignup}
              onChange={() => setIsEmailSignup(true)}
            />
            Sign up with Email
          </label>
          <label>
            <input
              type="radio"
              value="phone"
              checked={!isEmailSignup}
              onChange={() => setIsEmailSignup(false)}
            />
            Sign up with Phone
          </label>
        </div>
  
        {isEmailSignup ? (
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
            <button onClick={handleEmailSignup}>Sign Up with Email</button>
          </div>
        ) : (
          <div>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number"
            />
            <button onClick={handlePhoneSignup}>Send OTP</button>
            
            <div id="recaptcha-container"></div> {/* This is where reCAPTCHA will be rendered */}
  
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
  
  export default Signup;