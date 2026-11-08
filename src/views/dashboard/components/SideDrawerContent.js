import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo'
import Urls from '../../../models/Urls';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const SideDrawerContent = props => {
  const { navigation } = props.props;
  const {api, url, user, logOut} = React.useContext(
    Urls,
  );

  function toggleModal() {
    props.callModal();
  }
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        flexDirection: 'row',
      }}>
      <View
        style={{
          width: '85%',
          height: '100%',
          backgroundColor: '#fff',
        }}>
        <View
          style={{
            height: '20%',
            width: '100%',
            borderBottomWidth: 1,
            borderBottomColor: '#e9b04b',
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: '100%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <View
              style={{
                height: '40%',
                width: '100%',
                justifyContent: 'space-around',
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#181a1b',
              }}>
              <View style={{ alignItems: 'center' }}>
                <Text
                  style={{
                    fontFamily: 'Lato',
                    top: -2,
                    fontSize: 16,
                    color: '#fff',
                  }}>
                  Favor
                </Text>
                <View
                  style={{
                    width: '35%',
                    borderTopWidth: 2,
                    borderColor: '#fff',
                  }}></View>
              </View>
            </View>
            <View
              style={{
                height: '60%',
                width: '100%',
                paddingHorizontal: 10,
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{ flexDirection: 'row' }}>
                  <View
                    style={{
                      height: (WIDTH * 15) / 100,
                      width: (WIDTH * 15) / 100,
                      borderRadius: (WIDTH * 15) / 100 / 2,
                      backgroundColor: 'lightblue',
                    }}>
                    <Image
                      style={{
                        height: '100%',
                        width: '100%',
                        borderRadius: (WIDTH * 15) / 100 / 2,
                      }}
                      source={require('../../assests/Images/user.png')}
                    />
                  </View>
                  <View style={{ paddingLeft: 10, justifyContent: 'center' }}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: '#000',
                        fontFamily: 'lato',
                        color: 'gray',
                      }}>
                      {user.fullName}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'gray',
                        fontFamily: 'Lato',
                      }}>
                      Username : {user.userName}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                }}></View>
            </View>
          </View>
        </View>
        <View
          style={{
            height: '80%',
            width: '100%',
            paddingHorizontal: 10,
            marginTop: 10,
            justifyContent: 'space-between',
          }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 10, paddingHorizontal: 5 }}>
            <View style={{ height: '92%' }}>
              <TouchableOpacity
                onPress={() => {
                  toggleModal();
                  navigation.navigate('InnerProfileScreen');
                }}
                style={{
                  height: (WIDTH * 15) / 100,
                  width: '100%',
                  backgroundColor: '#fff',
                  elevation: 3,
                  borderRadius: 5,
                  marginTop: 10,
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    height: '100%',
                    width: '20%',
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialIcons
                    name="account-box"
                    size={22}
                    color='#e9b04b'
                  />
                </View>
                <View
                  style={{
                    height: '100%',
                    width: '60%',
                    borderRadius: 5,
                    justifyContent: 'center',
                    marginLeft: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Lato',
                      color: '#000',
                    }}>
                    Profile Settings
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  toggleModal();
                  navigation.navigate('InnerMyPostScreen');
                }}
                style={{
                  height: (WIDTH * 15) / 100,
                  width: '100%',
                  backgroundColor: '#fff',
                  elevation: 3,
                  borderRadius: 5,
                  marginTop: 10,
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    height: '100%',
                    width: '20%',
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Entypo
                    name="clipboard"
                    size={22}
                    color='#e9b04b'
                  />
                </View>
                <View
                  style={{
                    height: '100%',
                    width: '60%',
                    borderRadius: 5,
                    justifyContent: 'center',
                    marginLeft: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Lato',
                      color: '#000',
                    }}>
                    My Posts
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  toggleModal();
                  navigation.navigate('InnerChangePasswordScreen');
                }}
                style={{
                  height: (WIDTH * 15) / 100,
                  width: '100%',
                  backgroundColor: '#fff',
                  elevation: 3,
                  borderRadius: 5,
                  marginTop: 10,
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    height: '100%',
                    width: '20%',
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name="security"
                    size={22}
                    color='#e9b04b'
                  />
                </View>
                <View
                  style={{
                    height: '100%',
                    width: '60%',
                    borderRadius: 5,
                    justifyContent: 'center',
                    marginLeft: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Lato',
                      color: '#000',
                    }}>
                    Change Password
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
              onPress={() => {
                toggleModal();
                logOut();
              }}
                style={{
                  height: (WIDTH * 15) / 100,
                  width: '100%',
                  backgroundColor: '#fff',
                  elevation: 3,
                  borderRadius: 5,
                  marginTop: 10,
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    height: '100%',
                    width: '20%',
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Entypo
                    name="log-out"
                    size={22}
                    color='#e9b04b'
                  />
                </View>
                <View
                  style={{
                    height: '100%',
                    width: '60%',
                    borderRadius: 5,
                    justifyContent: 'center',
                    marginLeft: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Lato',
                      color: '#000',
                    }}>
                    Logout
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          toggleModal();
        }}
        style={{
          paddingTop: 10,
          paddingBottom: 20,
          width: '15%',
          height: '100%',
        }}></TouchableOpacity>
    </View>
  );
};

export default SideDrawerContent;
