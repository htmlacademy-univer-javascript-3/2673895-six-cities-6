import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from '../pages/MainPage';
import { AppRoutes } from './AppRoutes';
import { OfferPage } from '../pages/OfferPage';
import { LoginPage } from '../pages/LoginPage';
import { Favourites } from '../pages/FavoritesPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import Layout from '../components/Layout';
import { PrivateRoute } from '../components/PrivateRoute';
import { Offer } from '../mocks/offers';

type AppProps = {
  offers: Offer[];
};

export function App({ offers }: AppProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<MainPage offers={offers} />} />
          <Route path={AppRoutes.Login} element={<LoginPage />} />
          <Route path={AppRoutes.Offer} element={<OfferPage offers={offers} />} />
          <Route
            path={AppRoutes.Favorites}
            element={
              <PrivateRoute>
                <Favourites offers={offers} />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>);
}
