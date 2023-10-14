import { createBoard } from '@wixc3/react-board';
import { ViewOrders } from '../../../components/view-orders/view-orders';

export default createBoard({
    name: 'ViewOrders',
    Board: () => <ViewOrders />,
    isSnippet: true,
    environmentProps: {
        canvasWidth: 1121,
        canvasHeight: 336
    }
});
