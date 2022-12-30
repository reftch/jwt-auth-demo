import { BaseElement } from "./base.element";

export class HomeElement extends BaseElement {

  connectedCallback(): void {
    super.connectedCallback();

    const token = sessionStorage.getItem('token');
    if (!token) {
      this.toLoginPage();
    }

    const headers = new Headers();
    headers.set('Authorization', `Bearer ${token}`);

    fetch('/api-service/api/v1', {
      method: 'GET',
      headers: headers
    }).then(async response => {
      if (response.status !== 200) {
        this.toLoginPage();
        return;
      }

      const el = this.getElement('.message');
      if (el) {
        (el as HTMLElement).innerHTML = await response.text();
      }
    });

    this.getElement('#logout-btn')?.addEventListener('click', () => this.toLoginPage());
  }

  private toLoginPage = () => {
    sessionStorage.removeItem('token');
    document.querySelector<HTMLDivElement>('#app')!.innerHTML = '<login-element></login-element>';
  }

  get html() {
    return /*html*/`
      <div class="page">
        <h2>Home page</h2>
        <div class="message"></div>
        <button id="logout-btn">Logout</button>
      </div>
    `;
  }

  get css() {
    return /*css*/`
      .page {
        padding: 15px 45px 35px;
        position: fixed;
        width: 400px;
        top: 200px;
        left: calc((100vw - 400px) / 2);
        background-color: var(--form-background);
        border-radius: 10px;
        border: 1px solid rgba(0,0,0,0.1);
        box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.2);
      }
      .message {
        margin-bottom: 20px;
      }
      button {
        border-radius: 8px;
        border: 1px solid transparent;
        padding: 0.6em 1.2em;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        background-color: var(--button-color);
        cursor: pointer;
        transition: border-color 0.15s;
        box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.2);
      }
      button:hover {
        border-color: var(--border-color);
      }
      button:focus,
      button:focus-visible {
        outline: 4px auto -webkit-focus-ring-color;
      }
    `;
  }
}

customElements.define('home-element', HomeElement);