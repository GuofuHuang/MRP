import React from "react";
import {connect, ConnectedProps} from "react-redux";
import {RootStackNavigation} from "@/navigator/index";
import {IProductCategory} from "@/models/productCategory";
import {RootState} from "@/models/index";
import {ListRenderItemInfo, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View} from "react-native";
import Test from "@/pages/ProductCategory/test";
import {SwipeListView} from "react-native-swipe-list-view";
import Touchable from "@/components/Touchable";
import {navigate} from "@/utils/index";
import {ListItem} from "react-native-elements";
import IconFont from "@/assets/iconfont";
import {IComponent} from "@/pages/Home";


const mapStateToProps = ({productCategory, loading}: RootState) => {
  return {
    productCategories: productCategory.productCategories,
    loading: loading.effects['productCategory/loadCategories'],
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  navigation: RootStackNavigation;
  route: any;
  component: IComponent;
}

interface IState {
  productCategories: IProductCategory[];
  title: string;
}


class ProductCategoryList extends React.Component<IProps, IState> {
  state = {
    productCategories: this.props.route.params.productCategories,
    title: ''
  };

  componentDidMount() {
    console.log('did mount');
  }

  goTo = (index: number, item: IProductCategory) => {
    console.log('goto', item);
    navigate('CategoryDetail', item);
    // this.setState(
    //   Object.assign({}, this.state, {
    //     selectedId: item._id,
    //     selectedCategory: item,
    //     modalVisible: true,
    //   }),
    // );
  };

  goTo1 = (index: number, item: IProductCategory) => {
    const {dispatch} = this.props;

    console.log('goto 1');
    dispatch({
      type: 'productCategory/loadCategories',
      payload: {
        component: 'ProductCategoryList',
        parentCategoryId: item._id,
        level: item.level + 1,
        title: item.name
      }
    })
    // navigate(module.namespace);
  }

  renderItem = ({index, item}: any) => {
    const {loading} = this.props;

    return (
      <TouchableHighlight
        disabled={loading}
        key={index}
        onPress={() => this.goTo1(index, item)}
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
  renderHiddenItem = (data: any, rowMap: any) => (
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

  render () {
    const {productCategories} = this.props.route.params;
    return (
      <View style={styles.container}>
        <SwipeListView
          useFlatList
          disableRightSwipe
          data={productCategories}
          renderItem={this.renderItem}
          keyExtractor={(_, index) => {
            return `${index}`;
          }}
          renderHiddenItem={ (rowData: any, rowMap: any) => (
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
      </View>    )
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

export default connector(ProductCategoryList);
