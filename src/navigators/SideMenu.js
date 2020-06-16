import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Matches from '../screens/Matches'
import Tote from '../screens/Tote'
import Favorites from '../screens/Favorites'
import Home from '../screens/Home'
import OrderHistory from '../screens/OrderHistory'
import Account from '../screens/Account'
import ViewQuestions from '../screens/ViewQuestions';
import SplashScreen from '../screens/SplashScreen';

const SideMenu = (props) => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator initialRouteName="Home" >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="View Rack" component={Matches} />
      <Drawer.Screen name="View Tote" component={Tote} />
      <Drawer.Screen name="View Favorites" component={Favorites} />
      <Drawer.Screen name="My Chart" component={ViewQuestions} />
      <Drawer.Screen name="Order History" component={OrderHistory} />
      <Drawer.Screen name="My Account" component={Account} />
      <Drawer.Screen name="Log Out" component={SplashScreen} />
    </Drawer.Navigator>
  )
}
export default SideMenu
