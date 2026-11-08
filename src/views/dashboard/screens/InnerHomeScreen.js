import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StatusBar, ScrollView, Dimensions, TouchableOpacity, Modal, Image } from 'react-native';
import MenuDrawer from 'react-native-side-drawer'
import axios from 'axios';
import Urls from '../../../models/Urls';
import SideDrawerContent from '../../dashboard/components/SideDrawerContent'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LottieView from 'lottie-react-native';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

function InnerHomeScreen(props) {
  const { navigation } = props;
  const { api, url, user } = React.useContext(
    Urls,
  );
  const [modalVisible, setModalVisible] = useState(false);

  function Header() {
    return (
      <View
        style={{
          height: (HEIGHT * 8) / 100,
          width: WIDTH,
          backgroundColor: '#181a1b',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{ color: '#fff', fontFamily: 'Lato', fontSize: 18 }}>
          Dashboard
        </Text>
        <View
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 20,
            alignItems: 'center',
          }}>
          <MaterialCommunityIcons
            name="menu"
            size={25}
            color="#fff"
            onPress={() => {
              setModalVisible(true);
            }}
          />
        </View>
      </View>
    );
  }

  function callModal() {
    setModalVisible(!modalVisible);
  }

  function DrawerContent() {
    return <SideDrawerContent props={props} callModal={callModal} />;
  }
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
      }}>
      <StatusBar
        animated={true}
        backgroundColor={'#181a1b'}
        hidden={false}
      />
      <Header />

      <View style={{flexDirection: 'row', paddingHorizontal: 20,}}>
      <TouchableOpacity
          onPress={() => {
            navigation.navigate('InnerAddPostScreen');
          }}
          style={{
            height: 50,
            width: '45%',
            backgroundColor: '#e9b04b',
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              fontFamily: 'Lato',
              top: -2,
            }}>
            Do a favour
          </Text>
        </TouchableOpacity>
        <View style={{ height: 50,width: '10%',}}></View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('InnerAllPostsScreen');
          }}
          style={{
            height: 50,
            width: '45%',
            backgroundColor: '#e9b04b',
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              fontFamily: 'Lato',
              top: -2,
            }}>
            Need a favor
          </Text>
        </TouchableOpacity>
      </View>


      <MenuDrawer
        open={modalVisible}
        position={'left'}
        drawerContent={DrawerContent()}
        drawerPercentage={100}
        animationTime={150}
        overlay={true}
        opacity={0.5}>
      </MenuDrawer>
    </View>

  );
}


export default InnerHomeScreen;