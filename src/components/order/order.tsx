import classNames from 'classnames';
import styles from './order.module.scss';
import React, { useState, ChangeEvent } from 'react';

export interface OrderProps {
    className?: string;
    isOpen: boolean;
    onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
    name: string;
    originalPrice: number;
}

export const Order = ({ className, isOpen, onClose, name, originalPrice }: OrderProps) => {
    const [temperature, setTemperature] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [price, setPrice] = useState(originalPrice);


    const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSize = e.target.value;
        setSelectedSize(newSize);

        let newPrice = originalPrice;

        if (newSize === 'large') {
            newPrice += 3;
        }

        selectedToppings.forEach(topping => {
            if (topping === 'oatmilkSubstitution') {
                newPrice += 1;
            } else if (topping === 'boba') {
                newPrice += 1;
            } else if (topping === 'extraExpressoShot') {
                newPrice += 2;
            } else if (topping === 'redBean') {
                newPrice += 1;
            }
        });

        setPrice(newPrice);
    };

    const handleToppingChange = (topping: string) => {
        const updatedToppings = selectedToppings.includes(topping)
            ? selectedToppings.filter(item => item !== topping)
            : [...selectedToppings, topping];

        setSelectedToppings(updatedToppings);

        let newPrice = originalPrice;

        if (selectedSize === 'large') {
            newPrice += 3;
        }

        updatedToppings.forEach(topping => {
            if (topping === 'oatmilkSubstitution') {
                newPrice += 1;
            } else if (topping === 'boba') {
                newPrice += 1;
            } else if (topping === 'extraExpressoShot') {
                newPrice += 2;
            } else if (topping === 'redBean') {
                newPrice += 1;
            }
        });

        setPrice(newPrice);
    };

    const handleOrder = () => {
        console.log(`Ordered ${name} for $${price} with size ${selectedSize} and toppings ${selectedToppings.join(', ')}`);
        onClose;
    };

    return (
        <div className={classNames(styles.popup, { [styles.open]: isOpen, [styles.closed]: !isOpen })}>
            <div className={styles["popup-inner"]}>
                <div>
                    <button className={styles["close-btn"]} onClick={onClose}>
                        Close
                    </button>
                    <p className={styles.name}>
                        {name}
                    </p>
                </div>
                <h2>Select Options</h2>
                <div className="option">
                    <label>
                        Temperature:
                        <select value={temperature} onChange={(e) => setTemperature(e.target.value)}>
                            <option value="cold">Cold</option>
                            <option value="hot">Hot</option>
                            <option value="normal">Normal</option>
                        </select>
                    </label>
                </div>
                <div className="option">
                    <label>
                        Size:
                        <select value={selectedSize} onChange={handleSizeChange}>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </select>
                    </label>
                </div>
                <div className="option">
                    <label>
                        Toppings:
                        <div>
                            <label>
                                <input type="checkbox" value="oatmilkSubstitution" checked={selectedToppings.includes('oatmilkSubstitution')} onChange={() => handleToppingChange('oatmilkSubstitution')} />
                                <span className="no-line-break">Oatmilk Substitution</span>
                            </label>
                            <label>
                                <input type="checkbox" value="boba" checked={selectedToppings.includes('boba')} onChange={() => handleToppingChange('boba')} />
                                <span className="no-line-break">Boba</span>
                            </label>
                            <label>
                                <input type="checkbox" value="extraExpressoShot" checked={selectedToppings.includes('extraExpressoShot')} onChange={() => handleToppingChange('extraExpressoShot')} />
                                <span className="no-line-break">Extra Espresso Shot</span>
                            </label>
                            <label>
                                <input type="checkbox" value="redBean" checked={selectedToppings.includes('redBean')} onChange={() => handleToppingChange('redBean')} />
                                <span className="no-line-break">Red Bean</span>
                            </label>
                        </div>
                    </label>
                </div>
                <div className="option">
                    <label>
                        First Name:
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </label>
                </div>
                <div className="option">
                    <label>
                        Last Name:
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </label>
                </div>
                <button onClick={handleOrder} className={styles['order-btn']}>
                    Place Order
                </button>
                <div>
                    <p className={styles.price}>Total price:{price}</p>
                </div></div>
        </div>
    );
};
