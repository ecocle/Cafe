import styles from './login-failed.module.scss';
import React from 'react';

export interface LoginFailedProps {
    className?: string;
    onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
    selectedLanguage: string;
}

export const LoginFailed = ({ onClose, selectedLanguage }: LoginFailedProps) => {
    return (
        <div className={styles.popup}>
            <div className={styles.popupInner}>
                <h2>{selectedLanguage === 'chinese' ? '账号不存在！' : 'Accounts doe snot exist!'}</h2>
                <p>{selectedLanguage === 'chinese' ? '尝试检查您的用户名和密码。' : 'Try checking your username and password.'}</p>
                <button onClick={onClose} className={styles.closeBtn}>{selectedLanguage === 'chinese' ? '返回' : 'Go back'}</button>
            </div>
        </div>
    );
};
