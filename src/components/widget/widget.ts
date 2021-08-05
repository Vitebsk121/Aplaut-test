import './widget.scss';

import { BaseComponent } from '../baseComponent';
import { ProductInfo } from '../product-Info/productInfo';
import { getWidgetData } from '../../shared/server';
import { ReviewsField } from '../reviewsField/reviewsField';
import { OneMoreBtn } from '../oneMoreBtn/oneMoreBtn';
import { WidgetData } from '../../shared/interfaces';
import { renderNewReviewsWithSort } from '../../shared/servise';

export class Widget {
  private widget: BaseComponent;

  private reviewsField!: ReviewsField;

  constructor(rootElement: HTMLElement) {
    this.widget = new BaseComponent('div', ['wg-wrapper']);

    getWidgetData(['page=1', 'per_page=8']).then((data) => {
      this.render(rootElement, Object(data));
    });
  }

  addSettingsToSelect(sortList: BaseComponent, data: WidgetData): void {
    sortList.element.setAttribute('name', 'sortList');
    const option1 = new Option('Сначала последние', 'new', false, true);
    const option2 = new Option('Сначала самые ранние', 'old', false, false);
    const option3 = new Option('Только с фотографиями', 'withPhoto', false, false);
    sortList.element.append(option1, option2, option3);

    sortList.element.addEventListener('change', (e: Event) => {
      renderNewReviewsWithSort((<HTMLSelectElement>e.target).value);
    });
  }

  render(rootElement: HTMLElement, data: WidgetData): void {
    const productInfo = new ProductInfo(data.product);

    this.reviewsField = new ReviewsField(data.reviews);

    const sortList = new BaseComponent('select', ['wg__sort-list']);

    const oneMoreBtn = new OneMoreBtn('reviews', ['wg__one-more-btn'], data);

    rootElement.append(this.widget.element);

    this.widget.element.append(
      productInfo.element,
      sortList.element,
      this.reviewsField.element,
      oneMoreBtn.element,
    );

    this.addSettingsToSelect(sortList, data);
  }
}
