import { createBoard } from '@wixc3/react-board';
import { CaffeineFree } from '../../../components/caffeine-free/caffeine-free';

export default createBoard({
    name: 'CaffeineFree',
    Board: () => <CaffeineFree />,
    isSnippet: true,
    environmentProps: {
        canvasWidth: 314,
        canvasHeight: 252
    }
});
