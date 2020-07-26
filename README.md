# rnn-hooks

An Alternative API for [react-native-navigation](https://github.com/wix/react-native-navigation).

## Motivation
[react-native-navigation](https://github.com/wix/react-native-navigation) is a great library, but the API it offers is low level which sometimes is a little hard to work with.
rnn-hooks attempts to provide an alternative API which is type-safe, simple and easy to work with. For example, there will be no need to keep of track of the current `componentId` to perform navigation actions. It will be handled internally by rnn-hooks.

## Installation

```sh
yarn add rnn-hooks
```

## Usage

1. Create your screen with a `navId` property.

    ```
    export class HomeScreen extends React.Component {
      static navId = 'HomeScreen';
    
      static options(): Options {
        return {
          topBar: {
            title: {
              text: 'Home',
            },
          },
          bottomTab: {
            text: 'Home',
          },
        };
      }
    
      render() {
        return <HomePage />;
      }
    }
    ```

2. Register your screen using `withNavProvider` HOC.

    ```
    const SCREENS = [HomeScreen, SettingsScreen, AboutScreen, RandomScreen];
    
    export const registerScreens = () => {
      SCREENS.forEach(screen =>
        Navigation.registerComponent(screen.navId, () => withNavProvider(screen)),
      );
    };
    ```

3. import `useNav` and start pushing screens.

    ```
      const nav = useNav();
    
      const handlePush = () => {
        nav.push(RandomScreen, { color: 'red' });
      };
    ```

For a more detailed example, please check this [project](https://github.com/alradadi/react-native-typescript-app)

## API

- useNav 
    ```
    const nav = useNav();
  
    nav.push(RandomScreen, { color: 'red' });
    nav.showModal(RandomScreen, { color: 'red' });
    nav.showOverlay(RandomScreen, { color: 'red' });
    nav.mergeOptions({ topBar: { title: { text: 'Random Screen' } } });
    nav.dismissAllModals();
    nav.dismissModal();
    nav.dismissOverlay();
    nav.pop();
    nav.popToRoot();
    ```
- useNavButtonPressed 

    ```
    useNavButtonPressed(buttonId => {
        if (buttonId === YOUR_BUTTON_ID) {
            // handle press
        }
	});
    ```
## License

MIT
