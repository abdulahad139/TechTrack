import styles from "./signupstyles.module.css";
import image from "../Assets/tech-track.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "../../api/axios";
import "./global-auth.css"


const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;  
const NAME_REGEX = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/signup'

const Signup = () => {

    const navigate = useNavigate();

    // For setting focus
    const userRef = useRef();
    const errRef = useRef();

    // For name  
    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    // For email 
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    // For password
    const [password, setPassword] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState('')


    // For confirming passwords
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    // In case of error
    const [errMsg, setErrMsg] = useState('');

    // For setting focus to the user input of name
    useEffect(() => {
        userRef.current.focus();
    }, []);

    // For checking name input
    useEffect(() => {
        console.log(NAME_REGEX.test(name), "names")
        setValidName(NAME_REGEX.test(name));
    }, [name]);

    // For checking email input
    useEffect(()=> {
        console.log(EMAIL_REGEX.test(email), "emails")
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    // For checking password input
    useEffect(() => {
        console.log(PWD_REGEX.test(password), password === matchPwd, "passwords")
        setValidPwd(PWD_REGEX.test(password));
        setValidMatch(password === matchPwd);
    }, [password, matchPwd]);


    // For setting error message.
    useEffect(() => {
        setErrMsg(''); // We set it to null anytime the set of inputs changes. This means the user has read the message.
    }, [name, email, password, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // If button is enabled with JS hack
        const test1 = NAME_REGEX.test(name);
        const test2 = PWD_REGEX.test(password);
        const test3 = EMAIL_REGEX.test(email)
        if (!test1 || !test2 || !test3) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ email, name, password }),
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
            } else if (err.response?.status === 500) {
                setErrMsg('An account already exists with this account!');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        } 
    }
    

  return (
    <>
      <div className={styles["signup-page"]}>
        <div className={styles["main-heading"]}>
            <img className={styles.logo} src={image} alt="Tech Track" />
        </div>
        <main className={styles.main}>
            <form className={styles.form} onSubmit={handleSubmit} method="POST">
            <div className={styles["main_heading"]}>
                <h2>CREATE ACCOUNT</h2>
            </div>
            <fieldset>
                <label className={styles["name-label"]} id="name-label" htmlFor="name">
                Full Name
                <input
                    className={styles["name-input"]}
                    id="name"
                    type="text"
                    ref={userRef}
                    placeholder="Enter your full name"
                    autoComplete="off"
                    required
                    value = {name}
                    onChange={(e) => setName(e.target.value)}  /* e is the event argument available everywhere ig. target is your input */
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="useridnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />
                </label>
                <p 
                id="useridnote" 
                className={userFocus && name && !validName ? styles["instructions"] : styles["offscreen"]}>
                Invalid Name. Cannot include numbers or symbol. Length cannot exceed 50 or be less than 3 letters!
                </p>

            </fieldset>
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
                    value = {email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={validEmail ? "false" : "true"}
                    aria-describedby="emailnote"
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
            <fieldset>
                <label className={styles["password-label"]} id="password-label" htmlFor="password">
                Password
                <input
                    className={styles["password-input"]}
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                    value = {password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />
                </label>
                <p id="pwdnote" className={pwdFocus && !validPwd ? styles["instructions"] : styles["offscreen"]}>
                8 to 24 characters. Must include uppercase and lowercase letters, a number and a special character.<br />
                </p>
            </fieldset>
            <fieldset>
                <label className={styles["confirm-label"]}id="confirm-label" htmlFor="confirm-password">
                Confirm Password
                <input
                    className={styles["confirm-input"]}
                    id="confirm-password"
                    type="password"
                    placeholder="Re-enter your password"
                    required
                    value = {matchPwd}
                    onChange={(e) => setMatchPwd(e.target.value)}
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                />
                </label>
                <p id="confirmnote" className={matchFocus && !validMatch ? styles["instructions"] : styles["offscreen"]}>
                            Must match the first password input field.
                </p>
            </fieldset>
            <p ref={errRef} className={errMsg ? styles["errmsg"] : styles["offscreen"]} aria-live="assertive">{errMsg}</p>
        <button className={styles["register-btn"]} type="submit" disabled={!validName || !validPwd || !validEmail || !validMatch ? true : false}>
            Register
            </button>
            <p className={styles.account}>
                Already have an account? <Link to="/">Login</Link>
            </p>
            </form>
        </main>
      </div>
    </>
  );
};

export default Signup;
