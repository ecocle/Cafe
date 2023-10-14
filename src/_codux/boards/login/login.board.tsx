import { createBoard } from '@wixc3/react-board';
import { Login } from '../../../components/login/login';

function log() {
    console.log("login")
}

export default createBoard({
    name: 'Login',
    Board: () => <Login onLoginSuccess={log} onClose={log} />,
    isSnippet: true,
    environmentProps: {
        canvasHeight: 290,
        canvasWidth: 347
    }
});
