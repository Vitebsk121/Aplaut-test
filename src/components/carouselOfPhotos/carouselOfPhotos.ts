import { Product, ReviewData, Review_photos } from '../../shared/interfaces';
import { BaseComponent } from '../baseComponent';
import './carouselOfPhotos.scss';

export class CarouselOfPhotos extends BaseComponent {

  private addPhoto: BaseComponent | null;

  constructor( mode: string = '', product: Product) {


    super('div', ['product-info__photos']);

    this.addPhoto = null;

    if (mode === 'product') {
      if(product.review_photos.length === 0) return;
      this.addPhoto = new BaseComponent('div', ['photos__add-new-ph']);
      this.render(mode, product.review_photos);
    } else {
      if(product.photos.length === 0) return;
      this.render(mode, product.photos);
    }
  }

  render(mode: string, reviews_photos: Review_photos[]) {

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

    for(let i = 0; i < reviews_photos.length; i++) {
      console.log(mode, reviews_photos[i].url_thumb);
      const productPhotoThumb = new BaseComponent('div', ['photo-cards__product-pic']);

      productPhotoThumb.element.style.backgroundImage = `url('${reviews_photos[i].url_thumb}')`;
      productPhotoThumb.element.addEventListener('click', () => {window.open(reviews_photos[i].url_original)})

      reviewsPhotos.element.append(productPhotoThumb.element);

    }

    setTimeout(() => {
      let positionOfGalary = 0;
      let shiftX = 110;
      let positionOnPx = 0;

      setInterval(() => {
        const cardPicShow = reviewsPhotoCarousel.element.offsetWidth;
        
        if(positionOfGalary === 0 ) {
          carouselBtnLeft.element.style.display = 'none';
        } else {
          carouselBtnLeft.element.style.display = 'block';
        };

        if (positionOfGalary >= reviews_photos.length - Math.floor(cardPicShow / shiftX)) {
          carouselBtnRight.element.style.display = 'none';
        } else {
          carouselBtnRight.element.style.display = 'block';
        }
      }, 100);

      carouselBtnLeft.element.addEventListener('click', () => {
        positionOfGalary += -1;
        positionOnPx = positionOfGalary * shiftX;
        reviewsPhotos.element.style.left = `${positionOnPx * -1}px`;
      });
  
  
      carouselBtnRight.element.addEventListener('click', () => {
        positionOfGalary += 1;
        positionOnPx = positionOfGalary * shiftX;
        reviewsPhotos.element.style.left = `${positionOnPx * -1}px`;
      });
    }, 100);
  }
}
