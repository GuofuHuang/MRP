import React from 'react';
import {NavigationContainer, NavigationState} from '@react-navigation/native';
import {
  createStackNavigator,
  HeaderStyleInterpolators,
  CardStyleInterpolators, StackNavigationProp,
} from '@react-navigation/stack';
import BottomTabs from '@/navigator/BottomTabs';
import {Platform, StyleSheet, StatusBar} from 'react-native';
import {getActiveRouteName, navigationRef} from '../utils';
import Login from "@/pages/Login";

const Stack = createStackNavigator();
//
// function HomeScreen() {
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Text>Index Screen</Text>
//     </View>
//   );
// }
export type RootStackParamList = {
  BottomTabs: {
    screen?: string;
  };
  Category: undefined;
  Index: undefined;
  Login: undefined;
};


export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

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
      <NavigationContainer
        ref={navigationRef}
      >
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
            cardStyle: { backgroundColor: '#fff' }
          }}>
          <Stack.Screen name="Index" component={BottomTabs} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Navigator;
