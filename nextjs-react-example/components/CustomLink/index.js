import Link from "next/link";
import styles from '../../styles/CustomLink.module.css'

const CustomLink = ({text, href}) => {
    return (
        <Link href={href}>
            <span className={styles.link}>{text}</span>
        </Link>
    )
}

export default CustomLink