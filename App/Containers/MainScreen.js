import React, { Component, PureComponent } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import Timer from 'timer.js'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import ResepActions from '../Redux/ResepRedux'

import CustomHeader from '../Components/CustomHeader'

// Styles
import { Metrics, Colors, Images, Fonts } from '../Themes'
import styles from './Styles/MainScreenStyle'

const {width, height} = Dimensions.get('window')

const UserContainer = (props) => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 5, flex: 1}}>
      <View style={{flexWrap: 'wrap', maxWidth: 0.8 * width, marginRight: 5, paddingHorizontal: 15, paddingVertical: 7, borderRadius: 20, backgroundColor: Colors.orange}}>
        <Text style={{fontFamily: Fonts.type.base, fontSize: Fonts.size.regular, color: Colors.snow}}>{props.message}</Text>
      </View>
      <View style={{width: 38, height: 38, borderRadius: 19, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.orange}}>
        <Text style={{textAlign: 'center', fontFamily: Fonts.type.bold, fontSize: Fonts.size.h6, color: Colors.snow}}>U</Text>
      </View>
    </View>
  )
}

const UserOption = (props) => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 5}}>
    <TouchableOpacity onPress={props.action}>
      <View style={{marginRight: 43, paddingHorizontal: 15, paddingVertical: 7, borderRadius: 20, backgroundColor: Colors.lightOrange}}>
        <Text style={{textAlign: 'right', fontFamily: Fonts.type.base, fontSize: Fonts.size.input, color: Colors.snow}}>{props.message}</Text>
      </View>
    </TouchableOpacity>
    </View>
  )
}

UserOption.defaultProps = {
  message: 'message',
  action: () => null
}

const CompContainer = (props) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
      <View style={{width: 38, height: 38, borderRadius: 19, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.lightOrange}}>
        <Image source={Images.logoChef} style={{width: 27, height: 27}} />
      </View>
      <View style={{marginLeft: 5,maxWidth: 0.8 * width, paddingHorizontal: 15, paddingVertical: 7, borderRadius: 20, backgroundColor: Colors.lightOrange}}>
        <Text style={{fontFamily: Fonts.type.base, fontSize: Fonts.size.regular, color: Colors.snow}}>{props.message}</Text>
      </View>
      {props.action && <TouchableOpacity onPress={props.action} style={{marginLeft: 5, width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.lightOrange, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={Images.iconExport} style={{width: 20, height: 20}} />
      </TouchableOpacity>}
    </View>
  )
}

CompContainer.defaultProps = {
  message: 'message'
}

const NONE = 0
const COM_INITIAL = 1
const COM_NEXT_INITIAL = 2
const ACTION_INITIAL = 3
const USER_PILIH_BAHAN = 4
const COM_PILIH_BAHAN = 5
const COM_DAPAT_BAHAN = 6
const COM_TAMPILKAN_RESEP = 7
const ACTION_NEXT = 8

// const RESPON_INPUT = 3

