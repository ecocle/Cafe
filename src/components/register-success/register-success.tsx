import styles from './register-success.module.scss';
import React from 'react';

export interface RegisterSuccessProps {
    className?: string;
    onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
    selectedLanguage: string;
}

export const RegisterSuccess = ({ onClose, selectedLanguage }: RegisterSuccessProps) => {
    return (
        <div className={styles.popup}>
            <div className={styles.popupInner}>
                <h2>{selectedLanguage === 'chinese' ? '注册成功' : 'Account Registered!'}</h2>
                <p>{selectedLanguage === 'chinese' ? '您的帐户已注册成功。' : 'Your account is registered successfully.'}</p>
                <button onClick={onClose} className={styles.close}>{selectedLanguage === 'chinese' ? '返回' : 'Go back'}</button>
            </div>
        </div>
    );
};
