import styles from './login-success.module.scss';
import React from 'react';

export interface LoginSuccessProps {
    className?: string;
    onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
    selectedLanguage: string;
}

export const LoginSuccess = ({ onClose, selectedLanguage }: LoginSuccessProps) => {
    return (
        <div className={styles.popup}>
            <div className={styles.popupInner}>
                <h2>{selectedLanguage === 'chinese' ? '登陆成功！' : 'Login successful!'}</h2>
                <p>{selectedLanguage === 'chinese' ? '成功的登陆了。' : 'Logged in successfully.'}</p>
                <button onClick={onClose} className={styles.closeBtn}>{selectedLanguage === 'chinese' ? '返回' : 'Go back'}</button>
            </div>
        </div>
    );
};
