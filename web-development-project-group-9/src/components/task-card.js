import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

import {TaskModel} from '../models.js';
import './edit-task.js';
import './task-detail-additional-file.js';

/**
 * TaskCard <task-card id=N>
 * Display the details of the task with id N in a 'card'
 * as part of the task board
 */
class TaskCard extends LitElement {
  static properties = {
    id: 0,
    _task: {state: true},
  };

  static styles = css`
  :host {
    display: block;
    width: 200px;
    background-color: #f8f9fa;
    color: #333;
    border: 4px solid #ccc;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-bottom: 26px;
    height: auto;
}

:host input {
    width: 5em;
}

h2 {
    background-color: #007bff;
    color: #fff;
    font-size: 20px;
    font-weight:bold;
    font-variant: small-caps;
    padding: 10px;
    margin: 0;
    border-radius: 4px;
    border-top-left-radius: 10px; 
    border-top-right-radius: 10px;
}

.task-timestamp {
    margin: 10px 0;
    font-size: 20px; 
    color: white; 
    background-color:#9BC23B; 
}  

.task-due{
  margin: 10px 0;
  font-size: 20px; 
  color: white; 
  background-color:#F01C1C; 
}  
.task-priority {
    margin: 10px 0;
    font-size: 24px; 
    color: #666; 
    text-transform: uppercase;
    font-weight: bold;
    background-color:#CFEE82 
}

.task-content {
    margin-bottom: 16px;
    
    
}

edit-task {
    margin-top: 16px;

}

.task-info p {
  margin: 5px 0;
}

button {
  background-color: green;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s; /* Smooth transition */
}

button:hover {
  background-color: #19DFA3; /* Darker color on hover */
  transform: translateY(-2px);
}

  `;

  connectedCallback() {
    super.connectedCallback();
    this._loadData();
    // set up an event listener to load new tasks when they change
    window.addEventListener('tasks', () => {
      this._loadData();
    });
  }
 
  _loadData() {
    this._task = TaskModel.getTask(this.id);
  }
  async createTask() { 
    try {
      const today = new Date().toISOString();
      const newTask = {
        
        summary: 'New Task Summary',
        text: 'New Task Description',
        due: new Date().toISOString(),
        priority: 'high'
      };
      await TaskModel.createTask(newTask);
      console.log("New task created");
    } catch (error) {
      console.error('Error creating task:', error);
    }
  }
  

  render() {
    if (this._task) {
      const ts = new Date(parseInt(this._task.timestamp));
      const due = new Date(parseInt(this._task.due));
      return html`
      <div>
        <h2>${this._task.summary}</h2>
        <p class='task-timestamp'>${ts.toDateString()}</p>
        <p class='task-due'>${due.toDateString()}</p>
        <p class='task-content'>${this._task.text}</p>
        <p class='task-priority'>${this._task.priority}</p>
        <button @click="${this.createTask}">Create New Task</button>
        <edit-task id=${this.id}></edit-task>
      </div>
      `;
    } else {
      return html`<div>Loading...</div>`;
    }
  }
  openModal() {
    this.shadowRoot.querySelector('task-detail-modal').isOpen = true;
  }

  closeModal() {
    this.shadowRoot.querySelector('task-detail-modal').isOpen = false;
  }
}
customElements.define('task-card', TaskCard);
