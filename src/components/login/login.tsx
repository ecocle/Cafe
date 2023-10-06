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
}

export const Login = ({ className, onLoginSuccess, onClose }: LoginProps) => {
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
            const response = await fetch('http://119.29.236.82/api/api/login', {
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
                                <RegisterSuccess onClose={handleClosingSuccess}/>
                            </div>
                        )}
                        {login.failed && (
                            <div>
                                <RegisterFailed onClose={handleClosingFailed}/>
                            </div>
                        )}
                    </>
                )}
                <div className={styles.popupInner}>
                    <button onClick={handleClosing} className={styles.close}>Close</button>
                    <label>Username:</label>
                    <br />
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <br />
                    <label>Password:</label>
                    <br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <br />
                    <button className={styles.button} type="button" onClick={handleLogin}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};
