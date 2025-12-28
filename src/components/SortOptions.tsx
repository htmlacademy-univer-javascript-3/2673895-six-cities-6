import { useState, memo, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSortType } from '../store/actions';
import { getSortType } from '../store/selectors';
import { SortType } from '../store/reducer';
import cn from 'classnames';

const sortOptions: SortType[] = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first'
];

function SortOptionsComponent() {
  const dispatch = useDispatch();
  const currentSortType = useSelector(getSortType);
  const [isOpen, setIsOpen] = useState(false);

  const handleSortClick = useCallback((sortType: SortType) => {
    dispatch(changeSortType(sortType));
    setIsOpen(false);
  }, [dispatch]);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const optionsClassName = useMemo(() => cn('places__options', 'places__options--custom', { 'places__options--opened': isOpen }), [isOpen]);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={toggleOpen}
      >
        {currentSortType}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={optionsClassName}>
        {sortOptions.map((option) => (
          <li
            key={option}
            className={cn('places__option', {
              'places__option--active': option === currentSortType
            })}
            tabIndex={0}
            onClick={() => handleSortClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}

export const SortOptions = memo(SortOptionsComponent);

