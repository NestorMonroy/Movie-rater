import React from 'react'
import {API} from '../api-service'
import { TokenContext } from '../index'

function Auth(){

    const [ username, setUsername] = React.useState('');
    const [ password, setPassword] = React.useState('');

    const {token, setToken } = React.useContext(TokenContext);

    React.useEffect( () => {
        console.log(token);
        if(token) window.location.href = './movies'
    }, [token])

    const loginClicked = () => {
        API.loginUser({username, password})
            .then(resp => setToken(resp.token))
            .catch(error => console.log())
    }
    
    return (
        <div>
            <label htmlFor="username">username</label><br/>
            <input 
                id="username" 
                type="text" 
                placeholder="username"
                value={username}
                onChange={ evt => setUsername(evt.target.value)}
            /><br/>
            <label htmlFor="password">Password </label><br/>
            <input 
                id="password" 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={evt => setPassword(evt.target.value)}
            ></input><br/>
                <button onClick={loginClicked} >login</button>  
          </div>

    )
}

export default Auth;