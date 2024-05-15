import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";

function PageNav() {
    return (
        <nav className={styles.nav_list}>
            <ul>
                <li>
                    <NavLink to="/favorites">Favorites</NavLink>
                </li>
                <li>
                    <NavLink to="/details">Details</NavLink>
                </li>
                <li>
                    <NavLink to="/search">
                        Search
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default PageNav;
