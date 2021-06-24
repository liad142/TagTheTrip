import React, {useRef, useState} from 'react';
import './register.css'
import {Cancel, Room} from "@material-ui/icons";
import axios from "axios";

const Register = ({setShowRegister}) => {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newUser = {
            username: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        try {
            await axios.post('/users/register', newUser);
            setError(false) //כדי להעלים את ההודעת שגיאה
            setSuccess(true)

        } catch (err) {
            setError(true)
            console.log(err, 'this error from registering new user')
        }
    }




    return (
        <div className={'registerContainer'}>
            <div className="logo">
                <Room/>
                Register To TagTheTrip
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder={'username'} ref={nameRef}/>
                <input type="text" placeholder={'email'} ref={emailRef}/>
                <input type="password" placeholder={'password'} ref={passwordRef}/>
                <button className={'registerButton'}>Register</button>

                {success && //if its true
                <span className={'success'}>Successful. You can go ahead and login :)</span>
                }

                {error && //if its true
                <span className={'error'}>Error. Something is wrong check again :(</span>
                }
            </form>
            <Cancel className={'registerCancel'} onClick={()=>setShowRegister(false)}/>

        </div>
    );
};

export default Register;
