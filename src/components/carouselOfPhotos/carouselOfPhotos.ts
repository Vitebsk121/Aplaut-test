import { Product } from '../../shared/interfaces';
import { BaseComponent } from '../baseComponent';
import './carouselOfPhotos.scss';

export class CarouselOfPhotos extends BaseComponent {

  private addPhoto: BaseComponent | null;

  constructor( mode: string = '', product: Product) {

    const arrOfPhoto = product.review_photos;

    super('div', ['product-info__photos']);

    console.log(arrOfPhoto)

    this.addPhoto = null;

    if (mode === 'product') {
      this.addPhoto = new BaseComponent('div', ['photos__add-new-ph']);
    }

    this.render(product.review_photos);
  }

  render(reviews_photos: { [key: string]: string; }[]) {

    const reviewsPhotoCarousel = new BaseComponent('div', ['product-info__reviews-ph-carousel']);

    const carouselBtnLeft = new BaseComponent('button', ['reviews-photo-carousel__btn', 'left']);

    const carouselBtnRight = new BaseComponent('button', ['reviews-photo-carousel__btn', 'right']);

    const reviewsPhotos = new BaseComponent('div', ['product-info__gallery']);

    

    if (this.addPhoto) {
      this.element.append(this.addPhoto.element, reviewsPhotoCarousel.element);
    } else {
      this.element.append(reviewsPhotoCarousel.element);
    }

    reviewsPhotoCarousel.element.append(carouselBtnLeft.element, reviewsPhotos.element, carouselBtnRight.element);

    console.log(reviews_photos[1].url_thumb);

    for(let i = 0; i < reviews_photos.length; i++) {

      const productPhotoThumb = new BaseComponent('div', ['photo-cards__product-pic']);

      productPhotoThumb.element.style.backgroundImage = `url('${reviews_photos[i].url_thumb}')`;
      productPhotoThumb.element.addEventListener('click', () => {window.open(reviews_photos[i].url_original)})

      reviewsPhotos.element.append(productPhotoThumb.element);

    }

    let positionOfGalary = 0;
    let shiftX = 110;
    let positionOnPx = 0;


    carouselBtnLeft.element.addEventListener('click', () => {
      if(positionOfGalary === 0 ) return;
      positionOfGalary += -1;
      positionOnPx = positionOfGalary * shiftX;
      reviewsPhotos.element.style.left = `${positionOnPx * -1}px`;
    });


    carouselBtnRight.element.addEventListener('click', () => {
      const cardPicShow = reviewsPhotoCarousel.element.offsetWidth;
      if (positionOfGalary >= reviews_photos.length - Math.floor(cardPicShow / shiftX)) return;
      positionOfGalary += 1;
      positionOnPx = positionOfGalary * shiftX;
      reviewsPhotos.element.style.left = `${positionOnPx * -1}px`;
    });
  }
}
