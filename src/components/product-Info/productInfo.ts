import { BaseComponent } from '../baseComponent';
import { ProductRating } from '../product-Rating/productRating';
import './productInfo.scss';

export class ProductInfo extends BaseComponent {

    private productRating: ProductRating;

    constructor(product: { [key: string]: string }) {
        super('div', ['wg__product-info']);

        this.productRating = new ProductRating(product);

        this.render();
    }

    render() {

        const productHeader = new BaseComponent('div', ['product-info__header']);

        this.element.append(productHeader.element);

        productHeader.element.append(this.productRating.element);

    }
}