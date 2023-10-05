import classNames from 'classnames';
import styles from './success.module.scss';
import React, { useEffect, useState } from 'react';
import paymentImage from '../../assets/paymentImage.jpg';

export interface SuccessProps {
    className?: string;
    onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
    isOrdered: boolean;
    userData: { username: string; balance: number } | null;
    price: number;
}

export const Success = ({ className, onClose, isOrdered, userData, price}: SuccessProps) => {
    const [payment, setPayment] = useState(true);
    useEffect(() => {
        console.log(userData);
        if (userData && userData.balance === 0 && userData.username === '') {
            setPayment(false);
        }
    }, []);
    return (
        <div className={styles.popup}>
            <div className={styles.popupInner}>
                {payment &&(
                    <div>
                        <img
                            src={paymentImage}
                            alt="Payment Image"
                            style={{
                                maxHeight: '12em',
                            }}
                        />
                        <p>You need to pay {price}¥</p>
                    </div>
                )}
                <h2>Order Successful!</h2>
                <p>Your order has been placed successfully.</p>
                {!payment &&(
                    <div>
                        <p>You have {userData!.balance - price}¥ left in your account</p>
                    </div>
                )}
                <button onClick={onClose} className={styles.closeBtn}>Go back</button>
            </div>
        </div>
    );
};
