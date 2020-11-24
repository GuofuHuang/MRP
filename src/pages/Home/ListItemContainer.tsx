import React from "react";
import {FlatList, ListRenderItemInfo, StyleSheet, View} from "react-native";
import {Text} from "react-native-elements";
import Touchable from "@/components/Touchable";
import IconFont from "@/assets/iconfont";
import {RootState} from "@/models/index";
import {IListItem, IComponent} from "@/pages/Home/index";
import ModuleContainer from "@/pages/Home/ComponentContainer";

interface IProps {
  item: IListItem
}

class ListItemContainer extends React.Component<IProps> {

  renderItem = ({item} : ListRenderItemInfo<any>) => (
    <ModuleContainer component={item} />
  );

  keyExtractor = (_: IComponent, index: number) => {
    return index.toString();
  }

  render () {
    const {item} = this.props;
    console.log("modules", item.modules);
    return (
      <View style={styles.wrapper}>
        <View style={styles.headerContainer}>
          <Text style={styles.wrapperHeaderText}>{item.title}</Text>
        </View>
        <View style={styles.mainContainer}>
          <FlatList
            horizontal
            data={item.modules}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
          />
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  end: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  loading: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 100,
  },
  background: {
    backgroundColor: 'white',
  },
  container: {
    height: 1000,
    backgroundColor: 'white',
    borderWidth: 1,
  },
  wrapper: {
    height: 100,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  wrapperHeaderView: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 5,
  },
  wrapperHeaderText: {
    fontSize: 16,
  },
  container1: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
  },
  headerContainer: {
    margin: 5,
  },
  mainContainer: {
    margin: 5,
  },
  categoryView: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListItemContainer;
