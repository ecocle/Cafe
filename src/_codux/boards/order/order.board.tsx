import { createBoard } from '@wixc3/react-board';
import { Order } from '../../../components/order/order';

function close() {
    console.log("test");
}
export default createBoard({
    name: 'Order',
    Board: () => <Order isOpen onClose={close} name={''} originalPrice={0}  userData={null} selectedLanguage={""}/>,
    isSnippet: true,
    environmentProps: {
        canvasWidth: 656,
        canvasHeight: 362
    }
});
