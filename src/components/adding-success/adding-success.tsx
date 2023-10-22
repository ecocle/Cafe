import styles from './adding-success.module.scss';
import React from 'react';
import paymentImage from '../../assets/paymentImage.jpg';

export interface AddingSuccessProps {
    className?: string;
    onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
    selectedLanguage: string;
    amount:string;
}

export const AddingSuccess = ({ selectedLanguage, onClose, amount }: AddingSuccessProps) => {
    return (
        <div className={styles.popup}>
            <div className={styles.popupInner}>
                <div>
                    <img
                      src={paymentImage}
                      alt="Payment Image"
                      style={{
                          maxHeight: '12em',
                      }}
                    />
                    <p>{selectedLanguage === 'chinese' ? '你需要付' : 'You need to pay'} <span style={{ fontWeight: 'bold'}}>¥{amount}</span></p>
                </div>
                <h2>{selectedLanguage === 'chinese' ? '已添加金额' : 'Amount Added!'}</h2>
                <p>{selectedLanguage === 'chinese' ? '金额已成功添加到您的账户。' : 'The amount has been added to your account successfully.'}</p>
                <button onClick={onClose} className={styles.closeBtn}>{selectedLanguage === 'chinese' ? '返回' : 'Go back'}</button>
            </div>
        </div>
    );
};
