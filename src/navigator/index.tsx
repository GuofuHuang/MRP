import React from 'react';
import {NavigationContainer, NavigationState} from '@react-navigation/native';
import {
  createStackNavigator,
  HeaderStyleInterpolators,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {getActiveRouteName} from '../utils';
import BottomTabs from '@/navigator/BottomTabs';
import {Platform, StyleSheet, StatusBar} from 'react-native';

const Stack = createStackNavigator();
//
// function HomeScreen() {
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }

class Navigator extends React.Component {
  state = {
    routeName: 'Root',
  };
  componentDidMount() {
    // SplashScreen.hide();
  }
  onStateChange = (state: NavigationState | undefined) => {
    if (typeof state !== 'undefined') {
      const routeName = getActiveRouteName(state);
      this.setState({
        routeName,
      });
    }
  };
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            ...Platform.select({
              android: {
                headerStatusBarHeight: StatusBar.currentHeight,
              },
            }),
            headerBackTitleVisible: false,
            headerTintColor: '#333',
            headerStyle: {
              ...Platform.select({
                android: {
                  elevation: 0,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                },
              }),
            },
          }}>
          <Stack.Screen name="Home" component={BottomTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Navigator;
