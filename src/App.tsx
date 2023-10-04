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
        main: true,
        return: false,
    });

    useEffect(() => {
        fetch('http://119.29.236.82/api/dataCoffee')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data. Status code: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                const formattedData = data.data.map((item: [string, string]) => ({
                    Name: item[0],
                    Price: Number(item[1])
                }));
                setCoffeeData(formattedData);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);


    useEffect(() => {
        fetch('http://119.29.236.82/api/dataCaffeineFree')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data. Status code: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                const formattedData = data.data.map((item: [string, string]) => ({
                    Name: item[0],
                    Price: Number(item[1])
                }));
                setCaffeineFreeData(formattedData);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    useEffect(() => {
        fetch('http://119.29.236.82/api/dataBreakfast')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data. Status code: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                const formattedData = data.data.map((item: [string, string]) => ({
                    Name: item[0],
                    Price: Number(item[1])
                }));
                setBreakfastData(formattedData);
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
            main: false,
            return: true,
        }));
    };

    const showCaffeineFree = () => {
        setShowStates((prevState) => ({
            ...prevState,
            coffee: false,
            caffeineFree: !prevState.caffeineFree,
            breakfast: false,
            main: false,
            return: true,
        }));
    };

    function showBreakfast() {
        setShowStates((prevState) => ({
            ...prevState,
            coffee: false,
            caffeineFree: false,
            breakfast: !prevState.breakfast,
            main: false,
            return: true,
        }));
    }

    const showMain = () => {
        setShowStates((prevState) => ({
            ...prevState,
            coffee: false,
            caffeineFree: false,
            breakfast: false,
            main: true,
            return: false,
        }));
    };

    return (
        <div className={styles.App}>
            {showStates.main && (
                <div className={styles.home}>
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
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showStates.coffee && (
                <div>
                    <div className={styles.return}>
                        <button className={styles.button} onClick={showMain}>
                            <span>Return</span>
                        </button>
                    </div>
                    <div className={styles.coffeeContainer}>
                        {coffeeData.map((coffee, index) => (
                            <Coffee key={index} Name={coffee.Name} Price={coffee.Price} />
                        ))}
                    </div>
                </div>
            )}
            {showStates.caffeineFree && (
                <div>
                    <div className={styles.return}>
                        <button className={styles.button} onClick={showMain}>
                            <span>Return</span>
                        </button>
                    </div>
                    <div className={styles.coffeeContainer}>
                        {caffeineFreeData.map((caffeineFree, index) => (
                            <CaffeineFree key={index} Name={caffeineFree.Name} Price={caffeineFree.Price} />
                        ))}
                    </div>
                </div>
            )}
            {showStates.breakfast && (
                <div>
                    <div className={styles.return}>
                        <button className={styles.button} onClick={showMain}>
                            <span>Return</span>
                        </button>
                    </div>
                    <div className={styles.coffeeContainer}>
                        {breakfastData.map((breakfast, index) => (
                            <Breakfast key={index} Name={breakfast.Name} Price={breakfast.Price} />
                        ))}
                    </div>
                </div>
            )}</div>
    );
}

export default App;
