# ern-navigation

[![ci][1]][2]

## Getting Started

### Prerequisites

- All [prerequisites of Electrode Native][3]
- An Electrode Native [miniapp][4]

### Installation

Install `ern-navigation` as a dependency in your miniapp:

```sh
yarn add ern-navigation
```

Or `npm install --save ern-navigation`

### Integration

First, let's create some components to act as the app's different screens.
Each of these components should extend Electrode Native Navigation's
<a href="#Component">Component</a> class, and will need to define a few class
properties. Here's an example:

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
      accessibilityLabel: 'Exit this app'
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
using Electrode Native Navigation's <a href="#AppNavigator">AppNavigator</a>
class, like this:

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

## Example

The [movies-reloaded][5] miniapp outlines the different mechanisms that are
provided to you by Electrode Native Navigation.

## Further Reading

Check out our [Electrode Native Navigation Blog Post][6].

## Documentation

## Classes

<dl>
<dt><a href="#AppNavigator">AppNavigator</a></dt>
<dd></dd>
<dt><a href="#Component">Component</a> ⇐ <code>React.Component</code></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#AppNavigatorOptions">AppNavigatorOptions</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#NavigationBar">NavigationBar</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#Button">Button</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#LeftButton">LeftButton</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#NavigationEvent">NavigationEvent</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="AppNavigator"></a>

## AppNavigator
**Kind**: global class  

