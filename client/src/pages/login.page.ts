import { BaseElement } from "./base.element";

export class LoginElement extends BaseElement {

  connectedCallback(): void {
    super.connectedCallback();
    this.getElement('#form-signin')?.addEventListener('submit', this.submit);
  }

  submit = (e: Event) => {
    e.preventDefault();
    const username = (this.getElement('#username') as HTMLInputElement).value;
    const password = (this.getElement('#password') as HTMLInputElement).value;

    const token = window.btoa(`${username.trim()}:${password.trim()}`);
    const headers = new Headers();
    headers.set('Authorization', `Basic ${token}`);
    fetch('/api-service/api/v1/token', {
      method: 'POST',
      headers: headers,
    }).then(async response => {
      if (response.status === 200) {
        const token = await response.text();
        sessionStorage.setItem('token', token);
        document.querySelector<HTMLDivElement>('#app')!.innerHTML = /*html*/'<home-element></home-element>';
      }
    })
    console.log(`Form Submitted! Time stamp: ${e.timeStamp}`);
  }

  get html() {
    return /*html*/`
      <div class="wrapper">
        <form id="form-signin" class="form-signin">
          <h2 class="form-signin-heading">Please login</h2>
          <input id="username" type="text" class="form-control" name="username" placeholder="Username" required="" autofocus="" />
          <input id="password" type="password" class="form-control" name="password" placeholder="Password" required=""/>
          <button id="submit-btn" type="submit" >Login</button>
        </form>
      </div>
    `;
  }

  get css() {
    return /*css*/`
      .wrapper {
        position: fixed;
        width: 400px;
        top: 200px;
        left: calc((100vw - 300px) / 2);
      }
      .form-signin {
        max-width: 380px;
        padding: 15px 45px 35px;
        margin: 0 auto;
        background-color: var(--form-background);
        border-radius: 10px;
        border: 1px solid rgba(0,0,0,0.1);
        box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.2);
      }
      .form-signin-heading,
      .checkbox {
        margin-bottom: 30px;
      }
      .checkbox {
        font-weight: normal;
      }
      .form-control {
        position: relative;
        font-size: 16px;
        height: auto;
        padding: 10px;
      }
      input {
        width: 280px;
        border-radius: 5px;
        color: var(--input-color);
        background-color: var(--input-background);
        outline: none;
        border: 1px solid #eee;
      }
      input[type="text"] {
        margin-bottom: 15px;
      }
      input[type="password"] {
        margin-bottom: 30px;
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

customElements.define('login-element', LoginElement);