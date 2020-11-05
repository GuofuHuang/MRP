import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, View} from 'react-native';
import IconFont from "@/assets/iconfont";
export type BottomTabParamList = {
  HomeTabs: undefined;
  Listen: undefined;
  Found: undefined;
  Account: undefined;
};

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
    </View>
  );
}
function HomeScreen1() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home 1212</Text>
    </View>
  );
}

class BottomTabs extends React.Component {
  render() {
    return (
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#f86442',
        }}>
        <Tab.Screen
          name="HomeTabs"
          component={HomeScreen}
          options={{
            tabBarLabel: '首页',
            tabBarIcon: ({color, size}) => (
              <IconFont name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Hello"
          component={HomeScreen1}
          options={{
            tabBarLabel: '我的',
            tabBarIcon: ({color, size}) => (
              <IconFont name="me" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

export default BottomTabs;
