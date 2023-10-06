import { createBoard } from '@wixc3/react-board';
import { LoginSuccess } from '../../../components/login-success/login-success';

export default createBoard({
    name: 'LoginSuccess',
    Board: () => <LoginSuccess />,
    isSnippet: true,
    environmentProps: {
        canvasWidth: 419,
        canvasHeight: 326
    }
});
