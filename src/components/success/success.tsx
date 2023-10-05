import classNames from 'classnames';
import styles from './success.module.scss';
import React from 'react';

export interface SuccessProps {
    className?: string;
    onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
    isOrdered: boolean;
}

export const Success = ({ className, onClose, isOrdered}: SuccessProps) => {
    return (
        <div className={styles.popup}>
            <div className={styles.popupInner}>
                <h2>Order Successful!</h2>
                <p>Your order has been placed successfully.</p>
                <button onClick={onClose} className={styles.closeBtn}>Go back</button>
            </div>
        </div>
    );
};
