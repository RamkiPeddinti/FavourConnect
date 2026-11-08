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
  const [errorMessage, setErrorMessage] = useState(null);
  const [fillcards, setFillCards] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getInfo();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getInfo()
  }, []);

  function getInfo() {
    setloading(true);
    let params = {
      userId: 0,
      feedId: 0,
    }
    axios
      .post(api + url.getfeed, params)
      .then(res => {
        if (res.data.code == 0) {
          setFillCards(res.data.data);
          setloading(false);
        } else {
          alert('Not Bind');
        }
      })
      .catch(err => {
        setErrorMessage(err.message);
      });
  }

  function Header() {
    return (
      <View
        style={{
          height: (HEIGHT * 8) / 100,
          width: WIDTH,
          backgroundColor: '#0065FF',
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
        backgroundColor={'#0065FF'}
        hidden={false}
      />
      <Header />

      <ScrollView>
        {!loading ? (
          <View
            style={{
              backgroundColor: '#fff',
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
              paddingHorizontal: 20,
              paddingTop: 10,
              paddingBottom: 10,
            }}>
            {fillcards &&
              fillcards.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={
                      () => {
                        if (item.type == 'Favour') {
                          navigation.navigate('InnerViewPostScreen', { id: item.id });
                        }
                      }
                    }
                    key={index}
                    style={{
                      width: '100%',
                      borderRadius: 10,
                      elevation: 5,
                      backgroundColor: '#fff',
                      paddingRight: 15,
                      marginTop: 20,
                      paddingVertical: 10,
                      borderLeftWidth: 3,
                      borderLeftColor: '#0065FF',
                    }}>
                    <View style={{ paddingLeft: 17 }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingVertical: 5,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              height: (WIDTH * 40) / 100,
                              width: (WIDTH * 80) / 100,
                              borderRadius: (WIDTH * 5) / 100 / 2,
                              backgroundColor: 'lightblue',
                              marginTop: 5,
                            }}>
                            <Image
                              source={{
                                uri: `${item.preview}`,
                              }}
                              style={{
                                borderRadius: (WIDTH * 5) / 100 / 2,
                                height: (WIDTH * 40) / 100,
                                width: (WIDTH * 80) / 100,
                              }}
                            />
                          </View>
                        </View>
                      </View>
                      <Text
                        style={{
                          fontSize: 17,
                          fontFamily: 'Lato',
                          color: '#455A64',
                          fontWeight: 700,
                          marginTop: 8,
                          paddingLeft: 5,
                        }}>
                        {item.title}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )
              })}
          </View>
        ) : (
          <View
            style={{
              height: 100,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
            }}>
            <LottieView
              source={require('../../../assets/lottie/loading.json')}
              autoPlay
              loop
            />
          </View>
        )}
      </ScrollView>

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