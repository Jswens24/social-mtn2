import { useState, useContext } from 'react'
import axios from 'axios';
import AuthContext from '../store/authContext'

const Auth = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [register, setRegister] = useState(true)

    const authCtx = useContext(AuthContext);

    const submitHandler = e => {
        e.preventDefault();

        const body = {
            username,
            password
        };

        const url = 'https://socialmtn.devmountain.com';

        axios
            .post(register ? `${url}/register` : `${url}/login`, body)
            .then((res) => {
                console.log('AFTER AUTH', res.data);
                authCtx.login(res.data.token, res.data.exp, res.data.userId);
            })
            .catch(err => {
                setPassword('');
                setUsername('');
                console.log(err)
            })

        console.log('submitHandler called')
    }

    const usernameHandler = (e) => {
        setUsername(e.target.value);
    };

    const passwordHandler = (e) => {
        setPassword(e.target.value);
    };

    const registerHandler = () => {
        setRegister(!register);
    }

    return (
        <main>
            <h1>Welcome!</h1>
            <form className='form auth-form' onSubmit={submitHandler}>
                <input
                    onChange={usernameHandler}
                    type='text'
                    placeholder='Enter username'
                    value={username}
                    className='form-input' />
                <input
                    onChange={passwordHandler}
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    className='form-input' />
                <button className='form-btn'>
                    {register ? 'Sign Up' : 'Login'}
                </button>
            </form>
            <button onClick={registerHandler} className='form-btn'>Need to {register ? 'Login' : 'Sign Up'}?</button>
        </main>
    )
}

export default Auth