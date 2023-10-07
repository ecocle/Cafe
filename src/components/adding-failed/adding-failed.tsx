import classNames from 'classnames';
import styles from './adding-failed.module.scss';
import React from 'react';

export interface AddingFailedProps {
    className?: string;
    onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
    selectedLanguage: string;
}

export const AddingFailed = ({ className, onClose, selectedLanguage }: AddingFailedProps) => {
    return (
        <div className={styles.popup}>
            <div className={styles.popupInner}>
                <h2>{selectedLanguage === 'chinese' ? 'null' : 'This shouldn\'t happen'}</h2>
                <p>{selectedLanguage === 'chinese' ? 'null' : 'You shouldn\'t see this page if you do contact me(shawn).'}</p>
                <button onClick={onClose} className={styles.closeBtn}>{selectedLanguage === 'chinese' ? '返回' : 'Go back'}</button>
            </div>
        </div>
    );
};
