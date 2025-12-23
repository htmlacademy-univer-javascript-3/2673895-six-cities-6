import { Link } from 'react-router-dom';
import { AppRoutes } from '../App/AppRoutes';

export function NotFoundPage() {
  return (
    <main className="page__main page__main--404">
      <div className="container">
        <section className="not-found">
          <h1 className="not-found__title">404</h1>
          <h2 className="not-found__subtitle">Page Not Found</h2>
          <p className="not-found__text">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link to={AppRoutes.Main} className="not-found__link button">
            Go to main page
          </Link>
        </section>
      </div>
    </main>
  );
}

