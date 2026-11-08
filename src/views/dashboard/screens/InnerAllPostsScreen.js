import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StatusBar, ScrollView, Dimensions, TouchableOpacity, Modal, Image } from 'react-native';
import MenuDrawer from 'react-native-side-drawer'
import axios from 'axios';
import Urls from '../../../models/Urls';
import SideDrawerContent from '../../dashboard/components/SideDrawerContent'
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LottieView from 'lottie-react-native';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

function InnerAllPostsScreen(props) {
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
          // console.log(res.data.data)
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

  function ContactFeed(id) {
    let params = {
      userId: user.id,
      feedId: id,
    }
    console.log(params);
    axios
      .post(api + url.contactfeed, params)
      .then(res => {
        console.log(res.data);
        if (res.data.code == 0) {
          alert('Thank You, You Will Get Notified');
        } else {
          alert('Failure');
        }
      })
      .catch(err => {
        console.log(err.message);
        setErrorMessage(err.message);
      });
  }

  function Header() {
    return (
      <View
        style={{
          height: (HEIGHT * 8) / 100,
          width: WIDTH,
          backgroundColor: '#181a1b',
          flexDirection: 'row',
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            height: '100%',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Entypo
            name="chevron-small-left"
            size={30}
            style={{ paddingLeft: 0 }}
            color="#fff"
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text
            style={{
              fontFamily: 'Lato',
              top: -2,
              fontSize: 18,
              color: '#fff',
              marginLeft: 10,
            }}>
            All Posts
          </Text>
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
                  <View
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
                      borderLeftColor: '#e9b04b',
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
                      <View
                        style={{
                          flexDirection: 'row'
                        }}>
                        <View style={{ width: '70%', justifyContent: 'center' }}>
                          <TouchableOpacity
                          onPress={
                            () => {
                              if (item.type == 'Favour') {
                                navigation.navigate('InnerViewPostScreen', { id: item.id });
                              }
                            }
                          }>
                            <Text
                             style={{
                              fontSize: 16,
                              fontFamily: 'Lato',
                              color: '#455A64',
                              fontWeight: 700,
                              marginTop: 8,
                              paddingLeft: 5,
                            }}
                            >{item.title}</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={{ width: '30%', marginTop: 5, marginLeft: 45 }}>
                          {item.type == 'Favour' ? 
                          <TouchableOpacity
                          onPress={() => {
                           if (item.type == 'Favour'){
                             ContactFeed(item.id);
                           }
                         }}
                         style={{
                           height: (WIDTH * 10) / 100,
                           width: (WIDTH * 10) / 100,
                           borderRadius: (WIDTH * 50) / 100 / 2,
                           backgroundColor: '#000',
                         }}>
                         <FontAwesome
                           name="phone"
                           size={20}
                           style={{ fontFamily: 'Lato', color: '#e9b04b', top: 9, marginLeft: 12 }}
                         />
                       </TouchableOpacity>
                          : null }
                          
                        </View>
                      </View>
                      <View>
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: 'Lato',
                            color: 'gray',
                            fontWeight: 500,
                            marginTop: 8,
                            paddingLeft: 5,
                          }}>
                          {item.description}
                        </Text>
                      </View>
                    </View>
                  </View>
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


export default InnerAllPostsScreen;