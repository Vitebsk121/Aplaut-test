import { OneMoreBtn } from '../components/oneMoreBtn/oneMoreBtn';
import { ReviewsField } from '../components/reviewsField/reviewsField';
import { getWidgetData } from './server';

let currentCountOfReviewsOnPage = 8;
let currentSort = 'new';

export function setBeckgroundColor(): string {
  const colors = [
    'rgba(131, 182, 53, 0.5)',
    'rgba(53, 182, 57, 0.5)',
    'rgba(53, 133, 182, 0.5)',
    'rgba(139, 53, 182, 0.5)',
  ];

  const rand = Math.floor(Math.random() * colors.length);

  return colors[rand];
}

export function renderNewReviewsWithSort(
  sortParamSettings: string = currentSort,
  perPageSettings: number = 8,
): void {
  currentCountOfReviewsOnPage = perPageSettings;
  currentSort = sortParamSettings;

  if (sortParamSettings === 'new') {
    getWidgetData(['page=1', `per_page=${perPageSettings}`, 'sort=published_at:desc']).then((data) => {
      const newReviewsField = new ReviewsField(Object(data).reviews);
      const oldReviewsField = document.querySelector('.rv-field');
      const oldBtn = document.querySelector('.wg__one-more-btn');
      const newBtn = new OneMoreBtn('reviews', ['wg__one-more-btn'], Object(data));
      oldReviewsField?.replaceWith(newReviewsField.element);
      oldBtn?.replaceWith(newBtn.element);
    });
  }

  if (sortParamSettings === 'old') {
    getWidgetData(['page=1', `per_page=${perPageSettings}`, 'sort=published_at:asc']).then((data) => {
      const newReviewsField = new ReviewsField(Object(data).reviews);
      const oldReviewsField = document.querySelector('.rv-field');
      const oldBtn = document.querySelector('.wg__one-more-btn');
      const newBtn = new OneMoreBtn('reviews', ['wg__one-more-btn'], Object(data));
      oldReviewsField?.replaceWith(newReviewsField.element);
      oldBtn?.replaceWith(newBtn.element);
    });
  }

  if (sortParamSettings === 'withPhoto') {
    getWidgetData([
      'page=1',
      `per_page=${perPageSettings}`,
      'sort=published_at:desc',
      'filter=photos_count:gte:1',
    ]).then((data) => {
      const newReviewsField = new ReviewsField(Object(data).reviews);
      const oldReviewsField = document.querySelector('.rv-field');
      const oldBtn = document.querySelector('.wg__one-more-btn');
      const newBtn = new OneMoreBtn('reviews', ['wg__one-more-btn'], Object(data));
      oldReviewsField?.replaceWith(newReviewsField.element);
      oldBtn?.replaceWith(newBtn.element);
    });
  }
}

export function getCurrentCountOfReviewsOnPage(): number {
  const result = currentCountOfReviewsOnPage;
  return result;
}

export function getCurrentSort(): string {
  const result = currentSort;
  return result;
}
