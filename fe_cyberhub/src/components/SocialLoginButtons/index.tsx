import React, { useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import styles from './SocialLoginButtons.module.css';
import { FaFacebook } from 'react-icons/fa';

const SocialLoginButtons: React.FC = () => {
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: 'YOUR_FACEBOOK_APP_ID', // Thay bằng Facebook App ID thực tế của bạn
        cookie: true,
        xfbml: true,
        version: 'v10.0',
      });
    };

    // Load the SDK asynchronously
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }, []);

  const handleFacebookLogin = () => {
    window.FB.login(function (response) {
      if (response.authResponse) {
        console.log('Facebook login successful:', response);
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, { scope: 'public_profile,email' });
  };

  return (
    <div className={styles.socialLoginContainer}>
      <div className={styles.googleButtonContainer}>
        {/* <GoogleOAuthProvider clientId="1001024849363-h1hggnav2hn7oqm0plk8ib2bp7js448f.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={(response) => console.log('Google login successful:', response)}
            onError={(error) => console.log('Google login failed:', error)}
            uxMode="popup"
            theme="filled_blue"
            size="large" // Kích thước lớn để đồng nhất với Facebook
          />
        </GoogleOAuthProvider> */}
      </div>

      <div className={styles.facebookButtonContainer}>
      </div>
    </div>
  );
};

export default SocialLoginButtons;
