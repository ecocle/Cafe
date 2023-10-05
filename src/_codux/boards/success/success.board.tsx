import { createBoard } from '@wixc3/react-board';
import { Success } from '../../../components/success/success';
import { MouseEvent } from 'react';

function close() {
  console.log("Closed");
}

export default createBoard({
    name: 'Success',
    Board: () => <Success isOrdered={false}  onClose={close}/>,
    isSnippet: true,
    environmentProps: {
        canvasHeight: 388,
        canvasWidth: 644
    }
});
