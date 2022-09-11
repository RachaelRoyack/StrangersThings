import React from "react";
import { registerUser, getUserProfile } from "../api";
import { Snackbar } from "@mui/material";
import './Register.css'


const Register = ({ setToken, navigate, setUsername, username, setPassword, password, setUserProfile, setOpen, open, }) => {


    const handleSubmit = async () => {
        const passwordRequirements = new RegExp ("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$")

        if ((password.length >= 6) && (passwordRequirements.test(password))) {
            
            const results = await registerUser(username, password);
            
            if (results.success) {
                setToken(results.data.token)
                window.localStorage.setItem('token', results.data.token) 
                //cannot use token by itself bc it would have to be rendered again for the value to be set to it
                //here you can add in spot for option to be logged in and build that out and inside of that you call in ...setItem
                const profileResults = await getUserProfile(results.data.token)
                let myProfile = profileResults.data
                setUserProfile(myProfile)
                navigate('/profile') //this is providing a route to go/navigate to
            } else {
                console.log(results.error)
            }
        } else {
            let form = document.querySelector("form")
            setOpen(true)
            form.reset()
            setUsername('')
            setPassword('') 

        }
    }


    return (
        <form className='registerForm' onSubmit = {(event)=> {
            event.preventDefault()
                handleSubmit()
            }
            }>
            <Snackbar 
                open={open}
                anchorOrigin= {{vertical: "top", horizontal: "center"}}
                message='Password does not meet requirements, please try again' 
                autoHideDuration={2000} 
                onClose={() => setOpen(false)}
                >
            </Snackbar>
            <div className='enterInfoRegister'>
                <input className="setUsernameEntry"
                type='text'
                placeholder="Enter Username"
                onChange={(event) => setUsername(event.target.value)}>
                </input>
                <input className="setPasswordEntry"
                //make type password to use dots when entered
                type='password'
                placeholder="Enter Password"
                onChange={(event) => setPassword(event.target.value) }>
                </input>
                <h4>Password Requirements:</h4>
                <ul className="passwordRulesList">
                    <li className="passwordRule">Must be at least 6 characters in length</li>
                    <li className="passwordRule">Must contain a capitol letter</li>
                    <li className="passwordRule">Must contain a lowercase letter</li>
                    <li className="passwordRule">Must include a number</li>
                    <li className="passwordRule">Must include a special character</li>
                </ul>

                <button type='submit'>Submit</button>
            </div>
        </form>
    )
}

export default Register;