import React from 'react'
import GoogleLogin from 'react-google-login';
import Cookies from 'universal-cookie';
import axios from 'axios'
const LoginGoogle = () => {
    const cookie = new Cookies();

    const respuestaGoogle = async (respuesta) => {
        console.log("ejecutan");
    
            console.log(respuesta);
            cookie.set('id', respuesta.id);
            cookie.set('tgoogle', respuesta.accessToken);
            const endpoint = 'http://127.0.0.1:8000/oauth/token';
            const response = await axios.post(endpoint, {
                grant_type: 'social',
                client_id: '2',
                provider: 'google',
                access_token : respuesta.accessToken,
                client_secret:'RZdqqFg4OwVqb2kyqUipc2NdCvoP9ZJctZwqYZiI'
                }
            );
            console.log(response.data);
            cookie.set('at', response.data.access_token);
            console.log(cookie.get("at"));
            window.location.href = "/show";
    }
    
  return (
    <div>
        <h1>LoginGoogle</h1>
        <GoogleLogin
            clientId="67302136955-m3h4e019q4n0c6imh80kqaa1eunovu29.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={respuestaGoogle}
            onFailure={respuestaGoogle}
            cookiePolicy={'single_host_origin'}
        />
  </div>
  )
}

export default LoginGoogle