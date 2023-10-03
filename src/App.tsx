import { useState } from 'react';
import classNames from 'classnames';
import { ReactComponent as ReactLogo } from './assets/react.svg';
import { ReactComponent as ViteLogo } from './assets/vite.svg';
import { ReactComponent as TypescriptLogo } from './assets/typescript.svg';
import { ReactComponent as ScssLogo } from './assets/scss.svg';
import styles from './App.module.scss';

function show_coffee() {
    alert("hello");
}


function App() {
    const [count, setCount] = useState(0);

    return (
        <div className={styles.App}>
            <div className={styles.home}>
                <strong>THIS WEBSITE IS IN EARLY BETA, WHICH MEANS THERE WILL BE ISSUES. So if you have any suggestions/bug reports etc, contact me(shawn).</strong>
                <a href="../login.html"><button className={styles.button_login} name="login" type="button">login</button></a>
                <h1 className={styles.title}>My Cafe
                </h1>
                <div className={styles.buttons}>
                    <button className={styles.button_disabled}><span>Coffee</span></button>
                    <button className={styles.button} onClick={show_coffee}><span>Caffeine free</span></button>
                    <button className={styles.button}>
                        <span>Breakfast</span></button>
                    <br></br>
                    <button className={styles.button}><span>Order</span></button></div>
            </div></div>
    );
}

export default App;
