import { lazy, useState, useEffect, SetStateAction, Suspense } from 'react';
import styles from './App.module.scss';
import { LoadingScreen } from './components/loading-screen/loading-screen';

const Coffee = lazy(() => import('./components/coffee/coffee').then(module => ({ default: module.Coffee })));
const CaffeineFree = lazy(() => import('./components/caffeine-free/caffeine-free').then(module => ({ default: module.CaffeineFree })));
const Breakfast = lazy(() => import('./components/breakfast/breakfast').then(module => ({ default: module.Breakfast })));
const Login = lazy(() => import('./components/login/login').then(module => ({ default: module.Login })));
const Register = lazy(() => import('./components/register/register').then(module => ({ default: module.Register })));
const AddMoneyToAcc = lazy(() => import('./components/add-money-to-acc/add-money-to-acc').then(module => ({ default: module.AddMoneyToAcc })));
import { LanguageSelection } from './components/language-selection/language-selection';

const ViewOrders = lazy(() => import('./components/view-orders/view-orders').then(module => ({ default: module.ViewOrders })));
const ViewOrdersNormal = lazy(() => import('./components/view-orders-normal/view-orders-normal').then(module => ({ default: module.ViewOrdersNormal })));
import { DEFAULT_LANGUAGE, LANGUAGES } from './constants/constants';
import { CoffeeProps } from './components/coffee/coffee';
import { CaffeineFreeProps } from './components/caffeine-free/caffeine-free';
import { BreakfastProps } from './components/breakfast/breakfast';


