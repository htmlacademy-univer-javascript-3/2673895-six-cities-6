import cn from 'classnames';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppRoutes } from '../App/AppRoutes';
import { getAuthorizationStatus, getUser, getFavoriteCount } from '../store/selectors';
import { logout } from '../store/actions';

export default function Layout() {
  const location = useLocation();
  const dispatch = useDispatch();
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const user = useSelector(getUser);
  const favoriteCount = useSelector(getFavoriteCount);
  const isLoginPage = location.pathname === AppRoutes.Login;
  const isAuthorized = authorizationStatus === 'AUTH';

  const pageClasses = cn('page', {
    'page--gray page--main': location.pathname === AppRoutes.Main,
    'page--gray page--login': isLoginPage
  });

  const handleSignOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <div className={pageClasses}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link 
                className={cn('header__logo-link', {
                  'header__logo-link--active': location.pathname === AppRoutes.Main
                })}
                to={AppRoutes.Main}
              >
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </Link>
            </div>
            {!isLoginPage && (
            <nav className="header__nav">
              <ul className="header__nav-list">
                  {isAuthorized && user ? (
                    <>
                <li className="header__nav-item user">
                        <Link
                    className="header__nav-link header__nav-link--profile"
                          to={AppRoutes.Favorites}
                  >
                          <div className="header__avatar-wrapper user__avatar-wrapper">
                            <img
                              src={user.avatarUrl}
                              alt={user.name}
                              style={{ borderRadius: '50%' }}
                            />
                          </div>
                    <span className="header__user-name user__name">
                            {user.email}
                    </span>
                          {favoriteCount > 0 && (
                            <span className="header__favorite-count">{favoriteCount}</span>
                          )}
                        </Link>
                </li>
                <li className="header__nav-item">
                        <a className="header__nav-link" href="#" onClick={handleSignOut}>
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
                    </>
                  ) : (
                    <li className="header__nav-item">
                      <Link className="header__nav-link" to={AppRoutes.Login}>
                        <span className="header__login">Sign in</span>
                      </Link>
                    </li>
                  )}
              </ul>
            </nav>
            )}
          </div>
        </div>
      </header>
      <Outlet />
    </div>);
}
