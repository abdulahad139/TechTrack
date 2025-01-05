import styles from "./navbarstyles.module.css";
import image from "../components/Assets/tech-track-white.png";
import { Link } from "react-router-dom";
import "../components/Auth/global-auth.css"
import AuthContext, { AuthProvider } from "../context/AuthProvider";
import { useContext } from "react";


const Navbar = () => {
    
    const { auth } = useContext(AuthContext);
    console.log(auth.name)

    return ( 
        <>
            <div className="nav">
                <div className={styles.ul}>
                    <img className={styles.logo} src={image} alt="Tech Track Logo" />
                    <div><Link className={styles.homepage} to="/homepage" >Home</Link></div>
                    <div><Link className={styles.roadmap} to="/roadmaps">Roadmaps</Link></div>
                    <div><Link className={styles.courses} to="/courses">Courses</Link></div>
                    <div className={styles.drop}>
                        <div className={styles.dropbtn}>
                            {auth.name}
                        </div>
                        <Link to="/">
                            <div className={styles["dropdown-content"]}>
                                    Logout
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
                
        </>
     );
}
 
export default Navbar;