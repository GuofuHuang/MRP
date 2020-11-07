import React from "react";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {RootStackNavigation} from '@/navigator/index';
import {FlatList, ListRenderItemInfo, ScrollView, StyleSheet, View} from "react-native";
import ModuleContainer from "@/pages/Home/ModuleContainer";
import { Text } from 'react-native-elements';
import Touchable from "@/components/Touchable";
import IconFont from "@/assets/iconfont";
import ListItemContainer from "@/pages/Home/ListItemContainer";

const mapStateToProps = ({home}: RootState) => {
  return {
    home: home
  };
};

const connector = connect();

type ModelState = ConnectedProps<typeof connector>;
interface IProps extends ModelState {
  navigation: RootStackNavigation;
  namespcae: string;
}

export interface IListItem {
  title: string;
  modules: IModule[];
}

export interface IModule {
  name: string;
  namespace: string;
  icon: string;
}


const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '基础模块',
    modules: [
      {
        name: "产品分类",
        namespace: 'Login',
        icon: 'category'
      },
      {
        name: "产品",
        namespace: 'Login',
        icon: 'category'
      }
    ]
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    modules: []
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    modules: []
  },
];

const Item = ({ title }: any) => (
  <View>
    <Text h1>{title}</Text>
  </View>
);


class Home extends React.Component<any, any> {
  get header() {
    const {namespace} = this.props;
    return (
      <View>
        <View>
          <Text h1>this is header</Text>
        </View>
      </View>
    );
  }

  get footer() {
    const {hasMore, loading, channels} = this.props;
    if (!hasMore) {
      return (
        <View style={styles.end}>
          <Text>-我是有底线的-</Text>
        </View>
      );
    }
    if (loading && hasMore && channels.length > 0) {
      return (
        <View style={styles.loading}>
          <Text>正在加载中</Text>
        </View>
      );
    }
  }

  get empty() {
    const {loading} = this.props;
    if (loading) {
      return;
    }
    return (
      <View style={styles.empty}>
        <Text>暂无数据</Text>
      </View>
    );
  }

  goTo = (data: any) => {
    console.log('data', data);
    const {navigation} = this.props;
    // navigation.navigate('Login');
  }

  renderItem = ({item} : ListRenderItemInfo<any>) => (
    <ListItemContainer item={item} />
    // <View style={styles.wrapper}>
    //   <View style={styles.wrapperHeaderView}>
    //     <Text style={styles.wrapperHeaderText}>{item.title}</Text>
    //   </View>
    // </View>
    // <View style={styles.wrapper}>
    //   <View style={styles.headerView}>
    //     <Text style={styles.wrapperHeaderText}>{item.title}</Text>
    //   </View>
    //   <View style={styles.contentView}>
    //     <View style={styles.categoryView}>
    //       <Touchable onPress={() => this.goTo(item)}>
    //         <IconFont name="home" color={'red'} size={30} />
    //         <Text>类别</Text>
    //       </Touchable>
    //     </View>
    //     <View style={styles.categoryView}>
    //       {/*<Touchable onPress={this.onPress}>*/}
    //       {/*  <IconFont name="iconhome" color={'red'} size={30} />*/}
    //       {/*  <Text>物料</Text>*/}
    //       {/*</Touchable>*/}
    //     </View>
    //   </View>
    // </View>
  );

  keyExtractor = (item: any) => {
    return item.id;
  };

  render() {
    return (
      <FlatList
        ListHeaderComponent={this.header}
        ListFooterComponent={this.footer}
        ListEmptyComponent={this.empty}
        data={DATA}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        onEndReachedThreshold={0.2}
      />
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
  headerView: {
    margin: 5,
  },
  contentView: {
    margin: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  categoryView: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default connector(Home);
