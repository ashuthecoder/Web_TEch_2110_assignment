import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

/**
 * WidgetBlock <widget-block header="Sample Widget">
 * Base example for a widget, used as a placeholder in design for unimplemented
 * widgets
 */

class WidgetBlock extends LitElement {
  static properties = {
    header: {type: String},
  };

  static styles = css`
    :host {
        display: block;
        width: 300px;
        height: 370px;
        background-color: azure;
        border: 1px solid black;
        margin-right: 20px;
    }
  `;

  constructor() {
    super();
    this.header = 'Widget';
  }

  render() {
    return html`
      <div>
        <h3>${this.header}</h3>
        ${this.header === 'Calender' ? html`<calendar-widget></calendar-widget>` : ''}
        
        ${this.header === 'Explode' ? html`<explode-widget></explode-widget>` : ''}
        
        ${this.header === 'Timer' ? html`<task-timer-widget></task-timer-widget>` : ''}
      </div>
    `;
  }  

}

customElements.define('widget-block', WidgetBlock);
