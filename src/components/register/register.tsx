import classNames from 'classnames';
import styles from './register.module.scss';
import React, { useState } from 'react';
import { RegisterFailed } from '../register-failed/register-failed';
import { RegisterSuccess } from '../register-success/register-success';

export interface RegisterProps {
    className?: string;
    onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
    selectedLanguage: string;
}

export const Register = ({ className, onClose, selectedLanguage }: RegisterProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [registered, setRegistered] = useState({
        registered: false,
        success: false,
        failed: false,
    });

    const handleClosing = (e: React.MouseEvent<HTMLButtonElement>) => {
        onClose(e);
    };

    const handleRegistration = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                    body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                showSuccess();
            } else if (response.status === 400) {
                showFailed();
            } else {
                showFailed();
                console.error(`Error: ${response.statusText}`);
            }
        } finally {

        }
    };

    const showSuccess = () => {
        setRegistered(() => ({
            registered: true,
            success: true,
            failed: false,
        }));
    }

    const showFailed = () => {
        setRegistered(() => ({
            registered: true,
            success: false,
            failed: true,
        }));
    }

    const handleClosingSuccess = (e: React.MouseEvent<HTMLButtonElement>) => {
        onClose(e);
        window.location.href = '/';
    }

    const handleClosingFailed = (e: React.MouseEvent<HTMLButtonElement>) => {
        onClose(e);
        window.location.href = '/';
    }

    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.popup}>
                {registered.registered && (
                    <>
                        {registered.success && (
                            <div>
                                <RegisterSuccess onClose={handleClosingSuccess} selectedLanguage={selectedLanguage} />
                            </div>
                        )}
                        {registered.failed && (
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
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <br />
                    <label>{selectedLanguage === 'chinese' ? '密码:' : 'Password:'}</label>
                    <br />
                    <input
                        id ="password"
                        type="test"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <br />
                    <button id="registrationButton" className={styles.button} type="button" onClick={handleRegistration}>
                        {selectedLanguage === 'chinese' ? '注册账号！' : 'Register account!'}
                    </button>
                </div>
            </div>
        </div>
    );
};
