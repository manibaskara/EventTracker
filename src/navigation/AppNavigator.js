import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
import Screens from '../screens';
import {connect} from 'react-redux';
import {navigate} from '../navigation/NavigationService';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';

const DashBoardNavigator = () => (
  <FlingGestureHandler
    direction={Directions.LEFT}
    onHandlerStateChange={({nativeEvent}) => {
      if (nativeEvent.state === State.ACTIVE) {
        navigate('TrackingScreen');
      }
    }}>
    <View style={{flex: 1}}>
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
        <Stack.Screen
          name="TrackingScreen"
          component={Screens.TrackingScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </View>
  </FlingGestureHandler>
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
        name="DashBoardNavigator"
        component={DashBoardNavigator}
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
