export class BaseComponent {
    readonly element: HTMLElement;
  
    constructor(tag: keyof HTMLElementTagNameMap = 'div', styleList: string[] = [], innerText?: string) {
      this.element = document.createElement(tag);
      this.element.classList.add(...styleList);
      if (innerText !== undefined) this.element.append(`${innerText}`);
    }
}