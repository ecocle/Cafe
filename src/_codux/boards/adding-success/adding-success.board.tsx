import { createBoard } from '@wixc3/react-board';
import { AddingSuccess } from '../../../components/adding-success/adding-success';
import { MouseEvent } from 'react';

export default createBoard({
    name: 'AddingSuccess',
    Board: () => <AddingSuccess onClose={function(onclose): void {
        throw new Error('Function not implemented.');
    } } selectedLanguage={''} />,
    isSnippet: true,
});
