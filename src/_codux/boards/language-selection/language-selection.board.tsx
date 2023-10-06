import { createBoard } from '@wixc3/react-board';
import { LanguageSelection } from '../../../components/language-selection/language-selection';

export default createBoard({
    name: 'LanguageSelection',
    Board: () => <LanguageSelection />,
    isSnippet: true,
    environmentProps: {
        canvasWidth: 413,
        canvasHeight: 290
    }
});
