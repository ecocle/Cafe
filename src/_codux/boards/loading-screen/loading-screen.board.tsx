import { createBoard } from '@wixc3/react-board';
import { LoadingScreen } from '../../../components/loading-screen/loading-screen';

export default createBoard({
    name: 'LoadingScreen',
    Board: () => <LoadingScreen />,
    isSnippet: true,
    environmentProps: {
        canvasHeight: 538,
        canvasWidth: 869
    }
});
