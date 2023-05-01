import React, { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import '../style/Login.css'
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    const navigate = useNavigate();
    const [invalidMail, setInvalidMail] = useState()
    const [invalidPass, setInvalidPass] = useState()
    const [user, setUser] = useState({
        email: "",
        pass: ""
    })
    const [submitBtnDisable, setSubmitBtnDisable] = useState(false);
    const [visible, setVisible] = useState(false);
    const signupClicked = () => {
        navigate('/signup');
    }
    const inputEvent = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log(name, value);
        setUser({ ...user, [name]: value });
    }
    const handleSubmission = () => {
        if (!user.email || !user.pass) {
            // alert("Please fill all fields!");
            toast.error("Please fill all details!", {
                position: "top-center",
                theme: "dark"
            });
            return;
        }
        console.log(user);
        setSubmitBtnDisable(true);
        signInWithEmailAndPassword(auth, user.email, user.pass).then(
            async (res) => {
                setSubmitBtnDisable(false);
                navigate('/');
            }).catch((err) => {
                setSubmitBtnDisable(false);
                console.log("error is", err)
                // alert(err.message);
                if (err.message === "Firebase: Error (auth/invalid-email).")
                    setInvalidMail("The email id is invalid!")
                if (err.message === "Firebase: Error (auth/user-not-found).")
                    setInvalidMail("User not found!")
                if (err.message === "Firebase: Error (auth/wrong-password).")
                    setInvalidPass("Password is incorrect!")
                setTimeout(() => {
                    setInvalidMail()
                    setInvalidPass()
                }, 2000)
            });
        // function removeVal() {
        //     document.querySelectorAll('input').forEach(element => {
        //         element.value = "";
        //     });
        // }
        // if (!setInvalidMail && !setInvalidPass)
        //     setTimeout(removeVal, 500);
    }
    const visibleClicked = () => {
        setVisible(true);
    }
    const notVisibleClicked = () => {
        setVisible(false);
    }
    return (
        <>
            <div className="loginSec">
                <div className='loginDiv'>
                    <div className="loginFormDiv">
                        <label>Email</label>
                        <input type="text" name="email" onChange={inputEvent} />
                        <span className="errorMsg">{invalidMail}</span>

                        <label>Password</label>
                        <input type={visible ? "text" : "password"} name="pass" className="password" onChange={inputEvent} />
                        {visible ?
                            <VisibilityOffIcon className="visibilityIcon" onClick={notVisibleClicked} />
                            :
                            <VisibilityIcon className="visibilityIcon" onClick={visibleClicked} />
                        }
                        <span className="errorMsg">{invalidPass}</span>

                        {/* <button className="btn btn-success w-100 loginPageBtn">Login</button> */}
                        <Button variant="contained" color="success" className="loginPageBtn" onClick={handleSubmission} disabled={submitBtnDisable}
                            sx={{
                                marginTop: '2rem',
                                maginBottom: '2rem'
                            }}
                            fullWidth >Login</Button>

                        <div className="not_has_account">
                            <span>Need an account? </span>
                            <Button variant="text" onClick={signupClicked}>Signup</Button>
                        </div>
                    </div>
                </div>
            </div >
            <ToastContainer />
        </>
    )
}
export default Login;