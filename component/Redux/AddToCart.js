import React, { Component } from 'react'
import {
    Text, View, FlatList, TouchableOpacity, StyleSheet, Image,
} from 'react-native'
import { connect } from 'react-redux'
import { Card } from 'react-native-shadow-cards';
import { delVeg } from '../Redux/Action'
import { placeOrder } from '../ReduxThunk/Actions/VegetableActions'
import LinearGradient from 'react-native-linear-gradient'
class AddToCart extends Component {

    constructor(props) {
        super(props)
        this.state = {
            getVeg: [],
            totalPrice: 0
        }
    }
    componentDidMount() {
        this.setInitialData()
    }

    removeItemFromCart = (gId) => {
        this.props.removeVeg(gId)
        setTimeout(() => {
            this.setInitialData()
        }, 500);
    }

    setInitialData = () => {
        var newData = this.props.vegetables.map(item => item)
        let value = newData.reduce((a, v) => a = a + (v.price), 0)
        console.log("Component:", value)
        this.setState({
            totalPrice: value,
            getVeg: newData
        })
    }

    createPlaceOrder = () => {
        var newArr = [...this.state.getVeg]
        var upArr = newArr.map((item) => ({
                "item": item.item,
                "price": item.price,
                "quantity": item.quantity
        }))
        console.log(upArr)
        // this.props.orderPlaced(upArr,this.state.totalPrice)
        this.props.navigation.navigate('PaymentHistory')
    }

    render() {
        console.log("Add to Cart:", this.props.vegetables)
        return (
            <View style={{ flex: 1 }}>
                <LinearGradient
                    colors={['#33ccff', '#ff99cc']}
                    style={styles.container}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}>
                    <FlatList
                        contentContainerStyle={{ paddingBottom: 100 }}
                        data={this.props.vegetables}
                        renderItem={({ item, index }) =>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Card style={{ padding: 10, margin: 15, borderRadius: 20 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                        <Image
                                            style={styles.img}
                                            source={require('../Images/veg.jpg')}
                                        />
                                        <View style={{ flexDirection: 'column' }}>
                                            <Text style={styles.textStyle}>Name:{item.item}</Text>
                                            <Text style={styles.textStyle}>Qantity:{item.quantity}</Text>
                                            <Text style={styles.textStyle}>Price:₹{item.price}</Text>

                                            <LinearGradient
                                                colors={['rgba(8,4,73,1)', 'rgba(161,6,63,1)', 'rgba(10,146,173,1)']}
                                                style={styles.container1}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 1 }}>
                                                <TouchableOpacity
                                                    style={{ justifyContent: 'center', padding: 10, }}
                                                    onPress={() => this.removeItemFromCart(item.id)}
                                                >
                                                    <Text
                                                        style={{
                                                            fontSize: 26, fontWeight: 'bold', color: 'white',
                                                            textAlign: 'center',
                                                        }}>
                                                        Remove</Text>
                                                </TouchableOpacity>
                                            </LinearGradient>
                                        </View>
                                    </View>
                                </Card>
                            </View>
                        }></FlatList>
                    <Text style={styles.textStyle}>Total Price:₹{this.state.totalPrice}</Text>
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center', padding: 10,
                            backgroundColor: 'rgba(8,4,73,1)', width: '100%'
                        }}
                        onPress={() => this.createPlaceOrder()}
                    >
                        <Text
                            style={{
                                fontSize: 26, fontWeight: 'bold', color: 'white',
                                textAlign: 'center',
                            }}>
                            PlaceOrder</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        vegetables: state.cart.vegetables,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeVeg: (id) => dispatch(delVeg(id)),
        orderPlaced: (d, amt) => dispatch(placeOrder(d, amt))
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
        textAlign: 'center',
        color: 'teal',
    },
    img: {
        width: 120,
        height: 120
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
export default connect(mapStateToProps, mapDispatchToProps)(AddToCart)
