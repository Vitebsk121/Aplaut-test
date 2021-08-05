import { CommentData } from '../../shared/interfaces';
import { setBeckgroundColor } from '../../shared/servise';
import { BaseComponent } from '../baseComponent';
import { CommentForm } from '../commentForm/commentForm';
import './comment.scss';

export class Comment extends BaseComponent {
    constructor(comment: CommentData) {
        super('div', ['rv__comments__comment']);

        this.render(comment);
    }
    
    render(comment: CommentData) {

        let isLiked = false;
        let isDisliked = false;
    
        let countOfLikes: number | string = comment.likes;
    
        if (countOfLikes === 0) countOfLikes = '';
    
        let countOfDislikes: number | string = comment.dislikes;
    
        if (countOfDislikes === 0) countOfDislikes = '';

        const commentWrapper = new BaseComponent('div', ['comment-wrapper']);

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
            `${new Date(Date.parse(comment.updated_at))
                .toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}`,
        );

        const commentBody = new BaseComponent('p', ['comment__field__body'], '', comment.body);

        const commentMenu = new BaseComponent('div', ['comment__field__menu']);

        const commentAnswerBtn = new BaseComponent(
            'button', 
            ['comment__field__menu__answer-btn'], 
            '', 
            'Ответить'
        );
        commentAnswerBtn.element.addEventListener('click', () => {
            const addNewComment = new CommentForm(comment, ()=>{});
            this.element.append(addNewComment.element);
        });

        const likesWrapper = new BaseComponent('div', ['comment__field__menu__likes-wrapper'])

        const commentLikesInfo = new BaseComponent('div', ['comment__field__menu__likes-info']);

        const like = new BaseComponent('div', ['comment__field__menu__like']);

        like.element.addEventListener('click', () => {
        if (isLiked) return;
        isLiked = true;

        like.element.style.backgroundImage = 'url(like.svg)';
        countOfLikes = Number(countOfLikes) + 1;
        if (countOfLikes === 0) countOfLikes = '';
        likesCount.element.innerText = String(countOfLikes);

        if (isDisliked) {
            dislike.element.style.backgroundImage = 'url(https://image.flaticon.com/icons/png/512/633/633759.png)';
            dislike.element.style.filter = 'hue-rotate(0deg)';
            countOfDislikes = Number(countOfDislikes) - 1;
            if (countOfDislikes === 0) countOfDislikes = '';
            dislikesCount.element.innerText = String(countOfDislikes);
            isDisliked = false;
        }
        });

        const likesCount = new BaseComponent('p', ['comment__field__menu__likes-count'], '', `${countOfLikes}`);

        const commentDislikesInfo = new BaseComponent('div', ['comment__field__menu__dislikes-info']);

        const dislike = new BaseComponent('div', ['comment__field__menu__dislike']);

        dislike.element.addEventListener('click', () => {
        if (isDisliked) return;
        isDisliked = true;

        dislike.element.style.backgroundImage = 'url(like.svg)';
        dislike.element.style.filter = 'hue-rotate(240deg)';
        countOfDislikes = Number(countOfDislikes) + 1;
        if (countOfDislikes === 0) countOfDislikes = '';
        dislikesCount.element.innerText = String(countOfDislikes);

        if (isLiked) {
            like.element.style.backgroundImage = 'url(https://image.flaticon.com/icons/png/512/633/633759.png)';
            countOfLikes = Number(countOfLikes) - 1;
            if (countOfLikes === 0) countOfLikes = '';
            likesCount.element.innerText = String(countOfLikes);
            isLiked = false;
        }
        });

        const dislikesCount = new BaseComponent('p', ['comment__field__menu__dislikes-count'], '', `${countOfDislikes}`);




        this.element.append(commentWrapper.element);

        commentWrapper.element.append(authorAvatar.element, commentField.element);

        commentField.element.append(authorInfo.element, commentBody.element, commentMenu.element);

        authorInfo.element.append(authorName.element, commentDate.element);

        commentMenu.element.append(commentAnswerBtn.element, likesWrapper.element);

        likesWrapper.element.append(commentLikesInfo.element, commentDislikesInfo.element);

        commentLikesInfo.element.append(like.element, likesCount.element);
    
        commentDislikesInfo.element.append(dislike.element, dislikesCount.element);

    }

}