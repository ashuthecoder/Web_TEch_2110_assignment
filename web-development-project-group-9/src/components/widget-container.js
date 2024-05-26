import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

/**
 * WidgetContainer
 * <widget-container header="Widgets">
 *    <widget-block></widget-block>
 *    <widget-block></widget-block>
 * </widget-container>
 * Container for a collection of widgets
 */
class WidgetContainer extends LitElement {
  static properties = {
    header: {type: String},
  };

  static styles = css`
    div {
      display: flex;
      flex-direction: column;
    }
  `;

  constructor() {
    super();
    this.header = 'Widgets';
  }

  render() {
    return html`
      <div>
        <h2>${this.header}</h2>
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('widget-container', WidgetContainer);
