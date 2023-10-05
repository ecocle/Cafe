import { createBoard } from '@wixc3/react-board';
import { RegisterSuccess } from '../../../components/register-success/register-success';

export default createBoard({
    name: 'RegisterSuccess',
    Board: () => <RegisterSuccess  onClose={() => {}}/>,
    isSnippet: true,
    environmentProps: {
        canvasHeight: 394,
        canvasWidth: 542
    }
});
