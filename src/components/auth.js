import React from 'react';
import { API } from '../api-service';
import { useCookies } from 'react-cookie';

function Auth(){

  const [ username, setUsername ] = React.useState('');
  const [ password, setPassword ] = React.useState('');
  const [ isLoginView, setIsLoginView ] = React.useState(true);

  const [token, setToken] = useCookies(['movie-token']);

  React.useEffect( () => {
    if(token['movie-token']) window.location.href = '/movies';
  }, [token])

  const loginClicked = () => {
    API.loginUser({username, password})
      .then( resp => setToken(['movie-token'], resp.token))
      .catch( error => console.log(error))
  }

  const registerClicked = () => {
    API.registerUser({username, password})
      .then(() => loginClicked())
      .catch( error => console.log(error))
  }
  
  return (
    <div className="App">
      <header className="App-header">
        {isLoginView ? <h1>Login</h1> : <h1>Register</h1>}
      </header>
      <div className="login-container">
        <label htmlFor="username">Username</label><br/>
        <input 
            id="username" 
            type="text" 
            placeholder="username" 
            value={username}
            onChange={ evt=> setUsername(evt.target.value)}

        /><br/>
        <label htmlFor="password">Password</label><br/>
        <input 
            id="password" 
            type="password" 
            placeholder="password" 
            value={password}
            onChange={ evt=> setPassword(evt.target.value)} 
        /><br/>
            { isLoginView ?
              <button onClick={loginClicked}  >Login</button> : 
              <button onClick={registerClicked} >Register</button>
            }
        
        { isLoginView ?
          <p onClick={()=> setIsLoginView(false)}>You don't have an account? Register here!</p> : 
          <p onClick={()=> setIsLoginView(true)}>You already have an account? Login here</p>
        }
      </div>
    </div>
  )
}

export default Auth;
