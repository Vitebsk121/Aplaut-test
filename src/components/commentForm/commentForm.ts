import { BaseComponent } from '../baseComponent';
import './commentForm.scss';

export class CommentForm extends BaseComponent {
    constructor() {
        super('div', ['rv__comments']);
    }

    render() {
        const form = new BaseComponent('form', ['rv__comments__form']);

        const formTextArea = new BaseComponent('textarea', ['form__text-area']);

        this.element.append(form.element);

        form.element.append(formTextArea.element);
    }
}