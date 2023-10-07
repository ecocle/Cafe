import { createBoard } from '@wixc3/react-board';
import { AddMoneyToAcc } from '../../../components/add-money-to-acc/add-money-to-acc';

export default createBoard({
    name: 'AddMoneyToAcc',
    Board: () => <AddMoneyToAcc />,
    isSnippet: true,
    environmentProps: {
        canvasWidth: 384,
        canvasHeight: 262
    }
});