class MainScreen extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      content: [],
      action: [],
      bahanMasakan: [],
      hasilPencarian: [],
      answerCondition: COM_INITIAL,
      nextAnimation: true
    }
    this.isFetching = false
    this.callbackPilihBahan = this.callbackPilihBahan.bind(this)
    this.renderCondition = this.renderCondition.bind(this)

    this.indexBahanMasakan = 0
    this.indexHasilPencarian = 0
    this.indexTampilkanResep = 0
  }

  static navigationOptions = ({ navigation }) => {
    return ({
      header: <CustomHeader title={'CARI RESEP'} iconLeft={null} iconRight={null} />
    })
  }

  componentWillReceiveProps(nextProps) {
    const {resep} = nextProps
    let {hasilPencarian, answerCondition} = this.state

    if (this.isFetching && !resep.fetching) {
      if (resep.payload) {
        hasilPencarian.push(resep.payload.data)
        answerCondition = COM_DAPAT_BAHAN
      }
    }

    this.setState({
      hasilPencarian,
      answerCondition
    })
  }

  checkRenderUserCondition = () => {
    let { content, answerCondition } = this.state
    let nextCondition = NONE
    let message = ''

    const nextTimer = new Timer()
    
    switch (answerCondition) {
      case USER_PILIH_BAHAN:
        nextCondition = COM_PILIH_BAHAN
        content.push({
          key: answerCondition
        })
      break
    }

    nextTimer.start(2)
    .on('start', () => {
      this.setState({
        nextAnimation: false
      })
    })
    .on('end', () => {
      this.setState({
        content,
        answerCondition: nextCondition,
        nextAnimation: true
      })
    })
  }

  checkRenderCompCondition = () => {
    let { content, answerCondition, bahanMasakan, hasilPencarian } = this.state
    let nextCondition = NONE
    let arrayBahan = []
    let nextFunction = () => null
    const nextTimer = new Timer()
    
    switch (answerCondition) {
      case COM_INITIAL:
        nextCondition = COM_NEXT_INITIAL
        content.push({
          key: answerCondition
        })
      break
      case COM_NEXT_INITIAL:
        nextCondition = ACTION_INITIAL
        content.push({
          key: answerCondition
        })
      break
      case COM_PILIH_BAHAN:
        nextCondition = NONE
        arrayBahan = bahanMasakan[bahanMasakan.length - 1].map(data => data.id)
        this.isFetching = true
        nextFunction = () => this.props.getResep({bahan: `[${arrayBahan.toString()}]`})
        content.push({
          key: answerCondition
        })
      break
      case COM_DAPAT_BAHAN:
        nextCondition = COM_TAMPILKAN_RESEP
        content.push({
          key: answerCondition
        })
      break
      case COM_TAMPILKAN_RESEP:
        nextCondition = ACTION_NEXT
        content.push({
          key: answerCondition
        })
      break
    }

    nextTimer.start(2)
    .on('start', () => {
      this.setState({
        nextAnimation: false
      })
    })
    .on('end', () => {
      this.setState({
        content,
        nextAnimation: true,
        answerCondition: nextCondition
      }, nextFunction)
    })
  }

  checkActionCondition() {
    let { action, answerCondition, nextAnimation } = this.state
    const nextTimer = new Timer()
    let nextCondition = NONE
    
    switch (answerCondition) {
      case ACTION_INITIAL:
        nextCondition = NONE
        action.push({key: answerCondition})
      break
      case ACTION_NEXT:
        nextCondition = NONE
        action.push({key: answerCondition})
      break
    }

    nextTimer.start(2)
    .on('start', () => {
      this.setState({
        nextAnimation: false
      })
    })
    .on('end', () => {
      this.setState({
        action,
        answerCondition: nextCondition,
        nextAnimation: true
      })
    })
  }

  callbackPilihBahan(seleted) {
    let {bahanMasakan} = this.state
    
    bahanMasakan.push(seleted)
    this.setState({
      bahanMasakan,
      action: [],
      answerCondition: USER_PILIH_BAHAN
    })
  }

  renderCondition(condition) {
    const {bahanMasakan, hasilPencarian} = this.state
    const {navigation} = this.props

    switch(condition) {
      case COM_INITIAL: return <CompContainer message={'hello'} />
      case COM_NEXT_INITIAL: return <CompContainer message={'mau masak apa hari ini ?'} />
      case COM_PILIH_BAHAN: return <CompContainer message={'tunggu sebentar'} />
      case COM_DAPAT_BAHAN: 
        const count = hasilPencarian[this.indexHasilPencarian].length
        this.indexHasilPencarian += 1
        return <CompContainer message={`aku menemukan ${count} resep yang mungkin kamu suka`} />
      case COM_TAMPILKAN_RESEP:
        const resepMasakan = hasilPencarian[this.indexTampilkanResep]
        const bahanCari = bahanMasakan[this.indexTampilkanResep]

        this.indexTampilkanResep += 1        
        return <CompContainer message={'lihat resep masakan'} action={() => navigation.navigate('ResepListScreen', {resepMasakan, bahanCari})} />


      case USER_PILIH_BAHAN: 
        let message = bahanMasakan[this.indexBahanMasakan].map((item, index) => {
          if (index < bahanMasakan[this.indexBahanMasakan].length - 1 ) {
            return item.nama + ', '
          } else {
            return item.nama
          } 
        })
        this.indexBahanMasakan += 1
        return <UserContainer message={message} />
    }
  }

  renderAction(action) {
    switch(action) {
      case ACTION_INITIAL: return <UserOption message={'pilih bahan masakan'} 
      action={() => this.props.navigation.navigate('IngredientsScreen', {callback: this.callbackPilihBahan})} />
      case ACTION_NEXT: return <View>
        <UserOption message={'cari resep lain'} action={() => this.props.navigation.navigate('IngredientsScreen', {callback: this.callbackPilihBahan})} />
        <UserOption message={'selesai'} action={() => this.props.navigation.goBack()} />
      </View>
    }
  }

  render () {
    const { content, action, answerCondition, nextAnimation } = this.state
    this.indexBahanMasakan = 0
    this.indexHasilPencarian = 0
    this.indexTampilkanResep = 0

    if (answerCondition !== NONE && nextAnimation) {
      this.checkRenderCompCondition()
      this.checkActionCondition()
      this.checkRenderUserCondition()
    }

    return (
      <ScrollView 
        ref={ref => this.scrollView = ref}
        onContentSizeChange={(contentWidth, contentHeight)=>{        
            this.scrollView.scrollToEnd({animated: true});
        }}
        contentContainerStyle={{flexGrow: 1, backgroundColor: Colors.snow, paddingVertical: 10}} style={[styles.container, {paddingHorizontal: Metrics.marginHorizontal}]}>
        <View style={{flex: 1}}>
          {content.map((item, index) => {
            return <View key={index}>{this.renderCondition(item.key)}</View>
          })}
        </View>
        <View style={action.length > 0 && {marginVertical: 10}}>
          {action.map((item, index) => {
            return <View key={index}>{this.renderAction(item.key)}</View>
          })}
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    resep: state.resep.getResep
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getResep: (params) => dispatch(ResepActions.getResepRequest(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
