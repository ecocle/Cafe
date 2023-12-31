import classNames from 'classnames';
import styles from './add-money-to-acc.module.scss';
import {AddingSuccess} from '../adding-success/adding-success';
import {AddingFailed} from '../adding-failed/adding-failed';
import React, {useState} from 'react';

export interface AddMoneyToAccProps {
    className?: string;
    onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
    selectedLanguage: string;
}

export const AddMoneyToAcc = ({className, onClose, selectedLanguage}: AddMoneyToAccProps) => {
    const [amount, setAmount] = useState('');
    const [adding, setAdding] = useState({
        adding: false,
        success: false,
        failed: false,
    });

    const handleClosing = (e: React.MouseEvent<HTMLButtonElement>) => {
        onClose(e);
    };

    const handleAdd = async () => {
        const token = getCookie('access_token');
        const response = await fetch('/api/addMoneyToAcc', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            credentials: 'include',
            body: JSON.stringify({amount}),
        });

        if (response.ok) {
            showSuccess();
        } else if (response.status === 400) {
            showFailed();
        } else {
            showFailed();
            console.error(`Error: ${response.statusText}`);
        }
    };

    const showSuccess = () => {
        setAdding(() => ({
            adding: true,
            success: true,
            failed: false,
        }));
    }

    const showFailed = () => {
        setAdding(() => ({
            adding: true,
            success: false,
            failed: true,
        }));
    }

    const handleClosingSuccess = (e: React.MouseEvent<HTMLButtonElement>) => {
        onClose(e);
        window.location.href = '/';
    }

    const handleClosingFailed = (e: React.MouseEvent<HTMLButtonElement>) => {
        onClose(e);
        window.location.href = '/';
    }

    const getCookie = (name: string): string | undefined => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
        return undefined;
    }

    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.popup}>
                {adding.adding && (
                    <>
                        {adding.success && (
                            <div>
                                <AddingSuccess onClose={handleClosingSuccess} selectedLanguage={selectedLanguage}
                                               amount={amount}/>
                            </div>
                        )}
                        {adding.failed && (
                            <div>
                                <AddingFailed onClose={handleClosingFailed} selectedLanguage={selectedLanguage}/>
                            </div>
                        )}
                    </>
                )}
                <div className={styles.popupInner}>
                    <button onClick={handleClosing}
                            className={styles.close}>{selectedLanguage === 'chinese' ? '关闭' : 'Close'}</button>
                    <label>{selectedLanguage === 'chinese' ? '数量:' : 'Amount:'}</label>
                    <br/>
                    <input
                        id="amount"
                        type="text"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                    <br/>
                    <button id="registrationButton" className={styles.button} type="button" onClick={handleAdd}>
                        {selectedLanguage === 'chinese' ? '添加金额到帐户！' : 'Add amount to account!'}
                    </button>
                </div>
            </div>
        </div>
    );
};
