import { Provider } from 'react-redux';
import { Container } from './Container';
import { store } from '../index.js';
export { App };

//Parent component with redux provider
const App = () => {
    return (
        <Provider store={store}>
        <div>
            <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet" />
            <Container store={store} />
        </div>
        </Provider>
    );
}