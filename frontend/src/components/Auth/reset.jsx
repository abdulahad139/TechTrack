import styles from "./resetstyles.module.css";
import "./global-auth.css"
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "../../api/axios";


const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;  
const RESET_URL = '/reset'


const Reset = () => {

    const navigate = useNavigate();

    // For setting focus
    const userRef = useRef();
    const errRef = useRef();

    // For email 
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    // In case of error
    const [errMsg, setErrMsg] = useState('');

    // For setting focus to the user input of name
    useEffect(() => {
        userRef.current.focus();
    }, []);
    
    // For checking email input
    useEffect(()=> {
        console.log(EMAIL_REGEX.test(email), "emails")
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    // For setting error message.
    useEffect(() => {
        setErrMsg(''); // We set it to null anytime the set of inputs changes. This means the user has read the message.
    }, [email]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const test1 = EMAIL_REGEX.test(email)
        if (!test1) {
            setErrMsg("Invalid Entry");
            console.log("Invalid Entry")
            return;
        }
        try {
            const response = await axios.post(RESET_URL,
                JSON.stringify({ email }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            navigate('/')
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
                console.log(err)
            } else if (err.response?.status === 500) {
                setErrMsg('Email Address Does Not Exist!');
            } else {
                setErrMsg('Password Reset Failed')
                console.log(err)
            }
            errRef.current.focus();
        } 
    }
    


    return(
      <>
      <div className={styles["reset-page"]}>
          <main className={styles.main}>
              <form className={styles.form} onSubmit={handleSubmit} method="POST">
              <h2>RESET PASSWORD</h2>
            <fieldset>
                <label className={styles["email-label"]}id="email-label" htmlFor="email">
                Email
                <input
                    className={styles["email-input"]}
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    autoComplete="off"
                    required
                    ref={userRef}
                    value = {email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                />
                </label>
                <p 
                id="emailnote" 
                className={emailFocus && email && !validEmail ? styles["instructions"] : styles["offscreen"]}>
                Invalid Email!
                </p>

            </fieldset>
        
            <p ref={errRef} className={errMsg ? styles["errmsg"] : styles["offscreen"]} aria-live="assertive">{errMsg}</p>
              <button className={styles["reset-btn"]} type="submit" disabled={!validEmail ? true : false}>
                Reset
                </button>
              <p className={styles["cancel"]}>
                  <Link to="/">Cancel?</Link>
              </p>
              </form>
          </main>
        </div>
      </>
      )
} 

export default Reset;