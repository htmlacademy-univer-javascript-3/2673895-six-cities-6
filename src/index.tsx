import ReactDOM from 'react-dom/client';
import { App } from './App/App';
import { mockOffers } from './mocks/offers';
import 'leaflet/dist/leaflet.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <App offers={mockOffers} />
);
