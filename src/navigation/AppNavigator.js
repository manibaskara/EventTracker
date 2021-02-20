import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet} from 'react-native';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
import Screens from '../screens';
import {connect} from 'react-redux';

const DashBoardNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeScreen"
      component={Screens.HomeScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="EventDetailScreen"
      component={Screens.EventDetailScreen}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerStyle={styles.drawer}
      drawerType="front"
      drawerPosition="right"
      drawerContent={(props) => <Screens.TrackingScreen {...props} />}>
      <Drawer.Screen
        name="AppNavigator"
        component={DashBoardNavigator}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

const AppNavigator = ({isLoggedIn}) => {
  return (
    <Stack.Navigator>
      {!isLoggedIn && (
        <Stack.Screen
          name="LoginScreen"
          component={Screens.LoginScreen}
          options={{headerShown: false}}
        />
      )}
      <Stack.Screen
        name="DrawerNavigator"
        component={DrawerNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const styles = StyleSheet.create({drawer: {width: '100%'}});

const mapStatesToProp = (state) => {
  return {
    isLoggedIn: state.login.userData.isLoggedIn,
  };
};
export default connect(mapStatesToProp)(AppNavigator);
