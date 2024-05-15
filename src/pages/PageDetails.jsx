import PageNav from "../components/PageNav"
import styles from './PageDetails.module.css'

function PageDetails() {
    return (
        
        <div>
            <PageNav />
            <img className={styles.box} src="https://mercatik.net/wp-content/uploads/2020/12/Maintenance-site-web.png" />
        </div>
    )
}

export default PageDetails
