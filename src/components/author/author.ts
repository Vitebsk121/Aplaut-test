import { ReviewData } from '../../shared/interfaces';
import { setBeckgroundColor } from '../../shared/servise';
import { BaseComponent } from '../baseComponent';
import { ProductRating } from '../product-Rating/productRating';
import './author.scss';

export class Author extends BaseComponent {
  constructor(review: ReviewData) {
    super('div', ['rv__author']);

    this.render(review);
  }


  render(review: ReviewData): void {
    const authorAvatar = new BaseComponent('div', ['author-avatar'], '', review.author.initials);
    authorAvatar.element.style.backgroundColor = setBeckgroundColor();

    if (review.author.avatar_url) {
      authorAvatar.element.style.backgroundImage = `url(${review.author.avatar_url})`;
    }

    const timeUsageNum = review.author.details;

    let numOfArrDetails = 1;

    const authorDetails = new BaseComponent('div', ['author-details'], '');

    const authorName = new BaseComponent('p', ['author-details__name'], '', review.author.name);

    const authorRatingAndTimeUsage = new BaseComponent('div', ['author-details__rating-time-usage']);

    const ratingByUser = new ProductRating(review);

    const verifiedAndPostData = new BaseComponent('div', ['author-details__post-info']);

    const verifiedAuthor = new BaseComponent('p', ['post-info__verified'], '', 'Проверенный покупатель');

    const postDate = new BaseComponent(
      'p',
      ['post-info__date'],
      '',
      `${new Date(Date.parse(review.published_at))
        .toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}`,
    );

    this.element.append(authorAvatar.element, authorDetails.element);

    authorDetails.element.append(authorName.element, authorRatingAndTimeUsage.element, verifiedAndPostData.element);

    let timeUsage = new BaseComponent('p', ['author-details__time-usage'], '', 'Опыт использования не указан');

    if (timeUsageNum !== null) {
      if (timeUsageNum.length < 2) numOfArrDetails = 0;
      timeUsage = new BaseComponent(
        'p',
        ['author-details__time-usage'],
        '',
        `Опыт использования ${timeUsageNum[numOfArrDetails].value}`,
      );
    }

    authorRatingAndTimeUsage.element.append(ratingByUser.element, timeUsage.element);

    if (!review.is_verified) {
      verifiedAuthor.element.style.display = 'none';
    }

    verifiedAndPostData.element.append(verifiedAuthor.element, postDate.element);
  }
}

