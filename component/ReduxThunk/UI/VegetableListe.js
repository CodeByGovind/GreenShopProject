import React, { Component } from 'react'
import {
  Text, View, FlatList, TouchableOpacity, StyleSheet, Image,
} from 'react-native'
import { connect } from 'react-redux'
import { Vegetables } from '../Actions/VegetableActions'
import { Card } from 'react-native-shadow-cards';
import LinearGradient from 'react-native-linear-gradient'
import { addVeg } from '../../Redux/Action'
//https://cssgradient.io/
class VegetableList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      veg: [],
      button: true

    }
  }

  componentDidMount() {
    this.props.getList()
    setTimeout(() => {
      const newData = this.props.list.map(item => item)
      this.setState({
        veg: newData
      })
    }, 1000);
  }


  handleIncreQuantity = (gId) => {
    // console.log(gId)
    var newData = this.state.veg.map(item => {
      if (item.id !== gId) return item
      else return { ...item, quantity: item.quantity + 1 }
    })
    // console.log(newData)
    this.setState({
      veg: newData
    })
  }
  handleDecreQuantity = (gId) => {
    // console.log(gId)
    var newData = this.state.veg.map(item => {
      if (item.id !== gId) return item
      else return { ...item, quantity: item.quantity - 1 }
    })
    // console.log(newData)
    this.setState({
      veg: newData
    })
  }

  addToCart = (gId) => {
    // console.log(gId)
    const newRecord = this.state.veg.filter(item => item.id === gId)
    // console.log(newRecord[0])
    const obj = newRecord[0]
    var totalPrice = obj.quantity * obj.price
    const newData = {
      id: gId,
      item: obj.name,
      price: totalPrice,
      quantity: obj.quantity
    }
    console.log(newData)
    this.props.addVegItem(newData)
    this.setState({ button: false })

  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={['#33ccff', '#ff99cc']}
          style={styles.container}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}>
          <FlatList
            contentContainerStyle={{ paddingBottom: 100 }}
            data={this.state.veg}
            renderItem={({ item, index }) =>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Card style={{ padding: 10, margin: 15, borderRadius: 20 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image
                      style={styles.img}
                      source={require('../../Images/veg.jpg')}
                    />
                    {/* <Text style={styles.textStyle}>{item.image}</Text> */}

                    <View style={{ flexDirection: 'column' }}>
                      <Text style={styles.textStyle}>{item.name}</Text>
                      <Text style={styles.textStyle}>{item.category}</Text>
                      <Text style={styles.textStyle}>Price:₹{item.price}</Text>
                      {/* <Text style={styles.textStyle}>{item.id}</Text> */}

                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity
                          style={{ width: 50, height: 50 }}
                          onPress={() => this.handleIncreQuantity(item.id)}
                        >
                          <Text style={styles.increBtn}
                          >+</Text>
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontSize: 24, fontWeight: 'bold', fontStyle: 'normal',
                            textAlign: 'center'
                          }}>{item.quantity}</Text>
                        <TouchableOpacity
                          style={{ width: 50, height: 50 }}
                          onPress={() => this.handleDecreQuantity(item.id)}
                        >
                          <Text style={styles.increBtn}
                          >-</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <LinearGradient
                    colors={['rgba(8,4,73,1)', 'rgba(161,6,63,1)', 'rgba(10,146,173,1)']}
                    style={styles.container1}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}>
                    {this.state.button = false?"" : <TouchableOpacity
                      style={{ justifyContent: 'center', padding: 15, }}

                      onPress={() => this.addToCart(item.id)}
                    >
                      <Text
                        style={{
                          fontSize: 26, fontWeight: 'bold', color: 'white',
                          textAlign: 'center',
                        }}>
                        Add To Cart</Text>
                    </TouchableOpacity>
                    }
                  </LinearGradient>

                </Card>
              </View>
            }></FlatList>
        </LinearGradient>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25
  },
  textStyle: {
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'normal',
    textAlign: 'center',
    color: 'teal',
  },
  img: {
    width: 180,
    height: 180
  },
  increBtn: {
    fontSize: 32,
    fontWeight: 'bold',
    backgroundColor: '#a1063f',
    color: 'white',
    textAlign: 'center',
    borderRadius: 25
  }
})
const mapStateToProps = state => {
  return {
    list: state.vegetable.list,
    loading: state.vegetable.loading,
    error: state.vegetable.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getList: () => dispatch(Vegetables()),
    addVegItem: (v) => dispatch(addVeg(v))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VegetableList)
