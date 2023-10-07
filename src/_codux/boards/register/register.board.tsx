import { createBoard } from '@wixc3/react-board';
import { Register } from '../../../components/register/register';

export default createBoard({
    name: 'Register',
    Board: () => <Register onClose={() => {}} selectedLanguage={""}/>,
    isSnippet: true,
    environmentProps: {
        canvasHeight: 444,
        canvasWidth: 590
    }
});
