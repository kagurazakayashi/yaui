import YAUI from './yaui/yaui';
import YaTopAppBar from './yaui/ya-top-app-bar/ya-top-app-bar';
import YaIconButton from './yaui/ya-icon-button/ya-icon-button';
import YaMenu from './yaui/ya-menu/ya-menu';

export default class Main {
  constructor() {
    YAUI.init();
    YAUI.load(YaTopAppBar);
    YAUI.load(YaIconButton);
    YAUI.load(YaMenu);
    const btnMainMenu = document.getElementById('btnMainMenu');
    btnMainMenu.addEventListener('click',()=>{
      YaMenu.open(document.getElementById('mainMenu'));
    });
    const btnAccountMenu = document.getElementById('btnAccountMenu');
    btnAccountMenu.addEventListener('click',()=>{
      YaMenu.open(document.getElementById('accountMenu'));
    });
  }
}
