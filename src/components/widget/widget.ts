import './widget.scss';

import { BaseComponent } from '../baseComponent';
import { ProductInfo } from '../product-Info/productInfo';
import { getWidgetData } from '../../shared/server';
import { ReviewsField } from '../reviewsField/reviewsField';

export class Widget {
  private widget: BaseComponent;

  private reviewsField!: ReviewsField;

  constructor(rootElement: HTMLElement) {
    this.widget = new BaseComponent('div', ['wg-wrapper']);

    getWidgetData(['page=1', 'per_page=8']).then((data) => {
      this.render(rootElement, data);
    });
  }

  sortHandle(event: Event) {

    const sortParam = (<HTMLSelectElement>event.target).value

    console.log(sortParam);

    if (sortParam === 'new') {
      console.log
      getWidgetData(['page=1', 'per_page=8', 'sort=published_at:desc']).then((data) => {
        const newReviewsField = new ReviewsField(Object(data).reviews);
        const oldReviewsField = document.querySelector('.rv-field');
        oldReviewsField?.replaceWith(newReviewsField.element);
      });
    }

    if (sortParam === 'old') {
      getWidgetData(['page=1', 'per_page=8', 'sort=published_at:asc']).then((data) => {
        const newReviewsField = new ReviewsField(Object(data).reviews);
        const oldReviewsField = document.querySelector('.rv-field');
        oldReviewsField?.replaceWith(newReviewsField.element);
      });
    }

    if (sortParam === 'withPhoto') {
      getWidgetData(['page=1', 'per_page=8', 'sort=published_at:desc', 'filter=photos_count:gte:1']).then((data) => {
        const newReviewsField = new ReviewsField(Object(data).reviews);
        const oldReviewsField = document.querySelector('.rv-field');
        oldReviewsField?.replaceWith(newReviewsField.element);
      });
    }

  }

  render(rootElement: HTMLElement, data: Widget): void {
    const productInfo = new ProductInfo(Object(data).product);

    this.reviewsField = new ReviewsField(Object(data).reviews);

    const sortList = new BaseComponent('select', ['wg__sort-list']);
    sortList.element.setAttribute('name', 'sortList');
    const option1 = new Option('Сначала последние', 'new', false, true);
    const option2 = new Option('Сначала самые ранние', 'old', false, false);
    const option3 = new Option('Только с фотографиями', 'withPhoto', false, false);
    sortList.element.append(option1, option2, option3);
    sortList.element.addEventListener('change', (e) => this.sortHandle(e));

    rootElement.append(this.widget.element);

    this.widget.element.append(
      productInfo.element, 
      sortList.element, 
      this.reviewsField.element
    );
  }
}
