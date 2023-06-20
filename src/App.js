import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";
import axios from "axios";
import { urlWeather } from "./endpoints";

function App() {
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

    return (
        <div className="App">
            <h1>Test Login App</h1>
            {profile ? (
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
            )}
        </div>
    );
}

export default App;
