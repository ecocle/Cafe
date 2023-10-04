import { useState, useEffect } from 'react';
import styles from './App.module.scss';
import { Coffee, CoffeeProps } from './components/coffee/coffee';
import { CaffeineFree, CaffeineFreeProps } from './components/caffeine-free/caffeine-free';
import { Breakfast, BreakfastProps } from './components/breakfast/breakfast';

function App() {
    const [coffeeData, setCoffeeData] = useState<CoffeeProps[]>([]);
    const [caffeineFreeData, setCaffeineFreeData] = useState<CaffeineFreeProps[]>([]);
    const [breakfastData, setBreakfastData] = useState<BreakfastProps[]>([]);
    const [showStates, setShowStates] = useState({
        coffee: false,
        caffeineFree: false,
        breakfast: false,
    });

    useEffect(() => {
        fetch('http://192.168.3.8:8080/api/dataCoffee')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data. Status code: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                console.log(data.data);
                setCoffeeData(data.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    useEffect(() => {
        fetch('http://192.168.3.8:8080/api/dataCaffeineFree')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data. Status code: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                console.log(data.data);
                setCaffeineFreeData(data.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    useEffect(() => {
        fetch('http://192.168.3.8:8080/api/dataBreakfast')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data. Status code: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                console.log(data.data);
                setBreakfastData(data.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    const showCoffee = () => {
        setShowStates((prevState) => ({
            ...prevState,
            coffee: !prevState.coffee,
            caffeineFree: false,
            breakfast: false,
        }));
    };

    const showCaffeineFree = () => {
        setShowStates((prevState) => ({
            ...prevState,
            coffee: false,
            caffeineFree: !prevState.caffeineFree,
            breakfast: false,
        }));
    };

    const showBreakfast = () => {
        setShowStates((prevState) => ({
            ...prevState,
            coffee: false,
            caffeineFree: false,
            breakfast: !prevState.breakfast,
        }));
    };

    return (
        <div className={styles.App}>
            <div className={styles.home}>
                {showStates.coffee && (
                    <div className={styles.coffeeContainer}>
                        {coffeeData.map((coffee, index) => (
                            <Coffee key={index} Name={coffee.Name} Price={coffee.Price} />
                        ))}
                    </div>
                )}
                {showStates.caffeineFree && (
                    <div>
                        {caffeineFreeData.map((CaffeineFree, index) => (
                            <Coffee key={index} Name={CaffeineFree.Name} Price={CaffeineFree.Price} />
                        ))}
                    </div>
                )}
                {showStates.breakfast && (
                    <div>
                        {breakfastData.map((Breakfast, index) => (
                            <Coffee key={index} Name={Breakfast.Name} Price={Breakfast.Price} />
                        ))}
                    </div>
                )}
                <div>
                    <div className={styles.top}>
                        <button className={styles.button_login} name="login" type="button">
                            login
                        </button>
                        <strong className={styles.disclaimer}>
                            THIS WEBSITE IS IN EARLY BETA, WHICH MEANS THERE WILL BE ISSUES. So if you have any suggestions/bug reports etc, contact me(shawn).
                        </strong>
                    </div>
                    <h1 className={styles.title}>My Cafe</h1>
                    <div className={styles.buttons}>
                        <button className={styles.button} onClick={showCoffee}>
                            <span>Coffee</span>
                        </button>
                        <button className={styles.button} onClick={showCaffeineFree}>
                            <span>Caffeine free</span>
                        </button>
                        <button className={styles.button} onClick={showBreakfast}>
                            <span>Breakfast</span>
                        </button></div>
                </div>
            </div>
        </div>
    );
}

export default App;
