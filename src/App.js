import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";
import axios from "axios";
import { urlWeather } from "./endpoints";
import liff from '@line/liff';
import logo from './logo.svg'

function App() {
    const [pictureUrl, setPictureUrl] = useState(logo);
    const [idToken, setIdToken] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [statusMessage, setStatusMessage] = useState("");
    const [userId, setUserId] = useState("");

    // react normal client Id
    /*
    const clientId =
        "729249455465-ri8toar5movqsrs6018ta9si8t2lhna1.apps.googleusercontent.com";
    */
    // heroku clientId
    const clientId =
        "729249455465-uqopdcr9l1313s00i2g05u0dtce6ggvb.apps.googleusercontent.com";
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: "",
            });
        };
        gapi.load("client:auth2", initClient);
    }, []);

    // useEffect(() =>{
    //   axios.get(urlWeather)
    //   .then((response) => {
    //     console.log(response.data)
    //   })
    // })

    const onSuccess = (res) => {
        setProfile(res.profileObj);
        console.log("Login Success", res);
    };
    const onFailure = (res) => {
        console.log("Login Failed", res);
    };

    const logOut = () => {
        setProfile(null);
    };

    const initLine = () => {
      liff.init({ liffId: '1661467371-OzoMj5WM' }, () => {
        if (liff.isLoggedIn()) {
          runApp();
        } else {
          liff.login();
        }
      }, err => console.error(err));
    }
  
    const runApp = () => {
      const idToken = liff.getIDToken();
      setIdToken(idToken);
      liff.getProfile().then(profile => {
        console.log(profile);
        setDisplayName(profile.displayName);
        setPictureUrl(profile.pictureUrl);
        setStatusMessage(profile.statusMessage);
        setUserId(profile.userId);
      }).catch(err => console.error(err));
    }
  
    const logoutLine = () => {
      liff.logout();
      window.location.reload();
    }

    useEffect(()=>{
      initLine()
    },[])
  

    return (
        <div className="App">
            <h1>Test Login App</h1>
            {/* {profile ? (
                <div>
                    <img src={profile.imageUrl} alt="profilePic" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email: {profile.email}</p>
                    <br />
                    <br />
                    <GoogleLogout
                        clientId={clientId}
                        buttonText="Log out"
                        onLogoutSuccess={logOut}
                    />
                </div>
            ) : (
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign In with google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={"single_host_origin"}
                    isSignedIn={true}
                />
            )} */}
            <hr/>
            <div style={{textAlign: "center"}}>
              <h1>LINE Login</h1>
              <img src={pictureUrl} width="150px" height="150px" alt="profilePic"/>
              <p style={{textAlign: "left", marginLeft: "30%",marginRight:"30%", wordBreak: "break-all"}}><b>id token: </b> { idToken }</p>
              <p style={{textAlign: "left", marginLeft: "30%",marginRight:"30%", wordBreak: "break-all"}}><b>display name: </b> {displayName}</p>
              <p style={{textAlign: "left", marginLeft: "30%",marginRight:"30%", wordBreak: "break-all"}}><b>status message: </b> { statusMessage }</p>
              <p style={{textAlign: "left", marginLeft: "30%",marginRight:"30%", wordBreak: "break-all"}}><b>user id: </b> { userId }</p>

              <button onClick={() => logoutLine()} style={{width: 200, height: 30}}>Logout</button>
            </div>
        </div>
    );
}

export default App;
