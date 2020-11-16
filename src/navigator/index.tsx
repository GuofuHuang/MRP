import React from 'react';
import {NavigationContainer, NavigationState, RouteProp} from '@react-navigation/native';
import {
  createStackNavigator,
  HeaderStyleInterpolators,
  CardStyleInterpolators, StackNavigationProp,
} from '@react-navigation/stack';
import BottomTabs from '@/navigator/BottomTabs';
import {Platform, StyleSheet, StatusBar, View, Button, Text, Alert, Route} from 'react-native';
import {getActiveRouteName, navigate, navigationRef} from '../utils';
import Login from "@/pages/Login";
import ProductCategory from "@/pages/ProductCategory";
import Touchable from "@/components/Touchable";
import IconFont from "@/assets/iconfont";
import AddProductCategory from "@/pages/ProductCategory/AddProductCategory";
import {IProductCategory} from "@/models/productCategory";
import CategoryDetail from "@/pages/ProductCategory/CategoryDetail";

const Stack = createStackNavigator();

export type RootStackParamList = {
  BottomTabs: {
    screen?: string;
  };
  Category: undefined;
  Index: undefined;
  Login: undefined;
  ProductCategory: any;
};

function getOptions({route}: { route: RouteProp<RootStackParamList, 'ProductCategory'> }) {
  const {params} = route;
  return {
    headerTitle: "Product Category level" + params?.level,
    headerTitleStyle: {
      opacity: 0.5,
    },
    headerRight: () => {
      return (
        <Touchable style={{padding: 10}} onPress={(props) =>
        {
          navigate('AddProductCategory', route.params)
        }
        }>
          <IconFont name='plus' size={20} />
        </Touchable>
      );
    },
  };
}


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
          <Stack.Screen name="AddProductCategory" component={AddProductCategory} />
          <Stack.Screen name="CategoryDetail" component={CategoryDetail} />
          <Stack.Screen
            name="ProductCategory" component={ProductCategory}
            options={getOptions}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Navigator;
