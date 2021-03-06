import React from 'react';
import {
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import {RootStackNavigation} from '@/navigator/index';
import {IProductCategory} from '@/models/productCategory';
import Touchable from '@/components/Touchable';
import {Avatar, ListItem} from "react-native-elements";
import IconFont from "@/assets/iconfont";
import {navigate} from "@/utils/index";
import { SwipeListView } from 'react-native-swipe-list-view';
import Test from "@/pages/ProductCategory/test";

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

  goTo = (index: number, item: IProductCategory) => {
    navigate('CategoryDetail', item);
    // this.setState(
    //   Object.assign({}, this.state, {
    //     selectedId: item._id,
    //     selectedCategory: item,
    //     modalVisible: true,
    //   }),
    // );
  };

  renderItem = ({index, item}: any) => {
    return (
      <TouchableHighlight
        key={index}
        onPress={() => this.goTo(index, item)}
      >
        <ListItem key={index} bottomDivider>
          <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
          </ListItem.Content>
          <IconFont name='next-m' />
        </ListItem>
      </TouchableHighlight>
    )
  };

  onChange = () => {
    this.child.showModal();
  }

  child: any = React.createRef();
  data = [];

  getKey = (_: any, index: number) => {
    return index.toString();
  }
  renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <Text>Left</Text>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
      >
        <Text style={styles.backTextWhite}>Close</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
      >
        {/*<Text style={styles.backTextWhite}>Delete</Text>*/}
      </TouchableOpacity>
    </View>
  );

  deleteRow = ({index, item}: ListRenderItemInfo<IProductCategory>, rowMap: any) => {
    rowMap[index].closeRow();
  }

  editRow = ({index, item}: ListRenderItemInfo<IProductCategory>, rowMap: any) => {
    rowMap[index].closeRow();
    navigate('CategoryDetail', item);
  }

  render() {
    const {productCategories} = this.props;
    return (
      // <SectionList
      //   sections={this.data}
      //   keyExtractor={(_id) => _id}
      //   ListEmptyComponent={this.emptyComponent}
      //   ListHeaderComponent={this.headerComponent}
      //   ListFooterComponent={this.footerComponent}
      //   contentContainerStyle={styles.testContainer}
      // />
      // <FlatList
      //   data={productCategories}
      //   renderItem={this.renderItem}
      //   keyExtractor={(item) => {
      //     return item._id;
      //   }}
      // />


      <View style={styles.container}>
        <SwipeListView
          useFlatList
          disableRightSwipe
          data={productCategories}
          renderItem={this.renderItem}
          keyExtractor={(_, index) => {
            return `${index}`;
          }}
          renderHiddenItem={ (rowData, rowMap) => (
            <View style={styles.rowBack}>
              <Touchable style={[styles.backRightBtn, styles.backRightBtnLeft]}
                onPress={() => this.editRow(rowData, rowMap)}
              >
                <Text style={styles.backTextWhite}>Edit</Text>
              </Touchable>
              <Touchable style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => this.deleteRow(rowData, rowMap)}
              >
                <Text style={styles.backTextWhite}>Delete</Text>
              </Touchable>
            </View>
          )}
          rightOpenValue={-150}
          previewOpenValue={-1}
          previewOpenDelay={3000}
        />
      </View>
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
  },



  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: '#73b30f',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: '#f14848',
    right: 0,
  },
});

export default connector(ProductCategory);
