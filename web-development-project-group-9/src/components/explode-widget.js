import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { TaskModel } from '../models.js';
class ExplodeWidget extends LitElement {

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
      background-color: azure;
      font-family: Arial, sans-serif;
      text-align: center;
    }

    .dupe-image {
      position: absolute;
    }

    #boom-button {
      margin-top: 20px;
      margin: 10px;
      width: 180px;
      height: 90px;
      background-color: red;
      border-radius: 60px;
    }

    .button-area {
      display: flex;
      justify-content: center;
      margin: 5px;
    }

  `;

  constructor(){
    super();
    this.clicked = false;
    this.maxSize = 600;
    this.originalSize = 50;
    this.spacing = 5;
    this.id = null;

  }


  render() {
    return html`
      <div class="button-area">
        <button id="boom-button" @click="${this.myMove}">Boom</button>
        <h3>Only press in case of Completion</h3>
      </div>
    `;
  }

  myMove() {
    
    if (!this.clicked) {
      this.clicked = true;
      this.id = setInterval(() => this.boom(), 10);
    }
  }

  boom() {
    const tasks = TaskModel;
    if (this.originalSize >= this.maxSize) {
      clearInterval(this.id);
      this.clearImages();
      this.clicked = false;
      this.maxSize = 1000;
      this.originalSize = 500;
      this.spacing = 5;
    } else {
      this.originalSize += 5;
      const middleX = window.innerWidth / 2;
      const middleY = window.innerHeight / 2;
      for (let i = 0; i < 2; i++) {
        const img = document.createElement('img');
        img.src = "explode.png";
        img.classList.add('dupe-image');
        this.shadowRoot.appendChild(img);
        img.style.height = this.originalSize + 'px';
        img.style.width = this.originalSize + 'px';
        img.style.left = (Math.random() * (this.clientWidth - this.originalSize)) + 'px';
        img.style.top = (Math.random() * (this.clientHeight - this.originalSize)) + 'px';
        console.log(this.maxSize);
        console.log(this.originalSize);
      }
    }
  }

  clearImages() {
    TaskModel.moveTasksToDone('Done');
    const images = this.shadowRoot.querySelectorAll('.dupe-image');
    images.forEach(img => img.remove());

  }

}

customElements.define('explode-widget', ExplodeWidget);
