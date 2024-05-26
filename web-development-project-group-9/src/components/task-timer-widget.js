// Importing necessary modules from LitElement library
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

// CSS styles for the Task Timer Widget
const styles = css`
  :host {
    display: block;
    width: 300px;
    height: 296px;
    background-color: lightgray;
    border: 2px solid black;
    padding: 20px;
    box-sizing: border-box;
  }

  .timer {
    font-size: 60px;
    text-align: center;
  }

  .alarm {
    color: red;
    font-weight: bold;
    animation: blink 1s linear infinite;
  }

  /* Keyframes for the alarm blinking animation */
  @keyframes blink {
    50% {
      opacity: 0;
    }
  }

  input[type="number"],
  button {
    width: 50%;
    padding: 10px;
    font-size: 15px;
    margin-top: 10px;
  }

  button.start {
    background-color: green;
    color: white;
  }

  button.reset {
    background-color: darkred;
    color: white;
  }

  button.pause {
    background-color: darkblue;
    color: white;
  }
`;

// Properties for the Task Timer Widget component
const properties = {
  duration: { type: Number },
  timeLeft: { type: Number },
  isRunning: { type: Boolean }
};

class TaskTimerWidget extends LitElement {
  static styles = styles;
  static properties = properties;

  // Constructor to initialize the component
  constructor() {
    super();
  
    this.duration = 15;
  
    this.resetTimer();
    
    this.audio = new Audio();
  }

  // Render method to define the component's HTML structure
  render() {
    return html`
      <div class="timer ${this.timeLeft === 0 ? 'alarm' : ''}">
        ${this.formatTime(this.timeLeft)}
      </div>
      <input type="number" min="1" step="1" .value="${this.duration}" @change="${this.handleDurationChange}">
      <button class="${this.isRunning ? 'pause' : 'start'}" @click="${this.toggleTimer}">
        ${this.isRunning ? 'Pause' : 'Start'}
      </button>
      <button class="reset" @click="${this.resetTimer}" ?disabled="${this.timeLeft === this.duration * 60}">
        Reset
      </button>
    `;
  }

  // Method to format time into MM:SS format
  formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
//Updates the timer and identifies timer value.
  handleDurationChange(event) {
    const newDuration = parseInt(event.target.value);
    
    if (!isNaN(newDuration) && newDuration > 0) {
     
      this.duration = newDuration;
      this.resetTimer();
    }
  }

  toggleTimer() {

    this.isRunning ? this.stopTimer() : this.startTimer();
  }

  startTimer() {
   
    this.isRunning = true;
 
    this.timerInterval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
       
        this.stopTimer();
        this.playAlarm();
      }
    }, 1000); 
  }

  stopTimer() {
    clearInterval(this.timerInterval);
    this.isRunning = false;
  }

  resetTimer() {
    
    this.stopTimer();
    this.timeLeft = this.duration * 60;
  }

  playAlarm() {
    this.audio.src = 'https://codeskulptor-demos.commondatastorage.googleapis.com/descent/gotitem.mp3';
    this.audio.play();
  }

  updated(changedProperties) {
    if (changedProperties.has('duration')) {
      this.resetTimer();
    }
  }
}

customElements.define('task-timer-widget', TaskTimerWidget);
