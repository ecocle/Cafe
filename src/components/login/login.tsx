import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './login.module.scss';
import jwt_decode from 'jwt-decode';
import { RegisterSuccess } from '../register-success/register-success';
import { RegisterFailed } from '../register-failed/register-failed';

export interface LoginProps {
    className?: string;
    onLoginSuccess: (username: string, token: string) => void;
    onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
    selectedLanguage: string;
}

export const Login = ({ className, onLoginSuccess, onClose, selectedLanguage }: LoginProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState({
        login: false,
        success: false,
        failed: false,
    });

    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        onClose(e);
        const loginData = {
            username,
            password,
        };

        try {
            const response = await fetch('http://192.168.3.15:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            const token = responseData.token;
            localStorage.setItem('token', token);
            showSuccess();
            console.log(token);
            const decodedToken: { username: string } = jwt_decode(token);
            const username = decodedToken.username;
            onLoginSuccess(username, token);
        } catch (error) {
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

    const handleClosing = (e: React.MouseEvent<HTMLButtonElement>) => {
        onClose(e);
    };

    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.popup}>
                {login.login && (
                    <>
                        {login.success && (
                            <div>
                                <RegisterSuccess onClose={handleClosingSuccess} selectedLanguage={selectedLanguage} />
                            </div>
                        )}
                        {login.failed && (
                            <div>
                                <RegisterFailed onClose={handleClosingFailed} selectedLanguage={selectedLanguage} />
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
                    <button className={styles.button} type="button" onClick={handleLogin}>
                        {selectedLanguage === 'chinese' ? '登陆' : 'Login'}
                    </button>
                </div>
            </div>
        </div>
    );
};
