import React from 'react';
import {FlatList, OpaqueColorValue, SectionList, StyleSheet, Text, View} from 'react-native';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import {RootStackNavigation} from '@/navigator/index';
import {IProductCategory} from '@/models/productCategory';
import Touchable from '@/components/Touchable';
import AddModal from './AddModal';
import {Avatar, ListItem} from "react-native-elements";
import IconFont from "@/assets/iconfont";

const mapStateToProps = ({productCategory, loading}: RootState) => {
  return {
    productCategories: productCategory.productCategories,
    loading: loading.effects['productCategory/add'],
  };
};
const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  navigation: RootStackNavigation;
}

interface IState {
  productCategories: IProductCategory[];
}

class ProductCategory extends React.Component<IProps, IState> {

  testRef = React.createRef<any>();
  state = {
    productCategories: this.props.productCategories,
    modalVisible: false,
    selectedId: '',
    selectedCategory: {
      _id: '',
      name: '',
    },
  };

  setModalVisible = (visible: boolean) => {
    this.setState(Object.assign({}, this.state, {modalVisible: visible}));
  };

  onPress = (item: IProductCategory) => {
    this.setState(
      Object.assign({}, this.state, {
        selectedId: item._id,
        selectedCategory: item,
        modalVisible: true,
      }),
    );
  };
  renderItem = ({index, item}: any) => {
    const backgroundColor =
      item._id === this.state.selectedId ? 'lightgray' : '#fff';
    // return (
    //   <Touchable
    //     key={item._id}
    //     onPress={() => this.onPress(item)}
    //     style={[{backgroundColor}, styles.itemContainer]}>
    //     <Text style={styles.title}>{item.name}</Text>
    //   </Touchable>
    // );
    return (
      <Touchable>
        <ListItem key={index} bottomDivider>
          <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
          </ListItem.Content>
          <IconFont name='next-m' />
        </ListItem>
      </Touchable>
    )
    // return <Item item={item.name} onPress={this.onPress} style={backgroundColor} />;
  };

  onChange = () => {
    console.log('hello', this.child.current);
    this.child.showModal();
  }

  child: any = React.createRef();
  data = [];

  getKey = (_: any, index: number) => {
    return index.toString();
  }

  get emptyComponent() {
    const {productCategories} = this.props;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.middleContainer}>
          <View style={styles.categoryContainer}>
              <FlatList
                data={productCategories}
                keyExtractor={this.getKey}
                renderItem={this.renderItem}
              />
            <Touchable style={styles.itemContainer} onPress={this.onChange}>
              <Text style={styles.addCategoryText}>增加</Text>
            </Touchable>
          </View>
          <View style={styles.categoryContainer}>
            <Text>guofu2</Text>
          </View>
        </View>
        {/*<View style={styles.bottomContainer}>*/}
        {/*  <View style={styles.bottomTextContainer}>*/}
        {/*    <Text style={[styles.bottomText, styles.bottomLeftText]}>删除</Text>*/}
        {/*  </View>*/}
        {/*  <View style={styles.bottomTextContainer}>*/}
        {/*    <Text style={styles.bottomText}>编辑</Text>*/}
        {/*  </View>*/}
        {/*</View>*/}
      </View>
    )
  }

  get headerComponent() {
    const {selectedCategory, modalVisible} = this.state;
    return (
      <View>
        <AddModal childRef={(ref: any) => (this.child = ref)} modalVisible={modalVisible} />
        <View style={styles.topContainer}>
          <Text style={styles.topItemText}>当前类别: </Text>
          <Text style={styles.topItemText}>{selectedCategory.name}</Text>
        </View>
      </View>
    )
  }

  get footerComponent() {
    return (
      <View>
        <View style={styles.bottomContainer}>
          <View style={styles.bottomTextContainer}>
            <Text style={[styles.bottomText, styles.bottomLeftText]}>删除</Text>
          </View>
          <View style={styles.bottomTextContainer}>
            <Text style={styles.bottomText}>编辑</Text>
          </View>
        </View>
      </View>
    )
  }

  renderItem2 = ({item}: any) => {
    return (
      <View>
        <Text>
          {item.name}
        </Text>
      </View>
    )
  }

  render() {
    const {productCategories} = this.props;
    console.log("index state got change", productCategories);
    return (
      // <SectionList
      //   sections={this.data}
      //   keyExtractor={(_id) => _id}
      //   ListEmptyComponent={this.emptyComponent}
      //   ListHeaderComponent={this.headerComponent}
      //   ListFooterComponent={this.footerComponent}
      //   contentContainerStyle={styles.testContainer}
      // />
      <FlatList
        data={productCategories}
        renderItem={this.renderItem}
        keyExtractor={(item) => {
          return item._id;
        }}
      />
    );
  }
}

const borderColor = 'black';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 5,
    borderColor: 'yellow',
    justifyContent: 'space-between',
  },
  topContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: borderColor,
  },
  topItemText: {
    padding: 10,
    fontSize: 15,
  },
  middleContainer: {
    flexDirection: 'row',
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: borderColor,
  },
  categoryContainer: {
    flex: 0.5,
    borderRightWidth: 1,
    borderRightColor: borderColor,
    alignItems: 'stretch',
    flexWrap: "nowrap",
    overflow: 'scroll'
  },
  itemContainer: {
    alignItems: 'center',
    padding: 15,
    width: '100%',
  },
  addCategoryText: {
    fontSize: 16,
    color: 'green',
  },
  title: {
    fontSize: 16,
  },
  bottomContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  bottomTextContainer: {
    borderWidth: 1,
  },
  bottomText: {
    fontSize: 20,
  },
  bottomLeftText: {
    color: 'red',
  },
  testContainer: {
    flex: 1,
  }
});

export default connector(ProductCategory);
