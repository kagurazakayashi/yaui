import YaTopAppBar from './yaui/ya-top-app-bar/ya-top-app-bar';
import YaIconButton from './yaui/ya-icon-button/ya-icon-button';

export default class Main {
  constructor() {
    window.customElements.define("ya-icon-button", YaIconButton);
  }
}
