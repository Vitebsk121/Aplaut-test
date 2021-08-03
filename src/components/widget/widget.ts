import './widget.scss';

import { BaseComponent } from '../baseComponent';
import { ProductInfo } from '../product-Info/productInfo';
import { getWidgetData } from '../../shared/server';

export class Widget {

    constructor(rootElement: HTMLElement) {

          getWidgetData().then((data) => {
            this.render(rootElement, data);
          })
    }


    render(rootElement: HTMLElement, data: { [key: string]: string; }[]) {

        console.log(Object(data).product);

        const widget = new BaseComponent('div', ['wg-wrapper']);

        const productInfo = new ProductInfo(Object(data).product);

        rootElement.append(widget.element);

        widget.element.append(productInfo.element);


    }
}