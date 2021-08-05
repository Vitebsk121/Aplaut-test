import { ReviewData } from '../../shared/interfaces';
import { BaseComponent } from '../baseComponent';
import './commentForm.scss';

export class CommentForm extends BaseComponent {
  constructor(review: ReviewData, setFormState: (state: boolean) => void) {
    super('form', ['rv__comments__form']);

    this.render(review, setFormState);
  }

  setAvatar(setUserAvatar: BaseComponent, userAvatar: BaseComponent): void {
    const fileInput = (<HTMLInputElement>setUserAvatar.element).files;
    if (fileInput === null) throw Error('file is not founded');

    const reader = new FileReader();
    if (!fileInput[0]) {
      return;
    }
    reader.readAsDataURL(fileInput[0]);
    reader.onload = () => {
      const Avatar = reader.result;
      userAvatar.element.style.backgroundImage = `url(${Avatar})`;
      userAvatar.element.style.backgroundSize = 'cover';
    };
    (<HTMLInputElement>setUserAvatar.element).value = '';
  }

  setName(inputValue: EventTarget | null, userName: BaseComponent): void {
    userName.element.innerHTML = `<b>${(<HTMLInputElement>inputValue).value}</b>`;
  }

  render(review: ReviewData, setFormState: (state: boolean) => void): void {
    this.element.setAttribute('name', review.id);

    const formTextArea = new BaseComponent('textarea', ['form__text-area']);
    formTextArea.element.setAttribute('placeholder', 'Комментировать отзыв...');
    formTextArea.element.setAttribute('reqiured', 'required');

    const userInfo = new BaseComponent('div', ['form__user-info']);

    const userAvatar = new BaseComponent('div', ['form__user-info__avatar']);

    const setUserAvatar = new BaseComponent('input', ['form__user-info__avatar-input']);
    setUserAvatar.element.setAttribute('type', 'file');
    setUserAvatar.element.addEventListener('change', () => {
      this.setAvatar(setUserAvatar, userAvatar);
    });

    const userName = new BaseComponent('div', ['form__user-info__name']);
    userName.element.innerHTML = '<b>Аноним</b>';

    const setUserName = new BaseComponent('input', ['form__user-info__name-input', 'hidden']);
    setUserName.element.setAttribute('type', 'text');
    setUserName.element.addEventListener('keypress', (e) => {
      if (e.code === 'Enter') {
        e.preventDefault();
        this.setName(e.target, userName);
        setUserName.element.style.display = 'none';
      }
    });
    setUserName.element.addEventListener('change', (e) => {
      e.preventDefault();
      this.setName(e.target, userName);
      setUserName.element.style.display = 'none';
    });

    const setUserNameBtn = new BaseComponent('div', ['form__user-info__name-btn']);
    setUserNameBtn.element.addEventListener('click', () => {
      setUserName.element.style.display = 'block';
    });

    const formMenu = new BaseComponent('div', ['form__menu']);

    const formRules = new BaseComponent('details', ['form__rules']);

    formRules.element.innerHTML = `
        <summary class='form__rules-summary'>Правила сообщества</summary>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo corporis dolorum animi similique nisi.
        `;

    const submitButton = new BaseComponent('button', ['form__btn', 'submit'], '', 'Отправить');
    submitButton.element.addEventListener('click', (e) => {
      e.preventDefault();
      setFormState(false);
      this.element.remove();
    });

    const cancelButton = new BaseComponent('button', ['form__btn', 'cancel'], '', 'Отменить');
    cancelButton.element.addEventListener('click', (e) => {
      e.preventDefault();
      setFormState(false);
      this.element.remove();
    });

    this.element.append(
      formTextArea.element,
      formTextArea.element,
      userInfo.element,
      formMenu.element,
    );

    userInfo.element.append(
      userAvatar.element,
      userName.element,
      setUserName.element,
      setUserNameBtn.element,
    );

    userAvatar.element.append(setUserAvatar.element);

    formMenu.element.append(
      formRules.element,
      cancelButton.element,
      submitButton.element,
    );
  }
}
