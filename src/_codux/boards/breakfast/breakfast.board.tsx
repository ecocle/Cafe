import { createBoard } from '@wixc3/react-board';
import { Breakfast } from '../../../components/breakfast/breakfast';

export default createBoard({
    name: 'Breakfast',
    Board: () => <Breakfast Name={''} Price={0} />,
    isSnippet: true,
    environmentProps: {
        canvasWidth: 766,
        canvasHeight: 498
    }
});
