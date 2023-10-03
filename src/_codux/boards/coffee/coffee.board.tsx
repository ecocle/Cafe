import { createBoard } from '@wixc3/react-board';
import { Coffee } from '../../../components/coffee/coffee';

export default createBoard({
    name: 'Coffee',
    Board: () => <Coffee />,
    isSnippet: true,
    environmentProps: {
        canvasHeight: 259,
        canvasWidth: 298
    }
});
