import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './login.module.scss';
import jwt_decode from 'jwt-decode';
import { LoginSuccess } from '../login-success/login-success';
import { LoginFailed } from '../login-failed/login-failed';
import { LoadingScreen } from '../loading-screen/loading-screen';

export interface LoginProps {
    className?: string;
    onLoginSuccess: (username: string, token: string) => void;
    onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
    selectedLanguage: string;
}

export const Login = ({ className, onLoginSuccess, onClose, selectedLanguage }: LoginProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState({
        login: false,
        success: false,
        failed: false,
    });

    const handleClosing = (e: React.MouseEvent<HTMLButtonElement>) => {
        onClose(e);
    };

    const handleLogin = async () => {
        const loginData = {
            username,
            password,
        };
        setIsLoading(true);

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            if (response.ok) {
                setIsLoading(false);
                showSuccess();
            } else if (response.status === 404) {
                setIsLoading(false);
                showFailed();
            } else {
                showFailed();
                setIsLoading(false);
                console.error(`Error: ${response.statusText}`);
            }

            const responseData = await response.json();
            const token = responseData.token;
            localStorage.setItem('token', token);
            const decodedToken: { username: string } = jwt_decode(token);
            const username = decodedToken.username;
            localStorage.setItem('username', username);
            onLoginSuccess(username, token);
        } catch (error) {
            setIsLoading(false);
            showFailed();
        }
    };

    const showSuccess = () => {
        setLogin(() => ({
            login: true,
            success: true,
            failed: false
        }));
    }

    const showFailed = () => {
        setLogin(() => ({
            login: true,
            failed: true,
            success: false
        }));
    }

    const handleClosingSuccess = (e: React.MouseEvent<HTMLButtonElement>) => {
        onClose(e);
    }

    const handleClosingFailed = (e: React.MouseEvent<HTMLButtonElement>) => {
        onClose(e);
    }

    return (
        <div className={classNames(styles.root, className)}>
            {isLoading && <LoadingScreen />}
            <div className={styles.popup}>
                {login.login && (
                    <>
                        {login.success && (
                            <div>
                                <LoginSuccess onClose={handleClosingSuccess} selectedLanguage={selectedLanguage} />
                            </div>
                        )}
                        {login.failed && (
                            <div>
                                <LoginFailed onClose={handleClosingFailed} selectedLanguage={selectedLanguage} />
                            </div>
                        )}
                    </>
                )}
                <div className={styles.popupInner}>
                    <button onClick={handleClosing} className={styles.close}>{selectedLanguage === 'chinese' ? '关闭' : 'Close'}</button>
                    <label>{selectedLanguage === 'chinese' ? '用户名:' : 'Username:'}</label>
                    <br />
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <br />
                    <label>{selectedLanguage === 'chinese' ? '密码:' : 'Password:'}</label>
                    <br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <br />
                    <button className={styles.button}
                            type="button"
                            onClick={handleLogin}
                            disabled={username === "" || password === ""}
                    >
                        {selectedLanguage === 'chinese' ? '登陆' : 'Login'}
                    </button>
                </div>
            </div>
        </div>
    );
};
