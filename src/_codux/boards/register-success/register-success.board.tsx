import { createBoard } from '@wixc3/react-board';
import { RegisterSuccess } from '../../../components/register-success/register-success';

export default createBoard({
    name: 'RegisterSuccess',
    Board: () => <RegisterSuccess onClose={() => { }} selectedLanguage={""} />,
    isSnippet: true,
    environmentProps: {
        canvasHeight: 236,
        canvasWidth: 372
    }
});
