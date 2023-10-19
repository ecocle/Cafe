import { createBoard } from '@wixc3/react-board';
import { Log_Out } from '../../../components/log-out/log-out';

export default createBoard({
    name: 'Log_Out',
    Board: () => <Log_Out />,
    isSnippet: true,
});
