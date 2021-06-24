import React, {useRef, useState} from 'react';
import './login.css'
import {Cancel, Room} from "@material-ui/icons";
import axios from "axios";

const Login = (props) => {
    const {setShowLogin,myStorage,setCurrentUser} = props
    const [error, setError] = useState(false)
    const nameRef = useRef()
    const passwordRef = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = {
            username: nameRef.current.value,
            password: passwordRef.current.value,
        };
        try {
            const res =await axios.post('/users/login', user);
            myStorage.setItem("user",res.data.username)
            setCurrentUser(res.data.username)
            setShowLogin(false)
            setError(false) //כדי להעלים את ההודעת שגיאה

        } catch (err) {
            setError(true)
            console.log(err, 'this error from registering new user')
        }
    }


    return (
        <div className={'loginContainer'}>
            <div className="logo">
                <Room/>
                Login To TagTheTrip
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder={'username'} ref={nameRef}/>
                <input type="password" placeholder={'password'} ref={passwordRef}/>
                <button className={'loginButton'}>Login</button>

                {error && //if its true
                <span className={'error'}>Error. Something is wrong check again :(</span>
                }
            </form>
            <Cancel className={'loginCancel'} onClick={()=>setShowLogin(false)}/>

        </div>
    );
};

export default Login;
