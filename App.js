import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SSRProvider } from '@react-aria/ssr';

import Ionicons from 'react-native-vector-icons/Ionicons';

//Screens
import Login from "./Screens/Login";
import Dashboard from "./Screens/Dashboard";
import Requests from "./Screens/Dashboard/Requests";
import Account from "./Screens/Dashboard/Account";
import LoginQR from "./Screens/LoginQR";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function TabNavigator(){
  return(
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Chaves') {
          iconName = focused
            ? 'ios-home-outline'
            : 'ios-home-sharp';
        } else if (route.name === 'Solicitações') {
          iconName = focused ? 'reorder-three-sharp' : 'reorder-three-sharp';
        } else if (route.name === 'Conta') {
          iconName = focused ? 'person-circle-outline' : 'person-circle';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'green',
      tabBarInactiveTintColor: 'black',
    })}
  >
    <Tab.Screen name="Chaves" component={Dashboard} options={{ headerShown: false, headerTitle: 'Portaria' }} />
    <Tab.Screen name="Solicitações" component={Requests} options={{ headerShown: true, headerTitle: 'Solicitações' }} />
    <Tab.Screen name="Conta" component={Account} options={{ headerShown: false, headerTitle: 'Conta' }} />

  </Tab.Navigator>
  )
}




export default function App() {

  return (
    <SSRProvider>
      <NavigationContainer >
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"Login"}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Dashboard" component={TabNavigator} />
          <Stack.Screen name="LoginQR" component={LoginQR} />
        </Stack.Navigator>
      </NavigationContainer>
    </SSRProvider>
  );
}
