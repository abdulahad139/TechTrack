import Footer from "../components/footer";
import Navbar from "../components/navbar";
import styles from "../styles/roadmap.module.css"
import { Link } from "react-router-dom";

import clogo from "../components/Assets/c-logo.png"
import pythonlogo from "../components/Assets/python-logo.png"
import javascriptlogo from "../components/Assets/javascriptlogo.png"
import sqllogo from "../components/Assets/sql-logo.png"
import webdevimage from "../components/Assets/webdev.png"
import datascienceimg from "../components/Assets/data-science.png"
import datanalyticsimg from "../components/Assets/data-analytics.png"
import machinelearningimg from "../components/Assets/ml.png"
import aiimg from "../components/Assets/artificial-intelligence-2.png"



const Roadmaps = () => {
    return ( 
        <>
        <div className={styles["roadmap-page"]}>
            <Navbar/>
            <div className={styles["mid-section"]}>
            <div className={styles["roadmap-heading"]}>All Roadmaps</div>
                <div className={styles["flex-container"]}>
                    <div className={styles.box}>
                        <img src={clogo} alt="C Programming Picture"></img>
                        <h3>C Programming</h3>
                        <p>Master the fundamentals of C, a powerful language for systems programming and high-performance applications.</p>
                        <Link to="/roadmaps/C"><button className={styles["roadmap-btn"]}>Go to Roadmap</button></Link>
                    </div>
                    <div className={styles.box}>
                        <img src={pythonlogo} alt="Python Picture"></img>
                        <h3>Python</h3>
                        <p>Learn Python, a versatile language for everything from data processing to web development and automation.</p>
                        <Link to="/roadmaps/Python"><button className={styles["roadmap-btn"]}>Go to Roadmap</button></Link>
                    </div>
                    <div className={styles.box}>
                        <img src={javascriptlogo} alt="JavaScript Picture"></img>
                        <h3>JavaScript</h3>
                        <p>Start coding with JavaScript to create interactive, responsive web applications.</p>
                        <br></br>
                        <Link to="/roadmaps/Javascript"><button className={styles["roadmap-btn"]}>Go to Roadmap</button></Link>
                    </div>
                    <div className={styles.box}>
                        <img src={webdevimage} alt="Web Development Picture"></img>
                        <h3>Web Development</h3>
                        <p>Build modern websites with HTML, CSS, JavaScript, and advanced frameworks to create dynamic user experiences.</p>
                        <Link to="/roadmaps/Web Development"><button className={styles["roadmap-btn"]}>Go to Roadmap</button></Link>
                    </div>
                    <div className={styles.box}>
                        <img src={sqllogo} alt="SQL Picture"></img>
                        <h3>Structured Query Language</h3>
                        <p>Learn SQL to manage, query, and manipulate data in relational databases effectively.</p>
                        <Link to="/roadmaps/SQL"><button className={styles["roadmap-btn"]}>Go to Roadmap</button></Link>
                    </div>
                    <div className={styles.box}>
                        <img src={datascienceimg} alt="Data Science Picture"></img>
                        <h3>Data Science</h3>
                        <p>Uncover insights from data with Python, data visualization, and statistical analysis.</p>
                        <Link to="/roadmaps/Data Science"><button className={styles["roadmap-btn"]}>Go to Roadmap</button></Link>
                    </div>
                    <div className={styles.box}>
                        <img src={datanalyticsimg} alt="Data Analytics Picture"></img>
                        <h3>Data Analytics</h3>
                        <p>Analyze and visualize data using tools like Excel, SQL, and Python for smarter decision-making.</p>
                        <Link to="/roadmaps/Data Analytics"><button className={styles["roadmap-btn"]}>Go to Roadmap</button></Link>
                    </div>
                    <div className={styles.box}>
                        <img src={machinelearningimg} alt="Machine Learning Picture"></img>
                        <h3>Machine Learning</h3>
                        <p>Explore data-driven solutions with machine learning, from foundational algorithms to advanced model building.</p>
                        <Link to="/roadmaps/Machine Learning"><button className={styles["roadmap-btn"]}>Go to Roadmap</button></Link>
                    </div>
                    <div className={styles.box}>
                        <img src={aiimg} alt="Generative AI Picture"></img>
                        <h3>Generative AI</h3>
                        <p>Dive into Generative AI to create innovative models for text, images, and more.</p>
                        <Link to="/roadmaps/Generative AI"><button className={styles["roadmap-btn"]}>Go to Roadmap</button></Link>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
        </>
     );
}
 
export default Roadmaps;


// styles={{ backgroundColor: "#17152F", display: flex, flexDirection: column, minHeight: "100vh"}}