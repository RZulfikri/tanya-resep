import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, FlatList } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import CustomHeader from '../Components/CustomHeader'
import ResepItem from '../Components/ResepItem'

// Styles
import styles from './Styles/ResepListScreenStyle'

class ResepListScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listResep: [],
      bahanCari: []
    }
    this.renderItem = this.renderItem.bind(this)
  }

  static navigationOptions = ({ navigation }) => {
    return ({
      header: <CustomHeader title={'HASIL PENCARIAN'} iconLeft={'back'} onPressLeft={() => navigation.goBack()} iconRight={null} />
    })
  }

  componentWillMount() {
    const {params} = this.props.navigation.state

    if (params) {
      this.setState({
        listResep: params.resepMasakan,
        bahanCari: params.bahanCari
      })
    }
  }

  renderItem({item}) {
    const {bahanCari} = this.state
    return <ResepItem data={item} action={() => this.props.navigation.navigate('ResepDetailScreen', {...item, bahanCari})} />
  }

  render () {
    const {listResep} = this.state
    const data = listResep

    return (
      <View style={styles.container}>
         <FlatList 
          contentContainerStyle={[{flexGrow: 1}, data.length === 0 && {justifyContent: 'center', alignItems: 'center'}]}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          data={data}
          renderItem={this.renderItem}
          ListEmptyComponent={() =>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text>Tidak ada resep masakan ditemukan</Text>
            </View>
          }
          // onEndReachedThreshold={0.1}
          // onEndReached={this.onLoadMore}
          // onRefresh={this.onRefresh}
          // refreshing={isRefreshing}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResepListScreen)
