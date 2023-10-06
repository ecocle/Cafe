import styles from './login-success.module.scss';
import React from 'react';

export interface LoginSuccessProps {
    className?: string;
    onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const LoginSuccess = ({ onClose }: LoginSuccessProps) => {
    return (
        <div className={styles.popup}>
            <div className={styles.popupInner}>
                <h2>Login successful!</h2>
                <p>Successfully loged in.</p>
                <button onClick={onClose} className={styles.closeBtn}>Go back</button>
            </div>
        </div>
    );
};
