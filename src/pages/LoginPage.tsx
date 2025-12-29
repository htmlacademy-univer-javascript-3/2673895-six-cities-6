import { useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAndFetchFavorites } from '../store/actions';
import { AppDispatch } from '../store';
import { AppRoutes } from '../App/AppRoutes';
import { getAuthorizationStatus } from '../store/selectors';

export function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const authStatus = useSelector(getAuthorizationStatus);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authStatus === 'AUTH') {
      navigate(AppRoutes.Main);
    }
  }, [authStatus, navigate]);

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim() || password.includes(' ')) {
      setError('Please enter valid email and password (password cannot contain spaces)');
      return;
    }

    try {
      await dispatch(loginAndFetchFavorites(email, password));
      navigate(AppRoutes.Main);
    } catch (err) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosError = err as { response?: { status?: number; data?: { error?: string } } };
        if (axiosError.response?.status === 400) {
          setError(axiosError.response.data?.error || 'Invalid email or password');
        } else {
          setError('Failed to login. Please try again.');
        }
      } else {
        setError('Failed to login. Please try again.');
      }
    }
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    handleSubmit(event).catch(() => {
      // Error is already handled in handleSubmit
    });
  };

  return (
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
          <form className="login__form form" action="#" method="post" onSubmit={handleFormSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
              <input
                className="login__input form__input"
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
              <input
                className="login__input form__input"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                  required
                />
            </div>
            {error && (
              <div style={{ color: 'red', marginBottom: '10px' }}>
                {error}
              </div>
            )}
            <button className="login__submit form__submit button" type="submit">
              Sign in
            </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
  );
}
