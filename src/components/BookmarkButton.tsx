import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { getAuthorizationStatus } from '../store/selectors';
import { toggleFavorite } from '../store/actions';
import { AppDispatch } from '../store';
import { AppRoutes } from '../App/AppRoutes';

type BookmarkButtonProps = {
  isFavourite: boolean;
  offerId: string;
  className?: string;
  iconWidth?: number;
  iconHeight?: number;
};

export function BookmarkButton({ 
  isFavourite, 
  offerId, 
  className = 'place-card__bookmark-button',
  iconWidth = 18,
  iconHeight = 19
}: BookmarkButtonProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const isAuthorized = authorizationStatus === 'AUTH';

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthorized) {
      navigate(AppRoutes.Login);
      return;
    }

    dispatch(toggleFavorite(offerId, isFavourite));
  }, [dispatch, offerId, isFavourite, isAuthorized, navigate]);

  const buttonDesc = isFavourite ? 'In bookmarks' : 'To bookmarks';

  return (
    <button
      className={cn('button', className, { [`${className}--active`]: isFavourite })}
      type="button"
      onClick={handleClick}
    >
      <svg
        className="place-card__bookmark-icon"
        width={iconWidth}
        height={iconHeight}
      >
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">{buttonDesc}</span>
    </button>
  );
}
