import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './breakfast.module.scss';
import { Order } from '../order/order';

export interface BreakfastProps {
    className?: string;
    Name: string;
    Price: number;
    userData: { username: string; balance: number } | null;
    selectedLanguage: string;
}

export const Breakfast = ({ className, Name, Price, userData, selectedLanguage }: BreakfastProps) => {

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const closePopup = () => {
        setIsPopupOpen(false);
    }

    const handleOrder = () => {
        setIsPopupOpen(true);
    }
    return (
        <div>
            <div className={classNames(styles.root, className)}>
                <div className={styles.coffee} onClick={handleOrder}>
                    <h2 className={styles.text}>{Name}</h2>
                    <p className={styles.text}><span className={styles['border-text']}>M:{Price}</span></p>
                </div>
            </div>
            <div>
                {isPopupOpen && (
                    <Order isOpen={true} onClose={closePopup} name={Name} originalPrice={Price} userData={userData} selectedLanguage={selectedLanguage} />
                )}
            </div>
        </div>
    );
};
