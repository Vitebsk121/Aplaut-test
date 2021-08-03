export class BaseComponent {
    readonly element: HTMLElement;
  
    constructor(tag: keyof HTMLElementTagNameMap = 'div', styleList: string[] = [], id: string = '', innerText?: string) {
      this.element = document.createElement(tag);
      this.element.classList.add(...styleList);
      this.element.id = id;
      if (innerText !== undefined) this.element.append(`${innerText}`);
    }
}