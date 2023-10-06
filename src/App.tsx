import { useState, useEffect, SetStateAction } from 'react';
import styles from './App.module.scss';
import { Coffee, CoffeeProps } from './components/coffee/coffee';
import { CaffeineFree, CaffeineFreeProps } from './components/caffeine-free/caffeine-free';
import { Breakfast, BreakfastProps } from './components/breakfast/breakfast';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { LanguageSelection } from './components/language-selection/language-selection';
import { DEFAULT_LANGUAGE, LANGUAGES } from './constants/constants';


function App() {
    const [selectedLanguage, setSelectedLanguage] = useState(DEFAULT_LANGUAGE);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLogingIn, setIsLogingIn] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [userData, setUserData] = useState<{ balance: number; username: string }>({ balance: 0, username: '' });
    const [coffeeData, setCoffeeData] = useState<CoffeeProps[]>([]);
    const [caffeineFreeData, setCaffeineFreeData] = useState<CaffeineFreeProps[]>([]);
    const [breakfastData, setBreakfastData] = useState<BreakfastProps[]>([]);
    const [showStates, setShowStates] = useState({
        coffee: false,
        caffeineFree: false,
        breakfast: false,
        main: true,
        return: false
    });

    useEffect(() => {
        const token = sessionStorage.getItem('token') || getCookie('access_token');
        if (token) {
            fetch('http://119.29.236.82/api/api/user_data', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
              .then(response => response.json())
              .then(data => {
                  if (data.username && data.balance) {
                      setUserData(data);
                      setIsLoggedIn(true);
                  }
              })
              .catch(error => console.error('Error:', error));
        }
    }, []);

    useEffect(() => {
        const token = sessionStorage.getItem('token');

        fetch('http://119.29.236.82/api/api/dataCoffee', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
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
        const token = sessionStorage.getItem('token'); // Retrieve the token from sessionStorage

        fetch('http://119.29.236.82/api/api/dataCaffeineFree', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
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
        const token = sessionStorage.getItem('token'); // Retrieve the token from sessionStorage

        fetch('http://119.29.236.82/api/api/dataBreakfast', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
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
          })
          .catch(error => {
              console.error('Error:', error);
          });
    }, [selectedLanguage]);


    const showCoffee = () => {
        setShowStates((prevState) => ({
            ...prevState,
            coffee: !prevState.coffee,
            caffeineFree: false,
            breakfast: false,
            main: false,
            return: true
        }));
    };

    const showCaffeineFree = () => {
        setShowStates((prevState) => ({
            ...prevState,
            coffee: false,
            caffeineFree: !prevState.caffeineFree,
            breakfast: false,
            main: false,
            return: true
        }));
    };

    function showBreakfast() {
        setShowStates((prevState) => ({
            ...prevState,
            coffee: false,
            caffeineFree: false,
            breakfast: !prevState.breakfast,
            main: false,
            return: true
        }));
    }

    const showMain = () => {
        setShowStates((prevState) => ({
            ...prevState,
            coffee: false,
            caffeineFree: false,
            breakfast: false,
            main: true,
            return: false
        }));
    };

    const handleLoginSuccess = (token: string) => {
        setIsLoggedIn(true);

        sessionStorage.setItem('token', token);

        fetch('http://119.29.236.82/api/api/user_data', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            credentials: 'include'
        })
          .then(response => response.json())
          .then(data => {
              if (data.username && data.balance) {
                  setUserData(data);
              }
          })
          .catch(error => console.error('Error:', error));
    };

    const handleLanguageChange = (newLanguage: SetStateAction<LANGUAGES>) => {
        setSelectedLanguage(newLanguage);
    };

    const login = () => {
        setIsLogingIn(true);
    }

    const register = () => {
        setIsRegistering(true);
    }

    const closeLogin = () => {
        setIsLogingIn(false)
    }

    const closeRegister = () => {
        setIsRegistering(false)
    }

    const getCookie = (name: string): string | undefined => { // Add type annotations
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
        return undefined;
    }

    return (
        <div className={styles.App}>
            {isLogingIn &&(
              <Login onLoginSuccess={handleLoginSuccess} onClose={closeLogin} selectedLanguage={selectedLanguage}/>
            )}
            {isRegistering &&(
              <Register onClose={closeRegister} selectedLanguage={selectedLanguage}/>
            )}
            {isLoggedIn && (
                <div className={styles.welcome}>
                    <p>Hello {userData!.username}</p>
                    <p>You have {userData!.balance}¥ left in your account</p>
                </div>
            )}
            {showStates.main && (
                <div className={styles.home}>
                    <div>
                        <div className={styles.top}>
                            { !isLoggedIn && (
                                <div>
                                    <button className={styles.button_login} name="login" type="button" onClick={login}>
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
                            <LanguageSelection onLanguageChange={handleLanguageChange} selectedLanguage={selectedLanguage}  />
                        </div>
                        <h1 className={styles.title}>
                            {selectedLanguage === 'chinese' ? '摸鱼咖啡厅' : 'MY Cafe'}
                        </h1>
                        <div className={styles.buttons}>
                            <button className={styles.button} onClick={showCoffee}>
                                <span>{selectedLanguage === 'chinese' ? '经典咖啡' : 'Coffee'}</span>
                            </button>
                            <button className={styles.button} onClick={showCaffeineFree}>
                                <span>{selectedLanguage === 'chinese' ? '无咖啡因饮品' : 'Caffeine free'}</span>
                            </button>
                            <button className={styles.button} onClick={showBreakfast}>
                                <span>{selectedLanguage === 'chinese' ? '早餐' : 'Breakfast'}</span>
                            </button>
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
