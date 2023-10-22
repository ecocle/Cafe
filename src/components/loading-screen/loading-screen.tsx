import classNames from 'classnames';
import styles from './loading-screen.module.scss';
import { useState, useEffect } from 'react';

export const LoadingScreen = () => {
    const [loadingText, setLoadingText] = useState('Loading');

    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingText(prevText => {
                return prevText === 'Loading....' ? 'Loading' : prevText + '.';
            });
        }, 300);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={classNames(styles['loading-screen'], styles['transition-effect'])}>
            <div className={styles['loading-text']}>
                {loadingText}
            </div>
        </div>
    );
}
