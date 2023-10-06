import classNames from 'classnames';
import styles from './register-failed.module.scss';
import paymentImage from '../../assets/paymentImage.jpg';
import React from 'react';

export interface RegisterFailedProps {
    className?: string;
    onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
    selectedLanguage: string;
}

export const RegisterFailed = ({ className, onClose, selectedLanguage }: RegisterFailedProps) => {
    return (
        <div className={styles.popup}>
            <div className={styles.popupInner}>
                <h2>{selectedLanguage === 'chinese' ? '账号已存在' : 'Account already exist'}</h2>
                <p>{selectedLanguage === 'chinese' ? '尝试另一个用户名和密码。' : 'Try another username and password.'}</p>
                <button onClick={onClose} className={styles.closeBtn}>{selectedLanguage === 'chinese' ? '返回' : 'Go back'}</button>
            </div>
        </div>
    );
};
