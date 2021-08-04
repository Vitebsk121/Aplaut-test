import { ReviewData } from '../../shared/interfaces';
import { Author } from '../author/author';
import { BaseComponent } from '../baseComponent';
import { CarouselOfPhotos } from '../carouselOfPhotos/carouselOfPhotos';
import './review.scss';

export class Review extends BaseComponent {
    constructor(review: ReviewData) {
        super('div', ['rv-field__rv']);

    
        this.render(review)
    }

    render(review: ReviewData) {
        
        const author = new Author(review);

        const reviewMessage = new BaseComponent('p', ['rv__message'], '', review.body);

        const reviewPros = new BaseComponent('p', ['rv__pros'], '', `Достоинства: ${review.pros}`);

        const reviewCons = new BaseComponent('p', ['rv__pros'], '', `Недостатки: ${review.cons}`);

        const reviewGallery = new CarouselOfPhotos('', review);

        this.element.append(author.element, reviewMessage.element, reviewPros.element, reviewCons.element, reviewGallery.element);

        if(review.pros === null) reviewPros.element.style.display = 'none';
        if(review.cons === null) reviewCons.element.style.display = 'none';
    }
}