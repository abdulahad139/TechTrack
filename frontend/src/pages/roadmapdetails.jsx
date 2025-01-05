import Footer from "../components/footer";
import Navbar from "../components/navbar";
import styles from "../styles/roadmapdetails.module.css"
import { Link, useParams } from "react-router-dom";
import { imageOpener } from "../utils/image-util"; 

const RoadmapDetails = () => {
    let { roadmap } = useParams();
    return ( 
        <>
        <div className={styles["roadmap-details-page"]}>
            <Navbar/>
            <h1 className={styles["roadmap-name"]}>{roadmap}</h1>
            <p className={styles["main-para"]}>Step by step guide to learn {roadmap}</p>
            <div className={styles["image-div"]}>
                <img className={styles.img} src={imageOpener(roadmap)} alt={`${roadmap} Picture`}></img>
            </div>
            <div className={styles.buttons}>
                <Link to="/roadmaps"><button className={styles["back-btn"]}>Go Back to Roadmaps...</button></Link>
                <Link to="/courses"><button className={styles["course-btn"]}>See Course Recommendations...</button></Link>
            </div>
            <Footer/>
        </div>
        </>
     );
}
 
export default RoadmapDetails;