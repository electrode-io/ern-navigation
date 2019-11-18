## Getting Started

### Prerequisites

- Node.js >= 8
- NPM >= 3.0
- Android Studio (for Android apps)
- Xcode >= 10 (for iOS apps)
- An <a href="http://www.electrode.io/site/native.html">Electrode Native</a> miniapp

### Install as a dependency in your miniapp

```console
$ npm install --save ern-navigation
```

### Try it out!

First, lets create some components to act as the app's different screens.
Each of these components should extend Electrode Native Navigation's <a href="#Component">Component</a> class, and will need to define a few class properties.  Here's an example:
```js
import { Component } from 'ern-navigation'
...
export default MainScreenComponent extends Component {
  static displayName = 'Main Screen'
  static navigationOptions = {
    title: 'My Application',
    buttons: [{
      icon: Image.resolveAssetSource(exitIcon).uri,
      id: 'exit',
      location: 'right',
      accessibilityLabel: 'Exit this app'
    }]
  }
 onNavButtonPress (buttonId) {
   switch (buttonId) {
     case 'exit':
       this.finish()
       break
     default:
       console.warn(`Screen '${MainScreenComponent.getRegisteredRoute()}' received unmapped button id '${buttonId}'`)
       break
   }
 }
  ...
}
```

Once all of the screen components have been created, they will need to be registered using Electrode Native Navigation's <a href="#AppNavigator">AppNavigator</a> class, like this:

```js
import { AppNavigator } from 'ern-navigation'
...
new AppNavigator({
  'MainScreen': MainScreenComponent,
  'SecondScreen': SecondScreenComponent
  ...
}, {
  initialScreen: 'MainScreen'
}).registerAll('MyMiniApp')
```

In this example, the `MainScreenComponent` and `SecondScreenComponent` are referred to as `MainScreen` and `SecondScreen`, respectively, whenever any navigation is performed.  From inside any of the screen components, calling `this.navigateInternal(screenName)` will navigate to the specified registered screen.

## Example
This [MoviesReloaded](https://github.com/electrode-io/movies-reloaded-miniapp) miniapp outlines the different mechanisms that are provided to you by Electrode Native Navigation.

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
import { AppNavigator } from 'ern-navigation'
new AppNavigator({
  'MainScreen': MainScreenComponent,
  'SecondScreen': SecondScreenComponent
}, {
  initialScreen: 'MainScreen'
}).registerAll('MyMiniApp')
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

<a name="new_Component_new"></a>

### new Component()
<u><b>NOTE</b></u>:<br>
If overriding <code>componentWillUnmount</code> or <code>componentWillUpdate</code>, you <u><b>must</b></u> call the
appropriate super method - <code>super.componentWillUnmount()</code> or
<code>super.componentWillUpdate(nextProps, nextState)</code>, respectively.

**Example**  
```js
import { Component } from 'ern-navigation'
...
export default MainScreenComponent extends Component {
  static displayName = 'Main Screen'
  static navigationOptions = {
    title: 'My Application',
    buttons: [{
      icon: Image.resolveAssetSource(exitIcon).uri,
      id: 'exit',
      location: 'right',
      accessibilityLabel: 'Exit this app'
    }]
  }
 onNavButtonPress (buttonId) {
   switch (buttonId) {
     case 'exit':
       this.finish()
       break
     default:
       console.warn(`Screen '${MainScreenComponent.getRegisteredRoute()}' received unmapped button id '${buttonId}'`)
       break
   }
 }
  ...
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
Must be overriden in subclasses.

**Kind**: static abstract method of [<code>Component</code>](#Component)  

| Param | Type | Description |
| --- | --- | --- |
| jsonPayload | <code>Object</code> | The JSON payload for the current route. |

<a name="Component.onNavButtonPress"></a>

### *Component.onNavButtonPress(buttonId)*
Handle button press events.
Must be overriden in subclasses.

**Kind**: static abstract method of [<code>Component</code>](#Component)  

| Param | Type | Description |
| --- | --- | --- |
| buttonId | <code>string</code> | The ID of the button which was pressed. |

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
| buttons | [<code>Array.&lt;Button&gt;</code>](#Button) | The [Button](#Button)s to display on the navigation bar. |

<a name="Button"></a>

## Button : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| icon | <code>string</code> |  | The location of the icon (use <code>Image.resolveAssetSource(iconFile).uri</code>) or the name of a built-in icon. |
| id | <code>string</code> |  | The ID of the button; will be used in header button events.  Cannot contain '.'. |
| [location] | <code>&#x27;left&#x27;</code> \| <code>&#x27;right&#x27;</code> | <code>&#x27;right&#x27;</code> | (optional) Where to display the icon (either 'left' or 'right'). |
| accessibilityLabel | <code>string</code> |  | The text to read out with screen-reader technology. |


* * *

&copy; 2019 WalmartLabs