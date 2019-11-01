import {AppRegistry} from 'react-native';

/**
 * @typedef {Object} AppNavigatorOptions
 * @property {string} initialScreen - The initial screen for the miniapp.  If falsy,
 * the first screen defined in the screens will be used.
 */

/**
 * @constructor
 * @param {Object} screens - The screens to register.
 * @param {Object} options - The navigation options.
 * @example
 * import { AppNavigator } from 'ern-navigation'
 * new AppNavigator({
 *   'MainScreen': MainScreenComponent,
 *   'SecondScreen': SecondScreenComponent
 * }, {
 *   initialScreen: 'MainScreen'
 * }).registerAll('MyMiniApp')
 */
class AppNavigator {
  static screens = {};
  static options = {};

  constructor(screens, options) {
    if (!screens || Object.keys(screens).length < 1) {
      throw new Error('screens parameter must be a non-empty object');
    }
    let firstScreen = Object.keys(screens)[0];
    Object.keys(screens).forEach(screen => {
      if (!screen || !screens[screen]) {
        throw new Error('each screen must be defined');
      }
    });
    this.screens = screens;
    this.options = options || {};
    if (!this.options.initialScreen) {
      this.options.initialScreen = firstScreen;
    }
    if (!(this.options.initialScreen in this.screens)) {
      throw new Error('the initial screen must be a valid screen identifier');
    }
  }

  /**
   * Register all screens.
   * @param {!string} miniappName - The name of the miniapp.
   */
  registerAll(miniappName) {
    Object.keys(this.screens).forEach(screen => {
      const route =
        screen === this.options.initialScreen
          ? miniappName
          : `${miniappName}.${screen}`;
      this.screens[screen].setRegisteredRoute(route);
      this.screens[screen].setAppNavigator(this);
      AppRegistry.registerComponent(route, () => this.screens[screen]);
    });
  }
}

export default AppNavigator;
