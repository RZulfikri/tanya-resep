import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './Styles/ResepItemStyle'
import { Fonts, Colors } from '../Themes';
import LinearGradient from 'react-native-linear-gradient'

const ResepItem = (props) => {
  const {data} = props
  return (
    <TouchableOpacity onPress={props.action} style={{marginVertical: 15, elevation: 10}} activeOpacity={0.8}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={[Colors.lightOrange, Colors.orange]} style={{paddingVertical: 10, backgroundColor: Colors.orange, paddingHorizontal: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
        <Text style={{flex: 1, fontFamily: Fonts.type.base, fontSize: Fonts.size.h6, color: Colors.snow}}>{data.judul}</Text>
      </LinearGradient>
      <Image source={{uri: data.photo}} style={{width: '100%', height: 200}} resizeMethod={'resize'} resizeMode={'cover'} />
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={[Colors.lightOrange, Colors.orange]} style={{paddingVertical: 10, backgroundColor: Colors.orange, paddingHorizontal: 10, borderBottomRightRadius: 10, borderBottomLeftRadius: 10}}>
        <Text style={{flex: 1, textAlign: 'right', fontFamily: Fonts.type.bold, fontSize: Fonts.size.medium, color: Colors.snow}}>{data.bahan_cocok} bahan cocok</Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

export default ResepItem

// export default class ResepItem extends Component {
//   // // Prop type warnings
//   // static propTypes = {
//   //   someProperty: PropTypes.object,
//   //   someSetting: PropTypes.bool.isRequired,
//   // }
//   //
//   // // Defaults for props
//   // static defaultProps = {
//   //   someSetting: false
//   // }

//   render () {
//     return (
//       <View style={styles.container}>
//         <Text>ResepItem Component</Text>
//       </View>
//     )
//   }
// }
