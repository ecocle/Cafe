import styles from './login-failed.module.scss';
import React from 'react';

export interface LoginFailedProps {
    className?: string;
    onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const LoginFailed = ({ onClose }: LoginFailedProps) => {
    return (
        <div className={styles.popup}>
            <div className={styles.popupInner}>
                <h2>Account does not exist!</h2>
                <p>Try checking your password or username.</p>
                <button onClick={onClose} className={styles.closeBtn}>Go back</button>
            </div>
        </div>
    );
};
