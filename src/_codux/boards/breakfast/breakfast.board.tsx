import { createBoard } from '@wixc3/react-board';
import { Breakfast } from '../../../components/breakfast/breakfast';

export default createBoard({
    name: 'Breakfast',
    Board: () => <Breakfast Name={''} Price={0} userData={null} selectedLanguage={""} />,
    isSnippet: true,
    environmentProps: {
        canvasWidth: 100,
        canvasHeight: 128
    }
});
