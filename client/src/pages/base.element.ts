
export abstract class BaseElement extends HTMLElement {

  private shadow: ShadowRoot | undefined;

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.appendChild(this.getTemplate());
  }

  connectedCallback() {
    const style = document.createElement('style');
    style.innerHTML = this.css;
    this.shadow?.appendChild(style);
  }

  private getTemplate(): Node {
    const templateNode = document.createElement('template')
    templateNode.innerHTML = this.html;
    return templateNode.content.cloneNode(true)
  }

  protected getElement(selector: string): HTMLElement | null | undefined {
    return this.shadow?.querySelector(selector);
  }

  abstract get html(): string;
  abstract get css(): string;

}