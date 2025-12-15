import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from '../pages/MainPage';
import { AppRoutes } from './AppRoutes';
import { OfferPage } from '../pages/OfferPage';
import { LoginPage } from '../pages/LoginPage';
import { Favourites } from '../pages/FavoritesPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import Layout from '../components/Layout';
import { PrivateRoute } from '../components/PrivateRoute';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<MainPage offerCardsCount={5} />} />
          <Route path={AppRoutes.Login} element={<LoginPage />} />
          <Route path={AppRoutes.Offer} element={<OfferPage />} />
          <Route
            path={AppRoutes.Favorites}
            element={
              <PrivateRoute>
                <Favourites />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>);
}
