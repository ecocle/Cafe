import { createBoard } from '@wixc3/react-board';
import { AddingFailed } from '../../../components/adding-failed/adding-failed';
import { MouseEvent } from 'react';

export default createBoard({
    name: 'AddingFailed',
    Board: () => <AddingFailed onClose={function(onclose): void {
        throw new Error('Function not implemented.');
    }} selectedLanguage={''} />,
    isSnippet: true,
    environmentProps: {
        canvasHeight: 322,
        canvasWidth: 596
    }
});
