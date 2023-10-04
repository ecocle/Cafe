import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './caffeine-free.module.scss';
import { Order } from '../order/order';
import { Simulate } from 'react-dom/test-utils';
import transitionEnd = Simulate.transitionEnd;

export interface CaffeineFreeProps {
    className?: string;
    Name: string;
    Price: number;
}

export const CaffeineFree = ({ className, Name, Price }: CaffeineFreeProps) => {
    let PriceLarge = Price + 3;

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const closePopup = () => {
        setIsPopupOpen(false);
    }

    const handleOrder = () => {
        console.log(`Ordered ${Name} for $${Price}`);
        setIsPopupOpen(true);
    }
    return (
        <div>
            <div className={classNames(styles.root, className)}>
                <div className={styles.coffee} onClick={handleOrder}>
                    <h2 className={styles.text}>{Name}</h2>
                    <p className={classNames(styles.text, styles['price-tag'])}>M:{Price}</p>
                    <p className={classNames(styles.text, styles['price-tag'])}>L:{PriceLarge}</p>
                </div>
            </div>
            <div>
                {isPopupOpen && (
                    <Order isOpen={true} onClose={closePopup} name={Name} originalPrice={Price} />
                )}
            </div>
        </div>
    );
};
