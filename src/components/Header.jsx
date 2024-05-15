import styles from './Header.module.css'

function Header({ HandleQuery }) {
    return (
        <div className={styles.header}>
            <h1 className={styles.heading}>Image Search</h1>
            <input className={styles.search} type="search" name="" id="" onChange={HandleQuery} placeholder='type something'/>
        </div>
    );
}

export default Header;
