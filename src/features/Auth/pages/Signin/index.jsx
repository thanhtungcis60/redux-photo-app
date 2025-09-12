import React from 'react';
import PropTypes from 'prop-types';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { StyledFirebaseAuth } from 'react-firebaseui';
import { useHistory } from 'react-router-dom';
SignIn.propTypes = {

};


function SignIn(props) {
    const history = useHistory();
    // Configure FirebaseUI.
    const uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
            GoogleAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccessWithAuthResult: () => {
                history.push('/photos')             // nếu là v5
                return false;                          // CHẶN redirect mặc định của FirebaseUI
            },
        },
    };

    return (
        <div className='text-center'>
            <h2>Login Form</h2>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={getAuth()} />
        </div>
    );
}

export default SignIn;