* [AppNavigator](#AppNavigator)
    * [new AppNavigator(screens, options)](#new_AppNavigator_new)
    * [.registerAll(miniappName)](#AppNavigator+registerAll)

<a name="new_AppNavigator_new"></a>

### new AppNavigator(screens, options)

| Param | Type | Description |
| --- | --- | --- |
| screens | <code>Object</code> | The screens to register. |
| options | <code>Object</code> | The navigation options. |

**Example**  
```js
import {AppNavigator} from 'ern-navigation';

new AppNavigator(
  {
    MainScreen: MainScreenComponent,
    SecondScreen: SecondScreenComponent,
  },
  {initialScreen: 'MainScreen'},
).registerAll('MyMiniApp');
```
<a name="AppNavigator+registerAll"></a>

### appNavigator.registerAll(miniappName)
Register all screens.

**Kind**: instance method of [<code>AppNavigator</code>](#AppNavigator)  

| Param | Type | Description |
| --- | --- | --- |
| miniappName | <code>string</code> | The name of the miniapp. |

<a name="Component"></a>

## Component ⇐ <code>React.Component</code>
**Kind**: global class  
**Extends**: <code>React.Component</code>  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| autoReset | <code>boolean</code> | <code>true</code> | (static) Whether to automatically reset the navigation bar upon component display. (defaults to <code>true</code>) |
| navigationOptions | [<code>NavigationBar</code>](#NavigationBar) |  | (static) The navigation bar for this component.  Defaults to a title of "Untitled" with no right [Button](#Button)s. |


* [Component](#Component) ⇐ <code>React.Component</code>
    * [new Component()](#new_Component_new)
    * _instance_
        * [.resetNavigationBar()](#Component+resetNavigationBar) ⇒ <code>Promise</code>
        * [.updateNavigationBar(navigationBar)](#Component+updateNavigationBar) ⇒ <code>Promise</code>
        * [.navigate(route)](#Component+navigate) ⇒ <code>Promise</code>
        * [.navigateInternal(screenName, [jsonPayload])](#Component+navigateInternal) ⇒ <code>Promise</code>
        * [.backTo(screenName)](#Component+backTo) ⇒ <code>Promise</code>
        * [.back()](#Component+back) ⇒ <code>Promise</code>
        * [.finish([payload])](#Component+finish) ⇒ <code>Promise</code>
    * _static_
        * [.setRegisteredRoute(route)](#Component.setRegisteredRoute)
        * [.getRegisteredRoute()](#Component.getRegisteredRoute) ⇒ <code>string</code>
        * [.setAppNavigator(appNavigator)](#Component.setAppNavigator)
        * [.getAppNavigator()](#Component.getAppNavigator) ⇒ [<code>AppNavigator</code>](#AppNavigator)
        * *[.getDynamicTitle(jsonPayload)](#Component.getDynamicTitle)*
        * *[.onNavButtonPress(buttonId)](#Component.onNavButtonPress)*
        * *[.onFocus()](#Component.onFocus)*
        * *[.onBlur()](#Component.onBlur)*
        * *[.onAppData()](#Component.onAppData)*

<a name="new_Component_new"></a>

### new Component()
<u><b>NOTE</b></u>:<br>
If overriding <code>componentWillUnmount</code> or <code>componentWillUpdate</code>, you <u><b>must</b></u> call the
appropriate super method - <code>super.componentWillUnmount()</code> or
<code>super.componentWillUpdate(nextProps, nextState)</code>, respectively.

**Example**  
```js
import {Component} from 'ern-navigation';

export default class MainScreenComponent extends Component {
  static displayName = 'Main Screen';
  static autoReset = true;
  static navigationOptions = {
    title: 'My Application',
    buttons: [
      {
        icon: Image.resolveAssetSource(exitIcon).uri,
        id: 'exit',
        location: 'right',
        accessibilityLabel: 'Exit this app',
      },
    ],
  };

  onNavButtonPress(buttonId) {
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
<a name="Component+resetNavigationBar"></a>

### component.resetNavigationBar() ⇒ <code>Promise</code>
Reset the navigation bar for the current screen to its defaults.

**Kind**: instance method of [<code>Component</code>](#Component)  
**Returns**: <code>Promise</code> - A <code>Promise</code> which will resolve or reject upon attempting to
reset the navigation bar.  
<a name="Component+updateNavigationBar"></a>

### component.updateNavigationBar(navigationBar) ⇒ <code>Promise</code>
Update the navigation bar for the current screen.

**Kind**: instance method of [<code>Component</code>](#Component)  
**Returns**: <code>Promise</code> - A <code>Promise</code> which will resolve or reject upon attempting to
update the navigation bar.  

| Param | Type | Description |
| --- | --- | --- |
| navigationBar | [<code>NavigationBar</code>](#NavigationBar) | The [NavigationBar](#NavigationBar) object. |

<a name="Component+navigate"></a>

### component.navigate(route) ⇒ <code>Promise</code>
Navigate to a given route.

**Kind**: instance method of [<code>Component</code>](#Component)  
**Returns**: <code>Promise</code> - A <code>Promise</code> which will resolve or reject upon attempting to
navigate to the given route.  

| Param | Type | Description |
| --- | --- | --- |
| route | <code>Object</code> | The route object that details where to navigate next. |

<a name="Component+navigateInternal"></a>

### component.navigateInternal(screenName, [jsonPayload]) ⇒ <code>Promise</code>
Navigate to an internal screen.

**Kind**: instance method of [<code>Component</code>](#Component)  
**Returns**: <code>Promise</code> - A <code>Promise</code> which will resolve or reject upon attempting to
navigate to the new screen.  

| Param | Type | Description |
| --- | --- | --- |
| screenName | <code>string</code> | The name of the screen to navigate to; these names should be defined in the initial [AppNavigator](#AppNavigator) setup. |
| [jsonPayload] | <code>Object</code> | (optional) The JSON payload with props to send to the new screen. |

<a name="Component+backTo"></a>

### component.backTo(screenName) ⇒ <code>Promise</code>
Go back to a specified screen.

**Kind**: instance method of [<code>Component</code>](#Component)  
**Returns**: <code>Promise</code> - A <code>Promise</code> which will resolve or reject upon attempting to
go back to the specified screen.  

| Param | Type | Description |
| --- | --- | --- |
| screenName | <code>string</code> | The name of the screen to navigate to; these names should be defined in the initial [AppNavigator](#AppNavigator) setup. |

<a name="Component+back"></a>

### component.back() ⇒ <code>Promise</code>
Go back one screen.

**Kind**: instance method of [<code>Component</code>](#Component)  
**Returns**: <code>Promise</code> - A <code>Promise</code> which will resolve or reject upon attempting to
go back one screen.  
<a name="Component+finish"></a>

### component.finish([payload]) ⇒ <code>Promise</code>
Finish this flow.

**Kind**: instance method of [<code>Component</code>](#Component)  
**Returns**: <code>Promise</code> - A <code>Promise</code> which will resolve or reject upon attempting to
finish the current flow.  

| Param | Type | Description |
| --- | --- | --- |
| [payload] | <code>Object</code> | (optional) The JSON payload to send to the native activity or view controller that launched the flow. |

<a name="Component.setRegisteredRoute"></a>

### Component.setRegisteredRoute(route)
Set the registered route for this component.

**Kind**: static method of [<code>Component</code>](#Component)  

| Param | Type | Description |
| --- | --- | --- |
| route | <code>string</code> | The registered route for this component. |

<a name="Component.getRegisteredRoute"></a>

### Component.getRegisteredRoute() ⇒ <code>string</code>
Get the registered route for this component.

**Kind**: static method of [<code>Component</code>](#Component)  
**Returns**: <code>string</code> - A string containing the registered route for this component.  
<a name="Component.setAppNavigator"></a>

### Component.setAppNavigator(appNavigator)
Set the [AppNavigator](#AppNavigator) for this component.

**Kind**: static method of [<code>Component</code>](#Component)  

| Param | Type | Description |
| --- | --- | --- |
| appNavigator | [<code>AppNavigator</code>](#AppNavigator) | The [AppNavigator](#AppNavigator) for this component. |

<a name="Component.getAppNavigator"></a>

### Component.getAppNavigator() ⇒ [<code>AppNavigator</code>](#AppNavigator)
Get the [AppNavigator](#AppNavigator) for this component.

**Kind**: static method of [<code>Component</code>](#Component)  
**Returns**: [<code>AppNavigator</code>](#AppNavigator) - The [AppNavigator](#AppNavigator) for this component.  
<a name="Component.getDynamicTitle"></a>

### *Component.getDynamicTitle(jsonPayload)*
Calculate the title for the current route based on the JSON payload.
Must be overridden in subclasses.

**Kind**: static abstract method of [<code>Component</code>](#Component)  

| Param | Type | Description |
| --- | --- | --- |
| jsonPayload | <code>Object</code> | The JSON payload for the current route. |

<a name="Component.onNavButtonPress"></a>

### *Component.onNavButtonPress(buttonId)*
Handle button press events.
Must be overridden in subclasses.

**Kind**: static abstract method of [<code>Component</code>](#Component)  

| Param | Type | Description |
| --- | --- | --- |
| buttonId | <code>string</code> | The ID of the button which was pressed. |

<a name="Component.onFocus"></a>

### *Component.onFocus()*
Handle focus events.

**Kind**: static abstract method of [<code>Component</code>](#Component)  
<a name="Component.onBlur"></a>

### *Component.onBlur()*
Handle blur events.

**Kind**: static abstract method of [<code>Component</code>](#Component)  
<a name="Component.onAppData"></a>

### *Component.onAppData()*
Handle appData events.

**Kind**: static abstract method of [<code>Component</code>](#Component)  
<a name="AppNavigatorOptions"></a>

## AppNavigatorOptions : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| initialScreen | <code>string</code> | The initial screen for the miniapp.  If falsy, the first screen defined in the screens will be used. |

<a name="NavigationBar"></a>

## NavigationBar : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| title | <code>string</code> | The title for the navigation bar. |
| overlay | <code>boolean</code> | (optional) Show this page as an overlay (navigate only). |
| buttons | [<code>Array.&lt;Button&gt;</code>](#Button) | The [Button](#Button)s to display on the right side of the navigation bar. |
| leftButton | [<code>LeftButton</code>](#LeftButton) | The [LeftButton](#LeftButton) to display on the left side of the navigation bar. |

<a name="Button"></a>

## Button : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| icon | <code>string</code> | The location of the icon (use <code>Image.resolveAssetSource(iconFile).uri</code>) or the name of a built-in icon. |
| title | <code>string</code> | The title for the button; will be used in case of missing or invalid icon. |
| id | <code>string</code> | The ID of the button; will be used in header button events.  Cannot contain '.'. |
| accessibilityLabel | <code>string</code> | The text to read out with screen-reader technology. |

<a name="LeftButton"></a>

## LeftButton : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| icon | <code>string</code> | The location of the icon (use <code>Image.resolveAssetSource(iconFile).uri</code>) or the name of a built-in icon. |
| title | <code>string</code> | The title for the button (iOS only). |
| id | <code>string</code> | The ID of the button; will be used in header button events.  If set, the press event must be handled on the Javascript side, as native will no longer handle the back press.  Cannot contain '.'. |
| accessibilityLabel | <code>string</code> | The text to read out with screen-reader technology. |

<a name="NavigationEvent"></a>

## NavigationEvent : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| eventType | <code>&#x27;BUTTON\_CLICK&#x27;</code> \| <code>&#x27;DID\_FOCUS&#x27;</code> \| <code>&#x27;DID\_BLUR&#x27;</code> \| <code>&#x27;APP\_DATA&#x27;</code> | The type of the event. |
| viewId | <code>string</code> | The UUID for the view on which the event was fired. |
| jsonPayload | <code>string</code> | The payload for the event as stringified JSON. |


* * *

&copy; 2019 WalmartLabs

[1]: https://github.com/electrode-io/ern-navigation/workflows/ci/badge.svg
[2]: https://github.com/electrode-io/ern-navigation/actions
[3]: https://native.electrode.io/introduction/what-is-ern/requirements
[4]: https://native.electrode.io/introduction/what-is-ern/what-is-a-miniapp
[5]: https://github.com/electrode-io/movies-reloaded-miniapp
[6]: https://medium.com/walmartlabs/electrode-native-navigation-576297fbcb3d
