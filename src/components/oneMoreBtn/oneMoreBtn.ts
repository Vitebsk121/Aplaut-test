import { WidgetData } from '../../shared/interfaces';
import { getCurrentUrl, getWidgetData } from '../../shared/server';
import { getCurrentCountOfReviewsOnPage, getCurrentSort, renderNewReviewsWithSort } from '../../shared/servise';
import { BaseComponent } from '../baseComponent';
import './oneMoreBtn.scss';

export class OneMoreBtn extends BaseComponent {
  constructor(mode: string, styles: string[], data: WidgetData) {
    super('button', styles);

    this.render(mode, Object(data));
  }

  textHandle(data: WidgetData): void {
    const reviewsCount = data.meta.per_page * data.meta.total_pages;

    const currentReviewsCount = data.meta.per_page;

    if ((reviewsCount - currentReviewsCount) <= 0) {
      this.element.style.display = 'none';
    }

    this.element.innerText = `Загрузить еще 8 отзывов из ${reviewsCount - currentReviewsCount}`;
  }

  render(mode: string, data: WidgetData): void {
    if (mode === 'reviews') {
      this.textHandle(data);

      this.element.addEventListener('click', () => {
        renderNewReviewsWithSort(getCurrentSort(), (getCurrentCountOfReviewsOnPage() + 8));
        getWidgetData(getCurrentUrl()).then((response) => {
          this.textHandle(Object(response));
        });
      });
    }
  }
}
