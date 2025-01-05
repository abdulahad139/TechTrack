import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import styles from "../styles/courses.module.css"
import searchIcon from "../components/Assets/search-symbol.png"
import axios from "../api/axios";

const COURSE_URL = '/recommend_courses'

const Courses = () => {

    // For setting focus
    const userRef=useRef();
    const errRef=useRef();

    // Set focus to the search bar
    const [userFocus, setUserFocus] = useState(false);

    // For user input
    const [userSearch, setUserSearch] = useState('');

    // For data retrieved
    const [apiData, setApiData] = useState([{}]);

    // For displaying courses 
    const [courseCards, setCourseCards] = useState(false);

    // For error
    const [errMsg, setErrMsg] = useState(false);


    useEffect(() => {
        userRef.current.focus()
    }, [])



    const handleSearch = async (e) => {
        try {
            const response = await axios.post(COURSE_URL, 
                JSON.stringify({keywords: userSearch}), 
                {
                    headers: { "Content-Type": "application/json"}, 
                    withCredentials: true
                }
            ) 
            setApiData(response?.data);
            console.log(apiData)
            setCourseCards(true);
            setErrMsg('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else {
                setErrMsg('ERROR: COURSES NOT FOUND')
            }
        }
    } 


    return (  
        <>
        <div className={styles["courses-page"]}>
            <Navbar/>
            <div className={styles["mid-section"]}>
                <h1>Search Courses...</h1>
                <div className={styles.search}>
                    <input
                        className={styles["courses-input"]}
                        id="courseinput"
                        type="text"
                        placeholder="Python, Javascript, Data Science etc..."
                        autoComplete="off"
                        required
                        ref = {userRef}
                        onChange={(e) => setUserSearch(e.target.value)}  /* e is the event argument available everywhere ig. target is your input */
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    />
                    <input className={styles["search-icon"]} type="image" src={searchIcon} alt="Search Icon" onClick={handleSearch} ></input>
                </div>
            </div>
            <div >
                {errMsg ? (
                    <p ref={errRef} className={styles["errmsg"]}>{errMsg}</p>
                ) : (
                        <div className={styles["courses"]}>
                            {apiData.map((course) => (
                                <div className={courseCards ? styles["card"] : styles["offscreen"]}>
                                        <Link to={course.url} target="_blank"><img className={styles["course-images"]} src={course.image}></img></Link>
                                        <h3>{course.title}</h3>
                                        <p><b>Rating:</b> {course.rating}</p>
                                </div>
                        ))}
                        </div>
                )}
            </div>
        </div>
        </>
)
}

export default Courses;