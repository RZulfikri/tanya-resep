import { StackNavigator } from 'react-navigation'
import ResepDetailScreen from '../Containers/ResepDetailScreen'
import ResepListScreen from '../Containers/ResepListScreen'
import IngredientsScreen from '../Containers/IngredientsScreen'
import MainScreen from '../Containers/MainScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  ResepDetailScreen: { screen: ResepDetailScreen },
  ResepListScreen: { screen: ResepListScreen },
  IngredientsScreen: { screen: IngredientsScreen },
  MainScreen: { screen: MainScreen },
  LaunchScreen: { screen: LaunchScreen, navigationOptions: {header: null} }
}, {
  // Default config for all screens
  headerMode: 'screen',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
