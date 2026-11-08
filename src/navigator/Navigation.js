import * as React from 'react';
import LoginScreen from '../views/auth/LoginScreen';
import SignupScreen from '../views/auth/SignupScreen';
import InnerHomeScreen from '../views/dashboard/screens/InnerHomeScreen'
import InnerProfileScreen from '../views/dashboard/screens/InnerProfileScreen'
import InnerChangePasswordScreen from '../views/dashboard/screens/InnerChangePasswordScreen'
import InnerAddPostScreen from '../views/dashboard/screens/InnerAddPostScreen'
import InnerViewPostScreen from '../views/dashboard/screens/InnerViewPostScreen'
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Urls from '../models/Urls';


const Stack = createNativeStackNavigator();

function Navigation() {
  const { user } = React.useContext(
    Urls,
  );

  function Auth() {
    return (
      <Stack.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
        })}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={SignupScreen} />
      </Stack.Navigator>
    )
  }
  function App() {
    return (
      <Stack.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
        })}
      >
        <Stack.Screen name="InnerDashboard" component={InnerHomeScreen} />
        <Stack.Screen name="InnerViewPostScreen" component={InnerViewPostScreen} />
        <Stack.Screen name="InnerProfileScreen" component={InnerProfileScreen} />
        <Stack.Screen name="InnerAddPostScreen" component={InnerAddPostScreen} />
        <Stack.Screen name="InnerChangePasswordScreen" component={InnerChangePasswordScreen} />
      </Stack.Navigator>
    )
  }
  return (
    <NavigationContainer>
      {user ? <App /> : <Auth />}
    </NavigationContainer>
  );
}

export default Navigation;