function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(DEFAULT_LANGUAGE);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
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
        normal: false
    });

    interface DataItem {
        Name: string;
        Price: string;
        'Name(ch)': string;
    }

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
                    if (data.username && typeof data.balance !== 'undefined') {
                        setUserData(data);
                        setIsLoggedIn(true);
                    }
                })
                .catch(error => console.error('Error:', error));
        }
    }, []);

    function showCoffee() {
        setIsLoading(true);
        fetch('/api/dataCoffee')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data. Status code: ' + response.status);
                }
                return response.json();
            })
            .then((data: DataItem[]) => {
                const formattedData = data.map(item => ({
                    Name: selectedLanguage === 'chinese' ? item['Name(ch)'] : item.Name,
                    Price: Number(item.Price),
                    userData: userData,
                    selectedLanguage: selectedLanguage
                }));
                setCoffeeData(formattedData);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setIsLoading(false);
            });

        setShowStates((prevState) => ({
            ...prevState,
            coffee: !prevState.coffee,
            caffeineFree: false,
            breakfast: false,
            main: false,
            return: true,
            admin: false,
            normal: false
        }));
    }

    function showCaffeineFree() {
        setIsLoading(true);
        fetch('/api/dataCaffeineFree')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data. Status code: ' + response.status);
                }
                return response.json();
            })
            .then((data: DataItem[]) => {
                const formattedData = data.map(item => ({
                    Name: selectedLanguage === 'chinese' ? item['Name(ch)'] : item.Name,
                    Price: Number(item.Price),
                    userData: userData,
                    selectedLanguage: selectedLanguage
                }));
                setCaffeineFreeData(formattedData);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setIsLoading(false);
            });

        setShowStates((prevState) => ({
            ...prevState,
            coffee: false,
            caffeineFree: !prevState.caffeineFree,
            breakfast: false,
            main: false,
            return: true,
            admin: false,
            normal: false
        }));
    }

    function showBreakfast() {
        setIsLoading(true);
        fetch('/api/dataBreakfast')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data. Status code: ' + response.status);
                }
                return response.json();
            })
            .then((data: DataItem[]) => {
                const formattedData = data.map(item => ({
                    Name: selectedLanguage === 'chinese' ? item['Name(ch)'] : item.Name,
                    Price: Number(item.Price),
                    userData: userData,
                    selectedLanguage: selectedLanguage
                }));
                setBreakfastData(formattedData);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setIsLoading(false);
            });

        setShowStates((prevState) => ({
            ...prevState,
            coffee: false,
            caffeineFree: false,
            breakfast: !prevState.breakfast,
            main: false,
            return: true,
            admin: false,
            normal: false
        }));
    }

    function showMain() {
        setTimeout(function() {
            setShowStates((prevState) => ({
                ...prevState,
                coffee: false,
                caffeineFree: false,
                breakfast: false,
                main: true,
                return: false,
                admin: false,
                normal: false
            }));
        }, 300);
    }

    function showAdmin() {
        setTimeout(function() {
            setShowStates((prevState) => ({
                ...prevState,
                coffee: false,
                caffeineFree: false,
                breakfast: false,
                main: false,
                return: false,
                admin: true,
                normal: false
            }));
        }, 300);
    }

    function showNormal() {
        setTimeout(function() {
            setShowStates((prevState) => ({
                ...prevState,
                coffee: false,
                caffeineFree: false,
                breakfast: false,
                main: false,
                return: false,
                admin: false,
                normal: true
            }));
        }, 300);
    }

    const checkAdmin = () => {
        if (userData && userData.username === 'Admin') {
            setIsAdmin(true);
        }
    };

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
        setIsLoggingIn(true);
    };

    const register = () => {
        setIsRegistering(true);
    };

    const add = () => {
        setIsAdding(true);
    };

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
                console.error('Error during logout:', err);
            });
    }

    const closeLogin = async () => {
        setIsLoggingIn(false);
    };

    const closeRegister = () => {
        setIsRegistering(false);
    };

    const closeAddMoneyToAcc = () => {
        setIsAdding(false);
    };
    const getCookie = (name: string): string | undefined => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
        return undefined;
    };

    return (
        <div className={styles.App}>
            <div>
                {isLoading && <LoadingScreen />}
                {isLoggingIn && (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Login onLoginSuccess={handleLoginSuccess} onClose={closeLogin}
                               selectedLanguage={selectedLanguage} />
                    </Suspense>
                )}
                {isRegistering && (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Register onClose={closeRegister} selectedLanguage={selectedLanguage} />
                    </Suspense>
                )}
                {isAdding && (
                    <Suspense fallback={<div>Loading...</div>}>
                        <AddMoneyToAcc selectedLanguage={selectedLanguage} onClose={closeAddMoneyToAcc} />
                    </Suspense>
                )}
                {showStates.admin && (
                    <div>
                        <div className={styles.return}>
                            <button className={styles.button_return} onClick={showMain}>
                                <span>{selectedLanguage === 'chinese' ? '返回' : 'Return'}</span>
                            </button>
                        </div>
                        <div>
                            <Suspense fallback={<div>Loading...</div>}>
                                <ViewOrders selectedLanguage={selectedLanguage} />
                            </Suspense>
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
                            <Suspense fallback={<div>Loading...</div>}>
                                <ViewOrdersNormal selectedLanguage={selectedLanguage} />
                            </Suspense>
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
                                <Suspense fallback={<div>Loading...</div>}>
                                    <Coffee key={index} Name={coffee.Name} Price={coffee.Price} userData={userData}
                                            selectedLanguage={selectedLanguage} />
                                </Suspense>
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
                                <Suspense fallback={<div>Loading...</div>}>
                                    <CaffeineFree key={index} Name={caffeineFree.Name} Price={caffeineFree.Price}
                                                  userData={userData} selectedLanguage={selectedLanguage} />
                                </Suspense>
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
                                <Suspense fallback={<div>Loading...</div>}>
                                    <Breakfast key={index} Name={breakfast.Name} Price={breakfast.Price}
                                               userData={userData}
                                               selectedLanguage={selectedLanguage} />
                                </Suspense>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            {showStates.main && (
                <div>
                    <div className={styles.header}>
                        {isLoggedIn && showStates.main && (
                            <div className={styles.welcome}>
                                <p>
                                    {selectedLanguage === 'chinese' ? '你好 ' : 'Hello '}{userData!.username}
                                </p>
                                <p>
                                    {selectedLanguage === 'chinese' ? '你还剩 ¥' : 'You have ¥'}{userData!.balance}{selectedLanguage === 'chinese' ? ' 在你帐号里' : ' left in your account'}
                                </p>
                                <div className={styles.settings}>
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
                            </div>
                        )}

                        {!isLoggedIn && (
                            <div className={styles.options}>
                                <button name='login' type='button' onClick={login} className={styles.button_login}>
                                    {selectedLanguage === 'chinese' ? '登陆' : 'Login'}
                                </button>
                                <button className={styles.button_register} name='create_acc' type='button'
                                        onClick={register}>
                                    {selectedLanguage === 'chinese' ? '注册' : 'Register'}
                                </button>
                            </div>
                        )}
                        <LanguageSelection onLanguageChange={handleLanguageChange}
                                           selectedLanguage={selectedLanguage} />
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
            )}
            <div className={styles.footer}>
                <p>{selectedLanguage === 'chinese' ? '由Shawn提供支持' : 'Powered By Shawn'}</p>
            </div>
        </div>
    );
}

export default App;
