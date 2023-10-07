import { createBoard } from '@wixc3/react-board';
import { RegisterFailed } from '../../../components/register-failed/register-failed';

export default createBoard({
    name: 'RegisterFailed',
    Board: () => <RegisterFailed onClose={() => {}} selectedLanguage={""}/>,
    isSnippet: true,
    environmentProps: {
        canvasHeight: 356,
        canvasWidth: 462
    }
});
