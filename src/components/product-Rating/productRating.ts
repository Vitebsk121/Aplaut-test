import { BaseComponent } from '../baseComponent';
import './productRating.scss';

export class ProductRating extends BaseComponent {
    constructor(product: { [key: string]: string; }) {
        super('div', ['wg__product-info__rating-info']);

        this.render(product);
    }

    render(product: { [key: string]: string; }) {

        const ratingNum = Number(product.rating).toFixed(0);

        const ratingWrapper = new BaseComponent('div', ['rating-info__wrapper']);

        const rating = new BaseComponent('p', ['rating-info__rating'], '', String(product.rating).replace('.', ','));

        const ratingStar = new BaseComponent('div', ['rating-info__rating-star']);

        const ratingRewiewsCount = new BaseComponent('p', ['rating-info__rew-count'], '', `На основе ${product.reviews_count} оценок.`)

        this.element.append(ratingWrapper.element, ratingRewiewsCount.element);

        ratingWrapper.element.append(rating.element, ratingStar.element);

        for( let i = 0; i < +ratingNum; i++) {
            // TODO завтра начать с добавления неактивной звезды!
            const star = new BaseComponent('div', ['star']);

            ratingStar.element.append(star.element);
        };




    }
}