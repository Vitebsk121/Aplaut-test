import { Product } from '../../shared/interfaces';
import { BaseComponent } from '../baseComponent';
import { CarouselOfPhotos } from '../carouselOfPhotos/carouselOfPhotos';
import { ProductRating } from '../product-Rating/productRating';
import './productInfo.scss';

export class ProductInfo extends BaseComponent {

  constructor(product: Product) {
    super('div', ['wg__product-info']);

    this.render(product);
  }

  render(product: Product): void {
    const productHeader = new BaseComponent('div', ['product-info__header']);

    const productRating = new ProductRating(product);

    const addNewReviewBtn = new BaseComponent('button', ['wg__new-review-btn'], 'new-review-btn', 'Написать отзыв');

    const carouselOfPhotos = new CarouselOfPhotos('product', product)

    const ratingDetails = new BaseComponent('div', ['product-info__details']);

    const ratingDetailsTitle = new BaseComponent('p', ['product-info__details__title'], '', 'Отзывы, в которых упоминается');

    const ratingDetailsReviewsTitle = new BaseComponent('div', ['product-info__details__reviews-titles']);

    this.element.append(productHeader.element, carouselOfPhotos.element, ratingDetails.element);

    productHeader.element.append(productRating.element, addNewReviewBtn.element);

    ratingDetails.element.append(ratingDetailsTitle.element, ratingDetailsReviewsTitle.element);
    
    for(let i = 0; i < product.rating_details.length; i++) {

      const mostPopularReviewsTitle = new BaseComponent('p', ['reviews-titles__title'], '', product.rating_details[i].label);

      ratingDetailsReviewsTitle.element.append(mostPopularReviewsTitle.element);
    }
  }
}
