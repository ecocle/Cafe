import classNames from 'classnames';
import styles from './register.module.scss';
import React, { useState } from 'react';
import { RegisterFailed } from '../register-failed/register-failed';
import { RegisterSuccess } from '../register-success/register-success';

export interface RegisterProps {
    className?: string;
    onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Register = ({ className, onClose }: RegisterProps) => {
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
            const response = await fetch('http://119.29.236.82/api/api/register', {
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
                                <RegisterSuccess onClose={handleClosingSuccess}/>
                            </div>
                        )}
                        {registered.failed && (
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
                    <button className={styles.button} type="button" onClick={handleRegistration}>
                        Register account!
                    </button>
                </div>
            </div>
        </div>
    );
};
