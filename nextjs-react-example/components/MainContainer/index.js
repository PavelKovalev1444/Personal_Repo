import CustomLink from "../CustomLink";
import Head from "next/head";
import styles from '../../styles/MainContainer.module.scss'

const MainContainer = ({children, keywords}) => {
    return (
        <>
            <Head>
                <title>Главная страница</title>
            </Head>
            <div className={styles.navbar}>
                <CustomLink href={'/'} text="Главная"/>
                <CustomLink href={'/users'} text="Пользователи"/>
            </div>
            <div>
                {children}
            </div>
        </>
    );
};

export default MainContainer;