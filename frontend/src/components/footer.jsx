import styles from "./footerstyles.module.css";
import image from "../components/Assets/tech-track.png";
import "../components/Auth/global-auth.css"

const Footer = () => {
    return (  
        <>
        <footer className={styles.footer}>
            <img className={styles.logo} src={image} alt="Tech Track Logo"/>
            <p className={styles.p}> Terms.Privacy.Advertise </p>
        </footer>            
        </>
    );
}
 
export default Footer;