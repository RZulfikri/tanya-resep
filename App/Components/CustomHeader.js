import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Images, Colors, Fonts } from '../Themes'
import LinearGradient from 'react-native-linear-gradient'

const CustomHeader = (props) => {
  function renderIconLeft () {
    switch(props.iconLeft) {
      case 'back': return <Image source={Images.iconLeft} style={{width: 20, height: 20, tintColor: Colors.snow}} />
      case 'cancel': return <Image source={Images.iconClose} style={{width: 20, height: 20, tintColor: Colors.snow}} />
    }
  }

  function renderIconRight () {
    switch(props.iconRight) {
      case 'save': return <Image source={Images.iconChecklist} style={{width: 25, height: 25, tintColor: Colors.snow}}  />
    }
  }

  return (
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={[Colors.lightOrange, Colors.orange]} style={{height: 60, flexDirection: 'row'}}>
        <TouchableOpacity disabled={props.iconLeft === null} onPress={props.onPressLeft} style={{width: 60, height: 60, justifyContent: 'center', alignItems: 'center'}}>
          {renderIconLeft()}
        </TouchableOpacity>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text ellipsizeMode={'tail'} numberOfLines={2} style={{fontSize: 20, fontFamily: Fonts.type.bold, color: Colors.snow}}>{props.title}</Text>
        </View>
        <TouchableOpacity disabled={props.iconRight === null} onPress={props.onPressRight} style={{width: 60, height: 60, justifyContent: 'center', alignItems: 'center'}}>
          {renderIconRight()}
        </TouchableOpacity>
    </LinearGradient>
  )
}

CustomHeader.proptypes = {
  title: PropTypes.string,
  onPressLeft: PropTypes.func,
  onPressRight: PropTypes.func,
  iconLeft: PropTypes.oneOf([null, 'back', 'cancel']),
  iconRight: PropTypes.oneOf([null, 'save'])
}

CustomHeader.defaultProps = {
  title: 'Title',
  onPressLeft: () => null,
  onPressRight: () => null,
  iconLeft: null,
  iconRight: null
}



export default CustomHeader