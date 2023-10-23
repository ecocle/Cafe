import styles from './language-selection.module.scss';
import { LANGUAGES } from '../../constants/constants';
import React from 'react';

export interface LanguageSelectionProps {
    className?: string;
    onLanguageChange: (newLanguage: LANGUAGES) => void;
    selectedLanguage: LANGUAGES;
}

export const LanguageSelection = ({ onLanguageChange, selectedLanguage }: LanguageSelectionProps) => {
    const handleChange = (newLanguage: LANGUAGES) => {
        onLanguageChange(newLanguage);
    };

    return (
        <div>
            <button
                className={styles.select}
                onClick={() => handleChange(LANGUAGES.ENGLISH)}
            >
                EN
            </button>
            <button
                className={styles.select}
                onClick={() => handleChange(LANGUAGES.CHINESE)}
            >
                CH
            </button>
        </div>
    );
};
