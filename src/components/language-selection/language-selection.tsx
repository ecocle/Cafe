import styles from './language-selection.module.scss';
import { LANGUAGES } from '../../constants/constants';
import React from 'react';

export interface LanguageSelectionProps {
    className?: string;
    onLanguageChange: (newLanguage: LANGUAGES) => void;
    selectedLanguage: LANGUAGES;
}

export const LanguageSelection = ({ onLanguageChange, selectedLanguage }: LanguageSelectionProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newLanguage = event.target.value as LANGUAGES;
        onLanguageChange(newLanguage);
    };

    return (
        <select className={styles.select} value={selectedLanguage} onChange={handleChange}>
            <option className={styles.option} value={LANGUAGES.ENGLISH}>English</option>
            <option className={styles.option} value={LANGUAGES.CHINESE}>Chinese</option>
        </select>
    );
};
