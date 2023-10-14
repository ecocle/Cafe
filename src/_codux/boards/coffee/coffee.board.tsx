import { createBoard } from '@wixc3/react-board';
import { Coffee } from '../../../components/coffee/coffee';

export default createBoard({
    name: 'Coffee',
    Board: () => <Coffee Name={''} Price={0} userData={null} selectedLanguage={""} />,
    isSnippet: true,
    environmentProps: {
        canvasHeight: 103,
        canvasWidth: 82
    }
});
