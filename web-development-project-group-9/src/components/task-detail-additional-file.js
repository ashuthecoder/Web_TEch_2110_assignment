import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class TaskDetailModal extends LitElement {
  static properties = {
    task: { type: Object },
    isOpen: { type: Boolean }
  };

  static styles = css`
    :host {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 9999;
      overflow: auto;
      padding: 20px;
    }

    .modal-content {
      background-color: #fff;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      max-width: 80%;
      margin: 0 auto;
    }

    .close-button {
      cursor: pointer;
      position: absolute;
      top: 10px;
      right: 10px;
    }
  `;

  render() {
    return this.isOpen ? html`
      <div class="modal-content">
        <span class="close-button" @click=${this.closeModal}>&times;</span>
        <h2>${this.task.summary}</h2>
        <p>${this.task.text}</p>
        <p>Timestamp: ${new Date(parseInt(this.task.timestamp)).toLocaleString()}</p>
        <p>Due: ${new Date(parseInt(this.task.due)).toLocaleString()}</p>
        <p>Priority: ${this.task.priority}</p>
      </div>
    ` : '';
  }

  closeModal() {
    this.dispatchEvent(new CustomEvent('close-modal'));
  }
}

customElements.define('task-detail-modal', TaskDetailModal);
