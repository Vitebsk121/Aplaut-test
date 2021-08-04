import './widget.scss';

import { BaseComponent } from '../baseComponent';
import { ProductInfo } from '../product-Info/productInfo';
import { getWidgetData } from '../../shared/server';

export class Widget {
  private widget: BaseComponent;

  constructor(rootElement: HTMLElement) {
    this.widget = new BaseComponent('div', ['wg-wrapper']);

    getWidgetData().then((data) => {
      this.render(rootElement, data);
    });
  }

  render(rootElement: HTMLElement, data: { [key: string]: Widget; }[]): void {
    const productInfo = new ProductInfo(Object(data).product);

    rootElement.append(this.widget.element);

    this.widget.element.append(productInfo.element);
  }
}
