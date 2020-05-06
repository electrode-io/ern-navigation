# ern-navigation

[![ci][1]][2]
[![npm version][8]][9]
[![License][10]][11]
[![docs][12]][7]

## Getting Started

### Prerequisites

- All [prerequisites of Electrode Native][3]
- An Electrode Native [miniapp][4]

### Installation

Install `ern-navigation` as a dependency in your miniapp:

```sh
yarn add ern-navigation
```

Alternatively: `npm i --save ern-navigation`

## Documentation

Detailed API documentation is available on our website:

[https://www.electrode.io/ern-navigation][7]

## Example

First, let's create some components to act as the app's different screens.
Each of these components should extend Electrode Native Navigation's
[Component][13] class, and will need to define a few class properties:

```js
import {Component} from 'ern-navigation';

export default class MainScreenComponent extends Component {
  static displayName = 'Main Screen';
  static navigationOptions = {
    title: 'My Application',
    buttons: [{
      icon: Image.resolveAssetSource(exitIcon).uri,
      id: 'exit',
      location: 'right',
      adaLabel: 'Exit this app'
    }]
  };
  onNavButtonPress (buttonId) {
    switch (buttonId) {
      case 'exit':
        this.finish();
        break;
      default:
        console.warn(
          `'${buttonId}' not handled in '${MainScreenComponent.getRegisteredRoute()}'`,
        );
        break;
    }
  }
}
```

Once all screen components have been created, they will need to be registered
using Electrode Native Navigation's [AppNavigator][14] class:

```js
import {AppNavigator} from 'ern-navigation';

new AppNavigator({
  'MainScreen': MainScreenComponent,
  'SecondScreen': SecondScreenComponent,
  // ...
}, {
  initialScreen: 'MainScreen'
}).registerAll('MyMiniApp');
```

In this example, the `MainScreenComponent` and `SecondScreenComponent` are
referred to as `MainScreen` and `SecondScreen`, respectively, whenever any
navigation is performed. From inside any of the screen components, calling
`this.navigateInternal(screenName)` will navigate to the specified registered
screen.

## Further Reading

The [movies-reloaded][5] miniapp outlines the different mechanisms that are
provided to you by Electrode Native Navigation.

Also check out our [Electrode Native Navigation Blog Post][6].

## License

```text
Copyright 2020 Walmart Labs

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

[1]: https://github.com/electrode-io/ern-navigation/workflows/ci/badge.svg
[2]: https://github.com/electrode-io/ern-navigation/actions
[3]: https://native.electrode.io/introduction/what-is-ern/requirements
[4]: https://native.electrode.io/introduction/what-is-ern/what-is-a-miniapp
[5]: https://github.com/electrode-io/movies-reloaded-miniapp
[6]: https://medium.com/walmartlabs/electrode-native-navigation-576297fbcb3d
[7]: https://www.electrode.io/ern-navigation
[8]: https://badge.fury.io/js/ern-navigation.svg
[9]: https://badge.fury.io/js/ern-navigation
[10]: https://img.shields.io/badge/License-Apache%202.0-blue.svg
[11]: https://opensource.org/licenses/Apache-2.0
[12]: https://img.shields.io/badge/docs-jsdoc-green.svg
[13]: http://www.electrode.io/ern-navigation/Component.html
[14]: http://www.electrode.io/ern-navigation/AppNavigator.html
