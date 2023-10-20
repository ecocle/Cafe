import classNames from 'classnames';
import styles from './order.module.scss';
import React, { useState, useEffect } from 'react';
import { Success } from '../success/success';

export interface OrderProps {
    className?: string;
    isOpen: boolean;
    onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
    name: string;
    originalPrice: number;
    userData: { username: string; balance: number } | null;
    selectedLanguage: string;
}

export const Order = ({ isOpen, onClose, name, originalPrice, userData, selectedLanguage }: OrderProps) => {
    const [isClosing, setIsClosing] = useState(false);
    const [isOrdered, setIsOrder] = useState(false);
    const [temperature, setTemperature] = useState('cold');
    const [selectedSize, setSelectedSize] = useState('medium');
    const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [price, setPrice] = useState(originalPrice);
    const [comments, setComments] = useState('');
    const [useCup, setUseCup] = useState(false);
    const noSize = ['Crispy cereal in milk(classic)', 'Crispy cereal in milk(honey)', 'Crispy cereal in milk(chocolate)', 'Classic flavored Porridge', 'Chocolate flavored Porridge'];
    const noToppings = ['Crispy cereal in milk(classic)', 'Crispy cereal in milk(honey)', 'Crispy cereal in milk(chocolate)', 'Classic flavored Porridge', 'Chocolate flavored Porridge'];
    const noHot = ['Crispy cereal in milk(classic)', 'Crispy cereal in milk(honey)', 'Crispy cereal in milk(chocolate)', 'Cocoa', 'Matcha milk', 'Matcha boba', 'Tai Red Tea', 'Coconut Water', 'Milk tea', 'Jasmine Milktea', 'Boba', 'Refreshing babyblue drink', 'Pure milk'];
    const noCold = ['Classic flavored Porridge', 'Chocolate flavored Porridge'];
    const noNormal = ['Crispy cereal in milk(classic)', 'Crispy cereal in milk(honey)', 'Crispy cereal in milk(chocolate)', 'Classic flavored Porridge', 'Chocolate flavored Porridge'];

    useEffect(() => {
        if (userData) {
            setFirstName(userData.username);
            setLastName(userData.username);
        }
    }, [userData]);

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


    const handleUseCupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setUseCup(isChecked);
        let newPrice = originalPrice;
        if (isChecked) {
            newPrice -= 1;
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

    const handleOrder = async () => {
        let balance: number;
        if (!(userData && userData.balance === 0 && userData.username === '')) {
            if (userData!.balance >= price) {
                balance = userData!.balance - price;
            } else {
                balance = userData!.balance;
            }
        } else {
            balance = 0;
        }

        const orderData = {
            name,
            temperature,
            selectedSize,
            selectedToppings,
            firstName,
            lastName,
            price,
            comments,
            useCup,
            balance,
        };

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            console.log('Order placed successfully:', responseData);
            setIsOrder(true);
            } catch (error) {
                console.error('Error placing order:', error);
            }
    };


    const handleClosing = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsClosing(true);
        setTimeout(() => {
            onClose(e);
            setIsClosing(false);
        }, 300);
    };

    const handleClosingSuccess = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOrder(false);
        onClose(e);
        window.location.href = '/';
    }

    return (
        <div className={classNames(styles.popup, { [styles.open]: isOpen, [styles.closing]: isClosing })}>
            <div className={classNames(styles.popupInner, { [styles.closing]: isClosing })}>
                { isOrdered && (
                    <Success isOrdered={true}  onClose={handleClosingSuccess} userData={userData} price={price} selectedLanguage={selectedLanguage} />
                )}
                <div>
                    <button className={styles["close-btn"]} onClick={handleClosing}>
                        {selectedLanguage === 'chinese' ? '关闭' : 'Close'}
                    </button>
                    <p className={styles.name}>
                        {name}
                    </p>
                </div>
                <h2>{selectedLanguage === 'chinese' ? '选择选项' : 'Select Options'}</h2>
                <div className="option">
                    <label>
                        {selectedLanguage === 'chinese' ? '温度:' : 'Temperature:'}

                        <select value={temperature} onChange={(e) => setTemperature(e.target.value)}>
                            {!noHot.includes(name) && (
                                <option value="hot">{selectedLanguage === 'chinese' ? '热' : 'Hot'}</option>
                            )}
                            {!noCold.includes(name) && (
                                <option value="cold">{selectedLanguage === 'chinese' ? '冷' : 'Cold'}</option>
                            )}
                            {!noNormal.includes(name) && (
                                <option value="normal">{selectedLanguage === 'chinese' ? '正常' : 'Normal'}</option>
                            )}
                        </select>
                    </label>
                </div>
                {!noSize.includes(name) && (
                    <div className="option">
                        <label>
                            {selectedLanguage === 'chinese' ? '大小:' : 'Size:'}
                            <select value={selectedSize} onChange={handleSizeChange}>
                                <option value="medium">{selectedLanguage === 'chinese' ? '中' : 'Medium'}</option>
                                <option value="large">{selectedLanguage === 'chinese' ? '大' : 'Large'}</option>
                            </select>
                        </label>
                    </div>
                )}
                {!noToppings.includes(name) && (
                    <div className="option">
                        <label>
                            {selectedLanguage === 'chinese' ? '配料' : 'Toppings:'}
                            <div>
                                <label>
                                    <input type="checkbox" value="oatmilkSubstitution" checked={selectedToppings.includes('oatmilkSubstitution')} onChange={() => handleToppingChange('oatmilkSubstitution')} />
                                    <span className="no-line-break">{selectedLanguage === 'chinese' ? '燕麦奶更换' : 'Oat Milk Substitution'}</span>
                                </label>
                          fi      <label>
                                    <input type="checkbox" value="boba" checked={selectedToppings.includes('boba')} onChange={() => handleToppingChange('boba')} />
                                    <span className="no-line-break">{selectedLanguage === 'chinese' ? '珍珠' : 'Boba'}</span>
                                </label>
                                <label>
                                    <input type="checkbox" value="extraExpressoShot" checked={selectedToppings.includes('extraExpressoShot')} onChange={() => handleToppingChange('extraExpressoShot')} disabled />
                                    <span className="no-line-break"><s>{selectedLanguage === 'chinese' ? '外加一份浓缩' : 'Extra Espresso Shot'}</s></span>
                                </label>
                                <label>
                                    <input type="checkbox" value="redBean" checked={selectedToppings.includes('redBean')} onChange={() => handleToppingChange('redBean')} />
                                    <span className="no-line-break">{selectedLanguage === 'chinese' ? '红豆' : 'Red Bean'}</span>
                                </label>
                            </div>
                        </label>
                    </div>
                )}
                <div className="option">
                    <label>
                        {selectedLanguage === 'chinese' ? '名' : 'First Name:'}
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </label>
                </div>
                <div className="option">
                    <label>
                        {selectedLanguage === 'chinese' ? '姓' : 'Last Name:'}
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                    </label>
                </div>
                <div className="option">
                    <label>
                        <input type="checkbox" checked={useCup} onChange={handleUseCupChange} />
                        <span className="no-line-break">{selectedLanguage === 'chinese' ? '用自己的杯子' : 'Use own cup'}</span>
                    </label>
                </div>
                <div className="option">
                    <label>
                        <textarea value={comments} onChange={(e) => setComments(e.target.value)} placeholder={selectedLanguage === 'chinese' ? '备注' : 'Comments'}  style={{ resize: 'none' }} />
                    </label>
                </div>
                <button onClick={handleOrder} className={styles['order-btn']}>
                    {selectedLanguage === 'chinese' ? '点单' : 'Place Order'}
                </button>
                <div>
                    <p className={styles.price}>{selectedLanguage === 'chinese' ? '总价' : 'Total price:'}{price}</p>
                </div>
            </div>
        </div>
    );
};
