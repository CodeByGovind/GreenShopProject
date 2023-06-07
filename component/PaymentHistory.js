import React, { Component } from 'react'
import { connect } from 'react-redux'
import { historyList } from '../component/ReduxThunk/Actions/VegetableActions'
import {
  Text, View, FlatList, Button, StyleSheet, Image,
} from 'react-native'
import Moment from 'moment';
import { Card } from 'react-native-shadow-cards';
import LinearGradient from 'react-native-linear-gradient'
class PaymentHistory extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hist_list: []
    }
  }

  componentDidMount() {
    this.props.getList("7878121201")
    setTimeout(() => {
      const newData = this.props.list.map(item => item)
      this.setState({
        hist_list: newData
      })
    }, 1000);
  }

  render() {
    console.log("History:->", this.props.list)
    return (
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={['#33ccff', '#ff99cc']}
          style={styles.container}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}>
          <FlatList
            contentContainerStyle={{ paddingBottom: 100 }}
            data={this.state.hist_list}
            renderItem={({ item, index }) =>
              <View>
                <Card style={{ padding: 10, margin: 15, borderRadius: 20 }}>
                  <View style={{ flexDirection: 'column' }}>
                  <Text style={{fontSize:30,fontWeight:'bold',color:'black'}}>{index+1}.</Text>
                    <Text style={styles.textStyle}>Customer ID:{item.customer}</Text>
                    <Text style={styles.textStyle}>Date:{Moment(item.date).format('d MMM YYYY')}</Text>
                    <Text style={styles.textStyle}>Payment Status:{item.payment_status}</Text>
                    <Text style={styles.textStyle}>Payment Mode:{item.payment_mode}</Text>
                    <Text style={styles.textStyle}>Price:₹{item.total_amount}</Text>
                  </View>
                </Card>
              </View>
            }></FlatList>
        </LinearGradient>
        <Button
          onPress={() => this.props.navigation.navigate('Vegetables')}
          title="Go to Vegetables"
        />
      </View>
    )
  }
}
const mapStateToProps = state => {
  return {
    list: state.history.list,
    loading: state.history.loading,
    error: state.history.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getList: (d) => dispatch(historyList(d)),
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'teal',
  },

})

export default connect(mapStateToProps, mapDispatchToProps)(PaymentHistory)