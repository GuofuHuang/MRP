import React from "react";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {FlatList, SafeAreaView, StyleSheet, ScrollView, Text, View, StatusBar} from "react-native";
import Touchable from "@/components/Touchable";
import IconFont from "@/assets/iconfont";
import {IComponent} from "@/pages/Home/index";

const mapStateToProps = ({home, loading}: RootState) => {
  return {
    home: home,
    loading: loading.effects['productCategory/loadCategories']
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;
// interface IProps extends ModelState {
//   navigation: RootStackNavigation;
//   namespcae: string;
// }

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

interface IProps extends ModelState {
  component: IComponent;
}

class ComponentContainer extends React.Component<IProps, any> {

  state = {
    component: this.props.component,
  }
  goTo = () => {
    const {component, dispatch} = this.props;
    dispatch({
      type: component.namespace + '/loadCategories',
      payload: {
        component: component.name,
        parentCategoryId: null,
        level: 0
      }
    })
    // navigate(module.namespace);
  }

  render() {
    const {component, loading} = this.props;

    return (
      <View style={styles.container}>
        <Touchable disabled={loading} onPress={this.goTo} style={styles.center}>
          <IconFont name={component.icon} color={'red'} size={30} />
          <Text>{component.header}</Text>
        </Touchable>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  center: {
    alignItems: 'center',
  }
});

export default connector(ComponentContainer);
