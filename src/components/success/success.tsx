import styles from './success.module.scss';
import React, { useEffect, useState } from 'react';
import paymentImage from '../../assets/paymentImage.jpg';

export interface SuccessProps {
    className?: string;
    onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
    isOrdered: boolean;
    userData: { username: string; balance: number } | null;
    price: number;
    selectedLanguage: string;
}

export const Success = ({ onClose, userData, price, selectedLanguage}: SuccessProps) => {
    const [payment, setPayment] = useState(true);
    useEffect(() => {
        console.log(userData);
        if (!(userData && userData.balance === 0 && userData.username === '')) {
            if (userData!.balance >= price) {
                setPayment(false);
            }
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
                        <p>{selectedLanguage === 'chinese' ? '你需要付' : 'You need to pay'} <span style={{ fontWeight: 'bold'}}>{price}¥</span></p>
                    </div>
                )}
                <h2>{selectedLanguage === 'chinese' ? '订单成功！' : 'Order Successful!'}</h2>
                <p>{selectedLanguage === 'chinese' ? '您的订单已成功下达。' : 'Your order has been placed successfully.'}</p>
                {!payment &&(
                    <div>
                        <p>{selectedLanguage === 'chinese' ? '你还剩' : 'You have'} <span style={{fontWeight: 'bold'}}>{userData!.balance - price}¥</span> {selectedLanguage === 'chinese' ? '在你帐号里' : 'Left in your account'}</p>
                    </div>
                )}
                <button onClick={onClose} className={styles.closeBtn}>{selectedLanguage === 'chinese' ? '返回' : 'Go back'}</button>
            </div>
        </div>
    );
};
