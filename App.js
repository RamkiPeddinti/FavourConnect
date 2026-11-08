import React from 'react';
import Navigation from './src/navigator/Navigation';
import {AuthContext} from './src/models/Urls';
import { Text, View } from 'react-native';

function App() {
  return <Navigation />;
}

export default () => {
  return (
    <AuthContext>
      <App />
    </AuthContext>
  );
};