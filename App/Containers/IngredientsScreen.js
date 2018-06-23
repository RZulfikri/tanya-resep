import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, TextInput, FlatList, Image, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import BahanActions from '../Redux/BahanRedux'

import CustomHeader from '../Components/CustomHeader'

import {Colors, Images, Fonts} from '../Themes'
// Styles
import styles from './Styles/IngredientsScreenStyle'

class IngredientsScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      isRefreshing: false,
      selected: [],
      listBahan: []
    }
    this.onSearch = this.onSearch.bind(this)
    this.renderItem = this.renderItem.bind(this)
    this.onChangeText = this.onChangeText.bind(this)
    this.onResetInput = this.onResetInput.bind(this)
    this.onSelectItem = this.onSelectItem.bind(this)

    this.onRefresh = this.onRefresh.bind(this)
    this.onLoadMore = this.onLoadMore.bind(this)
  }

  static navigationOptions = ({ navigation }) => {
    const {params} = navigation.state
    let pressRight = () => null
    let selected = []
    if (params) {
      if (params.callback) pressRight = params.callback
      if (params.selected) selected = params.selected
    }

    return ({
      header: <CustomHeader 
        onPressLeft={() => navigation.goBack()}
        onPressRight={() => {
          navigation.goBack()
          selected.length > 0 && pressRight(selected)
        }}
        title={'PILIH BAHAN'} iconLeft={'cancel'} iconRight={'save'} />
    })
  }

  componentWillMount() {
    const {params} = this.props.navigation.state
    this.setState({
      isRefreshing: true
    }, () => this.props.getBahan({}))
  }

  componentWillReceiveProps(nextprops) {
    let {isRefreshing, listBahan} = this.state
    const {bahan} = nextprops

    if (!bahan.fetching && isRefreshing) {
      if (bahan.payload) {
        isRefreshing = false
        listBahan = bahan.payload.data
      }
    }

    this.setState({isRefreshing, listBahan})
  }

  onChangeText(text) {
    this.setState({search: text})
  }

  onResetInput() {
    this.setState({search: '', isRefreshing: true}, () => this.props.getBahan({}))
  }

  onSelectItem(item) {
    let {selected} = this.state
    
    const index = selected.findIndex(data => data.id === item.id)

    if (index >= 0) {
      selected.splice(index, 0)
    } else {
      selected.push(item)
    }

    this.setState({selected}, () => this.props.navigation.setParams({...this.props.navigation.state.params, selected}))
  }

  onSearch () {
    const {search} = this.state
    params = {
      search
    }

    this.setState({
      isRefreshing: true,
    }, () => this.props.getBahan(params))
  }

  onRefresh () {
    const {search} = this.state
    params = {
      search
    }

    this.setState({
      isRefreshing: true,
    }, () => this.props.getBahan(params))
  }

  onLoadMore () {

  }

  renderItem ({item}) {
    const {selected} = this.state

    const isSelected = selected.findIndex(data => data.id === item.id) >= 0

    return (
      <View style={{height: 45, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: Colors.orange}}>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => this.onSelectItem(item)}>
          <View style={{width: 16, height: 16, borderRadius: 8, backgroundColor: isSelected ? Colors.orange : Colors.snow, borderWidth: 2, borderColor: Colors.orange, marginHorizontal: 10}} />
          <Text style={{fontSize: Fonts.size.input, fontFamily: Fonts.type.base}}>{item.nama}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render () {
    const {search, isRefreshing, selected, listBahan} = this.state

    const data = [...listBahan]

    return (
      <View style={[styles.container]}>
        <View style={{flexDirection: 'row', borderColor: Colors.orange, borderWidth: 1, borderRadius: 5, marginBottom: 3, elevation: 5}}>
          <TextInput 
            underlineColorAndroid={'transparent'}
            style={{fontSize: Fonts.size.input, flex:1, fontFamily: Fonts.type.base}}
            placeholder={'Cari bahan masakan'}
            returnKeyType={'search'}
            onSubmitEditing={this.onSearch}
            value={search}
            onChangeText={this.onChangeText}
          />
          {search.length > 0 && <TouchableOpacity onPress={this.onResetInput} style={{width: 50, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={Images.iconClose} style={{width: 15, height: 15, tintColor: Colors.orange}} />
          </TouchableOpacity>}
        </View>
        <FlatList 
          contentContainerStyle={[{flexGrow: 1}, data.length === 0 && {justifyContent: 'center', alignItems: 'center'}]}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          data={data}
          renderItem={this.renderItem}
          ListEmptyComponent={() =>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text>Bahan masakan tidak ditemukan</Text>
            </View>
          }
          onEndReachedThreshold={0.1}
          onEndReached={this.onLoadMore}
          onRefresh={this.onRefresh}
          refreshing={isRefreshing}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    bahan: state.bahan.getBahan
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBahan: (params) => dispatch(BahanActions.getBahanRequest(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IngredientsScreen)
