import { createBoard } from '@wixc3/react-board';
import { LoginSuccess } from '../../../components/login-success/login-success';
import { MouseEvent } from 'react';

export default createBoard({
    name: 'LoginSuccess',
    Board: () => <LoginSuccess onClose={function(onclose): void {
        throw new Error('Function not implemented.');
    } } selectedLanguage={''} />,
    isSnippet: true,
    environmentProps: {
        canvasWidth: 419,
        canvasHeight: 326
    }
});
