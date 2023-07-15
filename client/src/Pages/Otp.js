import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import firebase from './firebase';

const Otp = () => {
    const navigate = useNavigate();
    const[number,setnumber] = useState("");
    const[OTP,setOTP] = useState("");

    const configureCaptcha=()=>{
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              onSignInSubmit();
              console.log("Recaptcha verified");
            },
            defaultCountry : "IN"
          });
    }
    
    function onSignInSubmit (e){
        e.preventDefault();
        configureCaptcha()
        const phoneNumber = "+91" + number;
        console.log(phoneNumber)
        
        const appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            console.log("OTP has been sent")
            // ...
            }).catch((error) => {
            // Error; SMS not sent
            // ...
            console.log("SMS not send")
            });

    }

    function onSubmitOTP (e){
        e.preventDefault();
        const code = OTP;
        console.log(OTP)
        
        window.confirmationResult.confirm(code).then((result) => {
            // User signed in successfully.
            // const user = result.user;
            alert("Your Login is Successfull");
            navigate('/Welcome');
            // ...
        }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
                alert("Invalid OTP , Login unsucessful ");
                navigate('/Login')
        });
    }

    return (
        <div>
            <form onSubmit={onSignInSubmit}>
                <div id='sign-in-button'></div>
                <h1>Verification</h1>
                <button onClick={()=>navigate("/register")}>&nbsp;Back&nbsp;</button>
                <input type="number" name="mobile" placeholder='Enter a mobile number to get OTP' className="form-control" required onChange={(e)=>{setnumber(e.target.value)}}/>
                <br></br>
                <button type='submit' className="btn btn-primary">Get OTP</button>
                <br></br>
                <br>
                </br>
            </form>
            <form onSubmit={onSubmitOTP}>
            <br></br>
                <h2>Enter OTP</h2>
                <input type="number" name="OTP" placeholder='Enter your OTP' className="form-control" required onChange={(e)=>{setOTP(e.target.value)}}/>
                <br></br>
                <button type='submit' className="btn btn-primary">Verify</button>
                <br></br>
            </form>              
            
        </div>
    );
}

export default Otp;