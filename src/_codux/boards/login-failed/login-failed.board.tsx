import { createBoard } from '@wixc3/react-board';
import { LoginFailed } from '../../../components/login-failed/login-failed';

export default createBoard({
    name: 'LoginFailed',
    Board: () => <LoginFailed />,
    isSnippet: true,
    environmentProps: {
        canvasWidth: 387,
        canvasHeight: 274
    }
});
