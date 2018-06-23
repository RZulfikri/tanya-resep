import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
    // flex: 1,
    paddingHorizontal: Metrics.marginHorizontal,
    backgroundColor: Colors.snow
  }
})
