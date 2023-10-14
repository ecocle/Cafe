import { createBoard } from '@wixc3/react-board';
import { ViewOrdersNormal } from '../../../components/view-orders-normal/view-orders-normal';

export default createBoard({
    name: 'ViewOrdersNormal',
    Board: () => <ViewOrdersNormal />,
    isSnippet: true,
});
