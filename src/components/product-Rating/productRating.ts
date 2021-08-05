import { Product } from '../../shared/interfaces';
import { BaseComponent } from '../baseComponent';
import './productRating.scss';

const stars = {
  full: `
    url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvM\
    jAwMC9zdmcnIGZpdD0nJyBoZWlnaHQ9JzEwMCUnIHdpZHRoPScxMDAlJyBwcmVzZXJ2ZUFzcGV\
    jdFJhdGlvPSd4TWlkWU1pZCBtZWV0JyB2aWV3Qm94PScwIDAgMjQgMjQnPjxwYXRoIGZpbGw9J\
    yNmNmMzMmEnIGQ9J00xMiwxOC4zMjQgTDE5LjQxNiwyMi44IEwxNy40NDgsMTQuMzY0IEwyNCw\
    4LjY4OCBMMTUuMzcyLDcuOTU2IEwxMiwwIEw4LjYyOCw3Ljk1NiBMMCw4LjY4OCBMNi41NTIsM\
    TQuMzY0IEw0LjU4NCwyMi44IEwxMiwxOC4zMjQgTDEyLDE4LjMyNCBaJz48L3BhdGg+PC9zdmc+')
  `,
  half: `
    url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvM\
    jAwMC9zdmcnIGZpdD0nJyBoZWlnaHQ9JzEwMCUnIHdpZHRoPScxMDAlJyBwcmVzZXJ2ZUFzc\
    GVjdFJhdGlvPSd4TWlkWU1pZCBtZWV0JyB2aWV3Qm94PScwIDAgMjQgMjQnPjxwYXRoIGZpb\
    Gw9JyNmNmMzMmEnIGQ9J00yNCw5LjE4OCBMMTUuMzcyLDguNDQ0IEwxMiwwLjUgTDguNjI4L\
    DguNDU2IEwwLDkuMTg4IEw2LjU1MiwxNC44NjQgTDQuNTg0LDIzLjMgTDEyLDE4LjgyNCBMM\
    TkuNDE2LDIzLjMgTDE3LjQ2LDE0Ljg2NCBMMjQsOS4xODggTDI0LDkuMTg4IFogTTEyLDE2L\
    jU4IEwxMiw1LjQyIEwxNC4wNTIsMTAuMjY4IEwxOS4zMDgsMTAuNzI0IEwxNS4zMjQsMTQuM\
    TggTDE2LjUyNCwxOS4zMTYgTDEyLDE2LjU4IEwxMiwxNi41OCBaJz48L3BhdGg+PC9zdmc+')
  `,
  empty: `
    url('data:image/svg+xml;base64,PHN\
    2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIGZpdD0nJyBoZWlnaHQ9JzE\
    wMCUnIHdpZHRoPScxMDAlJyBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSd4TWlkWU1pZCBtZWV0JyB\
    2aWV3Qm94PScwIDAgMjQgMjQnPjxwYXRoIGZpbGw9JyNGNkMzMkEnIGQ9J00yNCw4LjY4OCB\
    MMTUuMzcyLDcuOTQ0IEwxMiwwIEw4LjYyOCw3Ljk1NiBMMCw4LjY4OCBMNi41NTIsMTQuMzY\
    0IEw0LjU4NCwyMi44IEwxMiwxOC4zMjQgTDE5LjQxNiwyMi44IEwxNy40NiwxNC4zNjQgTDI\
    0LDguNjg4IEwyNCw4LjY4OCBaIE03LjQ4OCwxOC44MDQgTDguNjg4LDEzLjY2OCBMNC43MDQ\
    sMTAuMjEyIEw5Ljk2LDkuNzU2IEwxMiw0LjkyIEwxNC4wNTIsOS43NjggTDE5LjMwOCwxMC4\
    yMjQgTDE1LjMyNCwxMy42OCBMMTYuNTI0LDE4LjgxNiBMMTIsMTYuMDggTDcuNDg4LDE4Ljg\
    wNCBMNy40ODgsMTguODA0IFonPjwvcGF0aD48L3N2Zz4=')
  `,
};

export class ProductRating extends BaseComponent {
  constructor(product: Product) {
    super('div', ['wg__product-info__rating-info']);

    this.render(product);
  }

  render(product: Product): void {
    const ratingWrapper = new BaseComponent('div', ['rating-info__wrapper']);

    const rating = new BaseComponent('p', ['rating-info__rating'], '', String(product.rating).replace('.', ','));

    const ratingStar = new BaseComponent('div', ['rating-info__rating-star']);

    let ratingRewiewsCount: BaseComponent = new BaseComponent();

    if (product.reviews_count) {
      ratingRewiewsCount = new BaseComponent(
        'p',
        ['rating-info__rew-count'],
        '',
        `На основе ${product.reviews_count} оценок.`,
      );
    }

    this.element.append(ratingWrapper.element, ratingRewiewsCount.element);

    ratingWrapper.element.append(rating.element, ratingStar.element);

    const notEnoughMaxRating = Math.abs(+(Number(product.rating) - 5).toFixed(1));

    const countOfFullStars = 5 - Math.ceil(notEnoughMaxRating);

    const counOfHalfStars = Math.ceil(notEnoughMaxRating) - notEnoughMaxRating;

    const counOfEmptyStars = 5 - (countOfFullStars + Math.ceil(counOfHalfStars));

    for (let i = 0; i < countOfFullStars; i++) {
      const star = new BaseComponent('div', ['star']);
      star.element.style.backgroundImage = stars.full;
      ratingStar.element.append(star.element);
    }

    if (counOfHalfStars > 0) {
      const star = new BaseComponent('div', ['star']);
      star.element.style.backgroundImage = stars.half;
      ratingStar.element.append(star.element);
    }

    for (let i = 0; i < counOfEmptyStars; i++) {
      const star = new BaseComponent('div', ['star']);
      star.element.style.backgroundImage = stars.empty;
      ratingStar.element.append(star.element);
    }
  }
}
