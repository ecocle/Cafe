import { createBoard } from '@wixc3/react-board';
import { Breakfast } from '../../../components/breakfast/breakfast';

export default createBoard({
    name: 'Breakfast',
    Board: () => <Breakfast />,
    isSnippet: true,
    environmentProps: {
        canvasWidth: 404,
        canvasHeight: 310
    }
});
