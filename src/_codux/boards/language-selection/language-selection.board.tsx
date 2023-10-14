import React from 'react';
import { createBoard } from '@wixc3/react-board';
import { LanguageSelection } from '../../../components/language-selection/language-selection';
import { LANGUAGES } from '../../../constants/constants';

export default createBoard({
    name: 'LanguageSelection',
    Board: (props) => (
        <LanguageSelection
            selectedLanguage={props.selectedLanguage}
            onLanguageChange={props.onLanguageChange}
        />
    ),
    isSnippet: true,
    environmentProps: {
        canvasWidth: 93,
        canvasHeight: 42
    }
});
