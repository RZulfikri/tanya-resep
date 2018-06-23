import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, Image } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import ResepActions from '../Redux/ResepRedux'

import CustomHeader from '../Components/CustomHeader'

// Styles
import styles from './Styles/ResepDetailScreenStyle'
import { Colors, Images, Fonts } from '../Themes';

class ResepDetailScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      resepDetail: null,
      bahanCari: []
    }
    this.isFetching = true

    this.isInBahanCari = this.isInBahanCari.bind(this)
  }

  static navigationOptions = ({ navigation }) => {
    return ({
      header: <CustomHeader title={'RESEP DETAIL'} iconLeft={'back'} onPressLeft={() => navigation.goBack()} iconRight={null} />
    })
  }

  componentWillMount() {
    const {params} = this.props.navigation.state
  
    if (params && params.id) {
      let param = {
        id: params.id
      }
      
      this.isFetching = true
      
      this.setState({bahanCari: params.bahanCari}, () => this.props.getResepDetail(param))
    }
  }

  componentWillReceiveProps(nextProps) {
    let {resepDetail} = this.state

    if (this.isFetching && !nextProps.resepDetail.fetching) {
      if (nextProps.resepDetail.payload) {
        resepDetail = nextProps.resepDetail.payload.data
      }
    }

    this.setState({resepDetail})
  }

  isInBahanCari(id) {
    const {bahanCari} = this.state
    const index = bahanCari.findIndex(item => item.id === id)

    if (index >=0) return true
    else return false
  }

  render () {
    const {resepDetail} = this.state

    return (
      <ScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: Colors.snow}}>
        {resepDetail === null  ?
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={Images.logoChef}  style={{width: 180, height: 180, tintColor: Colors.lightOrange}} />
            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 25}}>
              <Text style={{fontFamily: Fonts.type.base, fontSize: Fonts.size.h6, color: Colors.lightOrange}} >mohon tunggu sebentar...</Text>
            </View>
          </View>
        : <View >
          <Image source={{uri: resepDetail.photo}} style={{width: '100%', height: 250}} />
          <View style={{paddingHorizontal: 15}}>
            <View style={{marginVertical: 10}}>
              <Text style={{fontFamily: Fonts.type.bold, fontSize: Fonts.size.h5, color: Colors.orange}}>{resepDetail.judul}</Text>
            </View>
            <View>
              <Text style={{fontFamily: Fonts.type.bold, fontSize: Fonts.size.input, color: Colors.orange}}>Bahan masakan :</Text>
              {resepDetail.bahan.map(item => {
                return(
                  <Text key={item.id} style={{fontFamily: Fonts.type.base, fontSize: Fonts.size.regular, color: Colors.orange}}>
                    {item.nama}  
                    <Text style={{color: Colors.lightOrange}}>   {item.jumlah}</Text>
                    {this.isInBahanCari(item.id) && <Text style={{color: Colors.orange}}> (bahan cocok)</Text>}
                  </Text>
                )
              })}
            </View>
            <View style={{marginVertical: 10}}>
              <Text style={{fontFamily: Fonts.type.bold, fontSize: Fonts.size.input, color: Colors.orange}}>Resep masakan :</Text>
              <Text style={{fontFamily: Fonts.type.base, fontSize: Fonts.size.regular, color: Colors.orange}}>{resepDetail.resep}</Text>
            </View>
          </View>
        </View>}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    resepDetail: state.resep.getResepDetail
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getResepDetail: (params) => dispatch(ResepActions.getResepDetailRequest(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResepDetailScreen)
