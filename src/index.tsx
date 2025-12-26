import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './App/App';
import { store } from './store';
import { loadOffers } from './store/actions';
import { mockOffers } from './mocks/offers';
import 'leaflet/dist/leaflet.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Загружаем предложения в store при инициализации
store.dispatch(loadOffers(mockOffers));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
