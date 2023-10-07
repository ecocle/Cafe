import classNames from 'classnames';
import styles from './adding-success.module.scss';
import React from 'react';

export interface AddingSuccessProps {
    className?: string;
    onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
    selectedLanguage: string;
}

export const AddingSuccess = ({ className, selectedLanguage, onClose }: AddingSuccessProps) => {
    return (
        <div className={styles.popup}>
            <div className={styles.popupInner}>
                <h2>{selectedLanguage === 'chinese' ? '已添加金额' : 'Amount Added!'}</h2>
                <p>{selectedLanguage === 'chinese' ? '金额已成功添加到您的账户。' : 'The amount has been added to your account successfully.'}</p>
                <button onClick={onClose} className={styles.closeBtn}>{selectedLanguage === 'chinese' ? '返回' : 'Go back'}</button>
            </div>
        </div>
    );
};
