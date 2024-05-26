import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { TaskModel } from '../models.js';

class CalendarWidget extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 300px;
      background-color: azure;
      border: 1px solid black;
      font-family: Arial, sans-serif;
    }

    .calendar {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 1px;
    }

    .day {
      padding: 5px;
      border: 1px solid #ccc;
      background-color: white;
    }

    .current-day {
      background-color: lightblue;
    }

    .due-day {
      background-color: lightcoral;
    }

    .controls {
      display: flex;
      justify-content: space-between;
      margin: 5px;
    }
  `;

  static properties = {
    currentYear: { type: Number },
    currentMonth: { type: Number },
    taskDueDates: { type: Array }
  };

  constructor() {
    super();
    const today = new Date();
    this.currentYear = today.getFullYear();
    this.currentMonth = today.getMonth();
    this.taskDueDates = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadTaskDueDates();
  }

  async loadTaskDueDates() {
    const tasks = TaskModel.getTasksForMonth(this.currentMonth, this.currentYear); // Fetched all tasks for the current month
    const approachingDueDates = []; // Initialized an empty array to store all approaching due dates
  
    // Set the threshold for approaching due dates (in milliseconds)
    const threshold = 2 * 24 * 60 * 60 * 1000; // 2 days
  
    // Iterate through each task and check if its due date is within the threshold
    tasks.forEach(task => {
      const dueDate = new Date(task.due); // Fetches due date of the month
      const datePart = dueDate.getDate(); // Fetches the day of the month
      const currentDate = new Date(this.currentYear, this.currentMonth, 1); // Start of current month
      const lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0); // End of current month
      while (currentDate <= lastDayOfMonth) {
        if (Math.abs(currentDate - dueDate) <= threshold) {
          approachingDueDates.push(dueDate.getDate());
        }
        currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
      }
    });
  
    this.taskDueDates = approachingDueDates;
    console.log(approachingDueDates)
  }
  
  render() {

    // calender
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();

    const days = [];

    // empty slots for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(html`<div class="day"></div>`);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const classes = ['day'];
      if (i === new Date().getDate() && this.currentMonth === new Date().getMonth() && this.currentYear === new Date().getFullYear()) {
        classes.push('current-day');
      }
      if (this.taskDueDates.includes(i)) {
        classes.push('due-day');
      }
      days.push(html`<div class="${classes.join(' ')}">${i}</div>`);
    }

    return html`
      <div class="controls">
        <button @click="${this.previousMonth}">Previous</button>
        <h3>${this.getMonthName(this.currentMonth)} ${this.currentYear}</h3>
        <button @click="${this.nextMonth}">Next</button>
      </div>
      <div class="calendar">${days}</div>
    `;
  }

  previousMonth() {
    this.currentMonth -= 1;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear -= 1;
    }
    this.loadTaskDueDates();
  }

  nextMonth() {
    this.currentMonth += 1;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear += 1;
    }
    this.loadTaskDueDates();
  }

  getMonthName(monthIndex) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames[monthIndex];
  }
}

customElements.define('calendar-widget', CalendarWidget);
