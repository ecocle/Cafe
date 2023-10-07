import { createBoard } from '@wixc3/react-board';
import { AddMoneyToAcc } from '../../../components/add-money-to-acc/add-money-to-acc';
import { MouseEvent } from 'react';
import { func } from 'prop-types';

export default createBoard({
    name: 'AddMoneyToAcc',
    Board: () => <AddMoneyToAcc onClose={function(onClose): void {
        throw new Error('Function not implemented.');
    } } selectedLanguage={''} />,
    isSnippet: true,
    environmentProps: {
        canvasWidth: 384,
        canvasHeight: 262
    }
});
