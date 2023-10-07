import { createBoard } from '@wixc3/react-board';
import { AddingFailed } from '../../../components/adding-failed/adding-failed';

export default createBoard({
    name: 'AddingFailed',
    Board: () => <AddingFailed />,
    isSnippet: true,
});
