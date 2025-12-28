import { memo } from 'react';
import { ReviewItem } from './ReviewItem';
import { Review } from '../types/review';

type ReviewsListProps = {
  reviews: Review[];
  isLoading?: boolean;
};

function ReviewsListComponent({ reviews, isLoading }: ReviewsListProps) {
  if (isLoading) {
    return (
      <>
        <h2 className="reviews__title">
          Reviews · <span className="reviews__amount">0</span>
        </h2>
        <p>Loading reviews...</p>
      </>
    );
  }

  return (
    <>
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </ul>
    </>
  );
}

export const ReviewsList = memo(ReviewsListComponent);

