import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './caffeine-free.module.scss';
import { Order } from '../order/order';

export interface CaffeineFreeProps {
    className?: string;
    Name: string;
    Price: number;
    userData: { username: string; balance: number } | null;
    selectedLanguage: string;
}

export const CaffeineFree = ({ className, Name, Price, userData, selectedLanguage }: CaffeineFreeProps) => {
    let PriceLarge = Price + 3;

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
                    <p className={classNames(styles.text, styles['border-text'])}>M:{Price}</p>
                    <p className={classNames(styles.text, styles['border-text'])}>L:{PriceLarge}</p>
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
