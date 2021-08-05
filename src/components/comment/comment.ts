import { CommentData } from '../../shared/interfaces';
import { setBeckgroundColor } from '../../shared/servise';
import { BaseComponent } from '../baseComponent';
import './comment.scss';

export class Comment extends BaseComponent {
    constructor(comment: CommentData) {
        super('div', ['rv__comments__comment']);

        this.render(comment);
    }
    
    render(comment: CommentData) {

        const authorAvatar = new BaseComponent('div', ['comment__author-avatar'], '', comment.author.initials);
        authorAvatar.element.style.backgroundColor = setBeckgroundColor();
        if (comment.author_avatar_url !== null) {
            authorAvatar.element.style.backgroundImage = `url(${comment.author_avatar_url})`;
        }

        const commentField = new BaseComponent('div', ['comment__field'])

        const authorInfo = new BaseComponent('div', ['comment__field__info']);

        const authorName = new BaseComponent('p', ['comment__field__info__author-name'], '', comment.author_name);

        const commentDate = new BaseComponent(
            'p', 
            ['comment__field__info__comment-date'], 
            '',
            
            );

        this.element.append(authorAvatar.element, commentField.element);

        commentField.element.append(authorInfo.element);

        authorInfo.element.append(authorName.element);
    }

}