import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'
import { Images, Colors, Fonts } from '../Themes'
import LinearGradient from 'react-native-linear-gradient'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {
  render () {
    return (
      <View style={styles.mainContainer}>
       <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={{flex: 1}} colors={[Colors.lightOrange, Colors.orange, Colors.darkOrange]}>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Image source={Images.logoChef} style={{width: 225, height: 225}} />
          </View>
          <View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('MainScreen')}>
              <View style={{paddingHorizontal: 40, backgroundColor: Colors.snow, paddingVertical: 10, marginHorizontal: 40, borderRadius: 33, elevation: 10 }}>
                <Text style={{textAlign: 'center', fontSize: 20, color: Colors.darkOrange, fontFamily: Fonts.type.bold}}> TANYA RESEP </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{flex: 0.2}} />
        </LinearGradient>
      </View>
    )
  }
}
