import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {TaskModel} from '../models.js';
import './task-card.js';

/**
 * TaskBoard <task-board category="XXX">
 * Display tasks in the given category
 */
class TaskBoard extends LitElement {
  static properties = {
    category: {},
    _tasks: {state: true},
    _message: {state: true},
  };

  static styles = css`
  :host {
    display: block;
    background-color: #f4f4f4;
    color: #333;
    border: 1px solid #ccc;
    padding: 40px;
    margin: 5px;
    width: 250px;
    max-height: 120vh; 
    overflow-y: auto; 
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    
  }
    :host input {
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      transition: border-color 0.3s ease; /* Added transition for border */
    }
    .task-actions {
      display: block;
    }
    .task-actions li {
      display: inline-block;
    }
    h3 {
      font-size: 20px; 
      margin-bottom: 15px; 
      color: #007bff; 
    }

    .message {
      font-style: italic;
      color: #666;
      margin-bottom: 10px;
    }

    .card-list {
      margin-top: 15px;
    }
    .card-list::after {
      content: '';
      display: table;
      clear: both;
    }
  `;

  constructor() {
    super();
    // set an event listener to refresh the display when the data is ready
    window.addEventListener('tasks', () => {
      this._loadData();
    });
  }

  _loadData() {
    
    this._tasks = TaskModel.getTasks(this.category);
    this.render();
  }

  render() {
    if (this._message) {
      return html`<h3>${this.category}</h3> <p>${this._message}</p>`;
    } else if (this._tasks) {
      return html`
          <div>
            <h3>${this.category}</h3>

            <div class="card-list">
              ${this._tasks.map((task) => {
                  return html`<task-card id=${task.id}></task-card>`;
                })}
            </div>
          </div>
        `;
    } else {
      return html`<h3>${this.category}</h3><p>Loading....</p>`;
    }
  }
}

customElements.define('task-board', TaskBoard);
