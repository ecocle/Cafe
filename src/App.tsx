import { useState, useEffect, SetStateAction } from 'react';
import styles from './App.module.scss';
import { LoadingScreen } from './components/loading-screen/loading-screen';
import { Coffee, CoffeeProps } from './components/coffee/coffee';
import { CaffeineFree, CaffeineFreeProps } from './components/caffeine-free/caffeine-free';
import { Breakfast, BreakfastProps } from './components/breakfast/breakfast';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { AddMoneyToAcc } from './components/add-money-to-acc/add-money-to-acc';
import { LanguageSelection } from './components/language-selection/language-selection';
import { ViewOrders } from './components/view-orders/view-orders';
import { ViewOrdersNormal } from './components/view-orders-normal/view-orders-normal';
import { DEFAULT_LANGUAGE, LANGUAGES } from './constants/constants';


function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(DEFAULT_LANGUAGE);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoggingIn, setisLoggingIn] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [userData, setUserData] = useState<{ balance: number; username: string }>({ balance: 0, username: '' });
    const [coffeeData, setCoffeeData] = useState<CoffeeProps[]>([]);
    const [caffeineFreeData, setCaffeineFreeData] = useState<CaffeineFreeProps[]>([]);
    const [breakfastData, setBreakfastData] = useState<BreakfastProps[]>([]);
    const [showStates, setShowStates] = useState({
        coffee: false,
        caffeineFree: false,
        breakfast: false,
        main: true,
        return: false,
        admin: false,
        normal: false,
    });

    useEffect(() => {
        checkAdmin();
    }, [userData]);

    useEffect(() => {
        const token = getCookie('access_token');
        if (token) {
            fetch('/api/user_data', {
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.username && data.balance) {
                        setUserData(data);
                        setIsLoggedIn(true);
                    }
                })
                .catch(error => console.error('Error:', error));
        }
    }, []);

    useEffect(() => {
        fetch('/api/dataCoffee')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data. Status code: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                const formattedData = data.data.map((item: [string, string, string]) => ({
                    Name: selectedLanguage === 'chinese' ? item[2] : item[0],
                    Price: Number(item[1])
                }));
                setCoffeeData(formattedData);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [selectedLanguage]);


    useEffect(() => {
        fetch('/api/dataCaffeineFree')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data. Status code: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                const formattedData = data.data.map((item: [string, string, string]) => ({
                    Name: selectedLanguage === 'chinese' ? item[2] : item[0],
                    Price: Number(item[1])
                }));
                setCaffeineFreeData(formattedData);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [selectedLanguage]);

    useEffect(() => {
        setIsLoading(true);

        fetch('/api/dataBreakfast')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data. Status code: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                const formattedData = data.data.map((item: [string, string, string]) => ({
                    Name: selectedLanguage === 'chinese' ? item[2] : item[0],
                    Price: Number(item[1])
                }));
                setBreakfastData(formattedData);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setIsLoading(false);
            });
    }, [selectedLanguage]);


    const showCoffee = () => {
        setShowStates((prevState) => ({
            ...prevState,
            coffee: !prevState.coffee,
            caffeineFree: false,
            breakfast: false,
            main: false,
            return: true,
            admin: false,
            normal: false,
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
            admin: false,
            normal: false,
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
            admin: false,
            normal: false,
        }));
    }

    const showMain = () => {
        setTimeout(function() {
            setShowStates((prevState) => ({
                ...prevState,
                coffee: false,
                caffeineFree: false,
                breakfast: false,
                main: true,
                return: false,
                admin: false,
                normal: false,
            }));
        }, 300);
    };

    const showAdmin = () => {
        setTimeout(function() {
            setShowStates((prevState) => ({
                ...prevState,
                coffee: false,
                caffeineFree: false,
                breakfast: false,
                main: false,
                return: false,
                admin: true,
                normal: false,
            }));
        }, 300);
    };

    const showNormal = () => {
        setTimeout(function() {
            setShowStates((prevState) => ({
                ...prevState,
                coffee: false,
                caffeineFree: false,
                breakfast: false,
                main: false,
                return: false,
                admin: false,
                normal: true,
            }));
        }, 300);
    };

    const checkAdmin = () => {
        if (userData && userData.username === "Admin"){
            setIsAdmin(true);
        }
    }

    const handleLoginSuccess = (username: string, token: string) => {
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);

        fetch('/api/user_data', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                if (data.username) {
                    setUserData(data);
                    setIsLoggedIn(true);
                }
            })
            .catch(error => console.error('Error:', error));
    };

    const handleLanguageChange = (newLanguage: SetStateAction<LANGUAGES>) => {
        setSelectedLanguage(newLanguage);
    };

    const login = () => {
        setisLoggingIn(true);
    }

    const register = () => {
        setIsRegistering(true);
    }

    const add = () => {
        setIsAdding(true);
    }

    function logOut() {
        fetch('/api/logout', {
            method: 'POST'
        })
        .then(res => res.json())
        .then(data => {
            setIsLoggedIn(false);
            setUserData(data);
        })
        .catch(err => {
            console.error("Error during logout:", err);
        });
    }
    

    const closeLogin = async () => {
        setisLoggingIn(false)
    }
    
    const closeRegister = () => {
        setIsRegistering(false)
    }

    const closeAddMoneyToAcc = () => {
        setIsAdding(false)
    }

    const getCookie = (name: string): string | undefined => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
        return undefined;
    }

    return (
        <div className={styles.App}>
            {isLoading && <LoadingScreen />}
            {isLoggingIn && (
                <Login onLoginSuccess={handleLoginSuccess} onClose={closeLogin} selectedLanguage={selectedLanguage} />
            )}
            {isRegistering && (
                <Register onClose={closeRegister} selectedLanguage={selectedLanguage} />
            )}
            {isAdding && (
                <AddMoneyToAcc selectedLanguage={selectedLanguage} onClose={closeAddMoneyToAcc} />
            )}
            {showStates.admin && (
                <div>
                    <div className={styles.return}>
                        <button className={styles.button_return} onClick={showMain}>
                            <span>{selectedLanguage === 'chinese' ? '返回' : 'Return'}</span>
                        </button>
                    </div>
                    <div>
                        <ViewOrders selectedLanguage={selectedLanguage} />
                    </div>
                </div>
            )}
            {showStates.normal && (
                <div>
                    <div className={styles.return}>
                        <button className={styles.button_return} onClick={showMain}>
                            <span>{selectedLanguage === 'chinese' ? '返回' : 'Return'}</span>
                        </button>
                    </div>
                    <div>
                        <ViewOrdersNormal selectedLanguage={selectedLanguage} />
                    </div>
                </div>
            )}
            {isLoggedIn && showStates.main && (
                <div className={styles.welcome}>
                    <p className={styles.greeting}>
                        {selectedLanguage === 'chinese' ? '你好 ' : 'Hello '}{userData!.username}
                    </p>
                    <p className={styles.balance}>
                        {selectedLanguage === 'chinese' ? '你还剩 ¥' : 'You have ¥'}{userData!.balance}{selectedLanguage === 'chinese' ? ' 在你帐号里' : ' left in your account'}
                    </p>
                    <button className={styles.button_add} onClick={add}>
                        Add money to account
                    </button>
                    {isAdmin && (
                        <div>
                            <button className={styles.button_view} onClick={showAdmin}>
                                View Orders
                            </button>
                        </div>
                    )}
                    {!isAdmin && (
                        <div>
                            <button className={styles.button_view} onClick={showNormal}>
                                View Orders
                            </button>
                        </div>
                    )}
                    <button className={styles.button_out} onClick={logOut}>
                        Log out
                    </button>
                </div>
            )}
            {showStates.main && (
                <div className={styles.home}>
                    <div>
                        <div className={styles.top}>
                            {!isLoggedIn && (
                                <div>
                                    <button name="login" type="button" onClick={login} className={styles.button_login}>
                                        {selectedLanguage === 'chinese' ? '登陆' : 'Login'}
                                    </button>
                                    <button className={styles.button_register} name="create_acc" type="button" onClick={register}>
                                        {selectedLanguage === 'chinese' ? '注册' : 'Register'}
                                    </button>
                                </div>
                            )}
                            <strong className={styles.disclaimer}>
                                {selectedLanguage === 'chinese' ? '本网站在测试阶段，可能会有问题。如有任何建议，请联系我（Shawn)' : 'THIS WEBSITE IS IN BETA, WHICH MEANS THERE WILL BE ISSUES. So if you have any suggestions/bug reports etc, contact me(shawn).'}
                            </strong>
                            <LanguageSelection onLanguageChange={handleLanguageChange} selectedLanguage={selectedLanguage} />
                        </div>
                        <h1 className={styles.title}>
                            {selectedLanguage === 'chinese' ? '摸鱼咖啡厅' : 'MY Cafe'}
                        </h1>
                        <div className={styles.buttons}>
                            {isLoggedIn && (
                                <div>
                                    <button className={styles.button_disabled} onClick={showCoffee} disabled>
                                        <span>{selectedLanguage === 'chinese' ? '经典咖啡' : 'Coffee'}</span>
                                    </button>
                                </div>
                            )}
                            {!isLoggedIn && (
                                <div>
                                    <button className={styles.button_disabled} onClick={login} disabled>
                                        <span>{selectedLanguage === 'chinese' ? '经典咖啡' : 'Coffee'}</span>
                                    </button>
                                </div>
                            )}
                            {isLoggedIn && (
                                <div>
                                    <button className={styles.button} onClick={showCaffeineFree}>
                                        <span>{selectedLanguage === 'chinese' ? '无咖啡因饮品' : 'Caffeine free'}</span>
                                    </button>
                                </div>
                            )}
                            {!isLoggedIn && (
                                <div>
                                    <button className={styles.button} onClick={login}>
                                        <span>{selectedLanguage === 'chinese' ? '无咖啡因饮品' : 'Caffeine free'}</span>
                                    </button>
                              </div>
                            )}
                            {isLoggedIn && (
                                <div>
                                    <button className={styles.button} onClick={showBreakfast}>
                                        <span>{selectedLanguage === 'chinese' ? '早餐' : 'Breakfast'}</span>
                                    </button>
                                </div>
                            )}
                            {!isLoggedIn && (
                                <div>
                                    <button className={styles.button} onClick={login}>
                                        <span>{selectedLanguage === 'chinese' ? '早餐' : 'Breakfast'}</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {showStates.coffee && (
                <div>
                    <div className={styles.return}>
                        <button className={styles.button_return} onClick={showMain}>
                            <span>{selectedLanguage === 'chinese' ? '返回' : 'Return'}</span>
                        </button>
                    </div>
                    <div className={styles.coffeeContainer}>
                        {coffeeData.map((coffee, index) => (
                            <Coffee key={index} Name={coffee.Name} Price={coffee.Price} userData={userData} selectedLanguage={selectedLanguage} />
                        ))}
                    </div>
                </div>
            )}
            {showStates.caffeineFree && (
                <div>
                    <div className={styles.return}>
                        <button className={styles.button_return} onClick={showMain}>
                            <span>{selectedLanguage === 'chinese' ? '返回' : 'Return'}</span>
                        </button>
                    </div>
                    <div className={styles.coffeeContainer}>
                        {caffeineFreeData.map((caffeineFree, index) => (
                            <CaffeineFree key={index} Name={caffeineFree.Name} Price={caffeineFree.Price} userData={userData} selectedLanguage={selectedLanguage} />
                        ))}
                    </div>
                </div>
            )}
            {showStates.breakfast && (
                <div>
                    <div className={styles.return}>
                        <button className={styles.button_return} onClick={showMain}>
                            <span>{selectedLanguage === 'chinese' ? '返回' : 'Return'}</span>
                        </button>
                    </div>
                    <div className={styles.coffeeContainer}>
                        {breakfastData.map((breakfast, index) => (
                            <Breakfast key={index} Name={breakfast.Name} Price={breakfast.Price} userData={userData} selectedLanguage={selectedLanguage} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
