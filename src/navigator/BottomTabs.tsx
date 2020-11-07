import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, View, Image} from 'react-native';
import IconFont from '@/assets/iconfont';
import Login from '@/pages/Login';
import {Avatar} from "react-native-elements";
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import Home from "@/pages/Home";
import Account from "@/pages/Account";

export type BottomTabParamList = {
  HomeTabs: undefined;
  Listen: undefined;
  Found: undefined;
  Account: undefined;
};

const Tab = createBottomTabNavigator();
const users = [
  {
    name: 'brynn',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
  },
  {
    name: 'brynn',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
  },
  {
    name: 'brynn',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
  },
]

function HomeScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Card>
        <Card.Title>CARD WITH DIVIDER</Card.Title>
        <Card.Divider/>
        {
          users.map((u, i) => {
            return (
              <View key={i}>
                <Image
                  resizeMode="cover"
                  source={{ uri: u.avatar }}
                />
                <Text>{u.name}</Text>
              </View>
            );
          })
        }
      </Card>

      <Avatar
        source={{
          uri:
            'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        }}
      >
      </Avatar>

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
          component={Home}
          options={{
            tabBarLabel: '首页',
            tabBarIcon: ({color, size}) => (
              <IconFont name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Hello"
          component={Account}
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
