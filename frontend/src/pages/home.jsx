import { Link } from "react-router-dom";
import styles from "../styles/homestyles.module.css"
import Navbar from "../components/navbar";
import Footer from "../components/footer";


const Home = () => {
    return ( 
        <>
        <div className={styles.homepage}>
            <Navbar/>
                <div className={styles["mid-section"]}>
                    <div className={styles.headings}>
                        <div className={styles["main-heading"]}>Looking to acquire a new skill?</div>
                        <div className={styles["main-heading2"]}>Explore complete roadmaps and courses!</div>
                        <div className={styles.paragraph}>
                            Welcome to Tech Track, your ultimate guide to navigating the ever-evolving world of technology. Our platform offers 
                            comprehensive insights into the latest tech trends, skills, and career paths to help you stay ahead in a competitive 
                            industry.
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <Link className={styles.roadmap} to="/roadmaps"><button className={styles["roadmap-btn"]}>Browse Roadmaps</button></Link>
                        <Link className={styles.courses} to="/courses"><button className={styles["courses-btn"]}>Browse Courses</button></Link> 
                    </div>
                </div>
            <Footer/>
        </div>
        </>
    );
}
 
export default Home;