import { useState } from 'react';
import classNames from 'classnames';
import styles from './App.module.scss';
import { Coffee, CoffeeProps } from './components/coffee/coffee';

function App() {
    const [coffeeData, setCoffeeData] = useState<CoffeeProps[]>([
        { name: "Coffee 1", price: 2.99 },
    ]);
    const [showCoffee, setShowCoffee] = useState(false);

    function show_coffee() {
        setShowCoffee((prevState) => !prevState);
    }

    return (
        <div className={styles.App}>
            <div className={styles.home}>
                {showCoffee ? (
                    <div className={styles.coffeeContainer}>
                        {coffeeData.map((coffee, index) => (
                            <Coffee key={index} name={coffee.name} price={coffee.price} />
                        ))}
                    </div>
                ) : (
                    <div>
                        <strong>THIS WEBSITE IS IN EARLY BETA, WHICH MEANS THERE WILL BE ISSUES. So if you have any suggestions/bug reports etc, contact me(shawn).</strong>
                        <a href="../login.html">
                            <button className={styles.button_login} name="login" type="button">
                                login
                            </button>
                        </a>
                        <h1 className={styles.title}>My Cafe</h1>
                        <div className={styles.buttons}>
                            <button className={styles.button_disabled}>
                                <span>Coffee</span>
                            </button>
                            <button className={styles.button} onClick={show_coffee}>
                                <span>Caffeine free</span>
                            </button>
                            <button className={styles.button}>
                                <span>Breakfast</span>
                            </button>
                            <br></br>
                            <button className={styles.button}>
                                <span>Order</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
