import classNames from 'classnames';
import styles from './register-success.module.scss';
import paymentImage from '../../assets/paymentImage.jpg';
import React from 'react';

export interface RegisterSuccessProps {
    className?: string;
    onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const RegisterSuccess = ({ className, onClose }: RegisterSuccessProps) => {
    return (
        <div className={styles.popup}>
            <div className={styles.popupInner}>
                <h2>Account Registered!</h2>
                <p>Your account is registered successfully.</p>
                <button onClick={onClose} className={styles.closeBtn}>Go back</button>
            </div>
        </div>
    );
};
