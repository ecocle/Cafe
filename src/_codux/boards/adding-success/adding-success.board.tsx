import { createBoard } from '@wixc3/react-board';
import { AddingSuccess } from '../../../components/adding-success/adding-success';

export default createBoard({
    name: 'AddingSuccess',
    Board: () => <AddingSuccess />,
    isSnippet: true,
});
