import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './App/App';
import { store } from './store';
import { fetchOffers, checkAuth, fetchFavorites } from './store/actions';
import 'leaflet/dist/leaflet.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

void store.dispatch(checkAuth()).then(() => {
  void store.dispatch(fetchFavorites());
});
void store.dispatch(fetchOffers());

root.render(
  <Provider store={store}>
  <App />
  </Provider>
);
