import classNames from 'classnames';
import styles from './language-selection.module.scss';
import { LANGUAGES, DEFAULT_LANGUAGE } from '../../constants/constants';
import { useState } from 'react';

export interface LanguageSelectionProps {
    className?: string;
    onLanguageChange: (newLanguage: LANGUAGES) => void;
    selectedLanguage: LANGUAGES;
}

export const LanguageSelection = ({ className, onLanguageChange, selectedLanguage }: LanguageSelectionProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newLanguage = event.target.value as LANGUAGES;
        onLanguageChange(newLanguage);
    };

    return (
        <select value={selectedLanguage} onChange={handleChange}>
            <option value={LANGUAGES.ENGLISH}>English</option>
            <option value={LANGUAGES.CHINESE}>Chinese</option>
        </select>
    );
};
