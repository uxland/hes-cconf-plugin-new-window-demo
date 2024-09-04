export class MyElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: flex;
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          text-align: center;
          box-sizing: border-box;
        }
        div{
          padding: 20px;
          margin: 20px;
          background-color: #6b7ecd;
          border-radius: 10px;
          box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
          color: white;
          height: fit-content;
        }

        button {
          background-color: #3148aa;
          color: white;
          border-radius: 10px;
          border: none;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        }
      </style>
      <div>
        <button onclick="window.open('https://www.sport.es/es/', '_blank')">Click to open url in a new window</button>
      </div>
    `;
  }
}

// Define el custom element
customElements.define('my-element', MyElement);

// Declaración global (opcional, pero útil para TypeScript)
declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement;
  }
}