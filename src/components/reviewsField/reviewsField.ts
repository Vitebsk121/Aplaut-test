import { ReviewData } from '../../shared/interfaces';
import { BaseComponent } from '../baseComponent';
import { Review } from '../review/review';
import './reviewsField.scss';

export class ReviewsField extends BaseComponent {
    constructor(reviews: ReviewData[]) {
        super('div', ['rv-field']);

        this.render(reviews)
    }

    render(reviews: ReviewData[]) {
        for(let i = 0; i < reviews.length; i++) {
            const review = new Review(reviews[i]);
            this.element.append(review.element);
        }
    }
}