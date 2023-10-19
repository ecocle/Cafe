import { createBoard } from '@wixc3/react-board';
import { CaffeineFree } from '../../../components/caffeine-free/caffeine-free';

export default createBoard({
    name: 'CaffeineFree',
    Board: () => <CaffeineFree Name={''} Price={0} userData={null} selectedLanguage={""} />,
    isSnippet: true,
    environmentProps: {
        canvasWidth: 102,
        canvasHeight: 108
    }
});
