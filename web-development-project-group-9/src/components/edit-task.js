import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {TaskModel} from '../models.js';

/** EditTask <edit-task id=N>
 * Task edit for a given task id (N).  Displays as a button which when clicked
 * shows a modal dialog containing a form to update the task properties.
 * Submitting the form updates the task via the TaskModel.
 */
class EditTask extends LitElement {
  static properties = {
    id: 0,
    _task: {state: true},
  };

  static styles = css`
  :host {
    display: block;
  }

  button {
    background-color: red ;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1)
  }

  button:hover {
    background-color: #AD2C11 ;
    transform: translateY(-2px);
  }

  dialog {
    width: 80%;
    max-width: 500px;
    padding: 20px;
    border-radius: 8px;
    background-color: #f8f9fa;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }

  form {
    display: flex;
    flex-direction: column;
  }

  div {
    margin-bottom: 20px;
    margin-right:10px;
  }

  label {
    font-weight: bold;
    color: #333;
  }

  input, textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  input:focus,
  textarea:focus {
    outline: none;
    border-color: #007bff; 
  }

  input[type="datetime-local"] {
    padding: 8px;
  }

input[type="submit"] {
  background-color: #28a745; 
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
}

input[type="submit"]:hover {
  background-color: #218838; 
}

      `;

  connectedCallback() {
    super.connectedCallback();
    this._task = TaskModel.getTask(this.id);
  }

  /**
   * _submit - private method to handle form submission. Constructs
   * a new task from the form values and then updates the task via TaskModel
   * @param {Object} event - the click event
   */
  _submit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const due = new Date(formData.get('due'));
    const newTask = {
      summary: formData.get('summary'),
      text: formData.get('text'),
      priority: formData.get('priority'),
      due: due.valueOf(),
    };
    TaskModel.updateTask(this.id, newTask);
    this._hideModal(event);
  }


  /**
   * click handler for the button to show the editor dialog
   */
  _showModal() {
    const dialog = this.renderRoot.querySelector('#edit-task-dialog');
    dialog.showModal();
    
  }

  /**
   * click handler to close the editor dialog
   * @param {Object} event - the click event
   */
  _hideModal(event) {
    if (event){
      event.preventDefault();
    }      
    const dialog = this.renderRoot.querySelector('#edit-task-dialog');
    dialog.close();
  }

  _deleteTask(event) {
    event.preventDefault();
    if (confirm('Are you sure you want to delete this task?')) {
        TaskModel.DeleteTask_meth(this.id);
        this._hideModal();
        
    }
}
 

 

  render() {
    // convert due date from milliseconds time to an ISO string
    // suitable for the datetime-local form input
    const isoString = new Date(this._task.due).toISOString();
    const due = isoString.substring(0, isoString.indexOf('T') + 6);
    return html`
        <button @click=${this._showModal}>Edit</button>
        <dialog id="edit-task-dialog">
            <form @submit="${this._submit}">
                <div>
                    <label for="summary">Summary</label>
                    <input name="summary" value=${this._task.summary}>
                </div>
                <div>
                    <label for="text">Text</label>
                    <textarea name="text">${this._task.text}</textarea> 
                </div>
                <div>
                    <label for="priority">Priority</label>
                    <input name="priority" 
                           type="number" 
                           value=${this._task.priority}> 
                </div>
                <div>
                    <label for="due">Due</label>
                    <input name="due" type="datetime-local" value=${due}>
                </div>
                <div>
                    <button @click="${this._deleteTask}">Delete</button>
                    <button @click="${this._hideModal}">Cancel</button>
                    <input value='Update' type=submit>
                </div>
            </form>
        </dialog>`;
  }
}

customElements.define('edit-task', EditTask);
