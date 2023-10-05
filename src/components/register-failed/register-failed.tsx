import classNames from 'classnames';
import styles from './register-failed.module.scss';
import paymentImage from '../../assets/paymentImage.jpg';
import React from 'react';

export interface RegisterFailedProps {
    className?: string;
    onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const RegisterFailed = ({ className, onClose }: RegisterFailedProps) => {
    return (
        <div className={styles.popup}>
            <div className={styles.popupInner}>
                <h2>Account already exist</h2>
                <p>Try another username or password.</p>
                <button onClick={onClose} className={styles.closeBtn}>Go back</button>
            </div>
        </div>
    );
};
