import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StatusBar, ScrollView, Dimensions, TouchableOpacity, Modal } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import Urls from '../../../models/Urls';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

function InnerChangePasswordScreen(props) {
  const { navigation } = props;
  const {api, url, user, logOut} = React.useContext(
    Urls,
  );
  const [errorMessage, setErrorMessage] = useState(null);
  const [oldpassword, setOldPassword] = useState(false);
  const [newpassword, setNewPassword] = useState(false);
  const [showProfileOldPassword, setShowProfileOldPassword] = useState(false);
  const [showProfileNewPassword, setShowProfileNewPassword] = useState(false);
  function UpdatePwdSubmit() {
    setErrorMessage(null);
    if (oldpassword == null || oldpassword == undefined || oldpassword == ''){
      alert('Enter Old Password');
      return;
    } else if (newpassword == null || newpassword == undefined || newpassword == '') {
      alert('Enter New Password');
      return;
    }
    else {
     let params = {
      userId: user.id,
      oldPassword: oldpassword,
      newPassword: newpassword,
      }
      console.log(params);
      axios
        .post(api + url.changepassword,params )
        .then(res => {
          console.log(res.data);
          if (res.data.code == 0) {
            alert('Password Changed Successfully');
            logOut();
          } else {
            alert('Failure');
          }
        })
        .catch(err => {
          console.log(err.message);
          setErrorMessage(err.message);
        });
    }
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
      <View
        style={{
          height: (HEIGHT * 8) / 100,
          width: WIDTH,
          backgroundColor: '#0065FF',
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
            Change Password
          </Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          marginHorizontal: 20,
          borderRadius: 10,
          padding: 20,
          elevation: 10,
          backgroundColor: '#fff',
          paddingTop: 10,
          paddingHorizontal: 20,
          marginTop: 20,
        }}>
        <View style={{marginTop: 20}}>
          <View style={{}}>
            <View style={{marginTop: 10}}>
              <Text style={{fontFamily: 'Lato', color: '#000'}}>
                Old Password
              </Text>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  height: 50,
                  width: '100%',
                  justifyContent: 'center',
                  borderRadius: 10,
                  elevation: 5,
                  backgroundColor: '#fff',
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '20%',
                    height: '100%',
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                  }}>
                  <MaterialCommunityIcons
                    name="lock"
                    size={20}
                    style={{fontFamily: 'Lato', color: '#000'}}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    width: '20%',
                    height: '100%',
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10,
                  }}>
                  <TextInput
                    placeholderTextColor="#000"
                    style={{color: '#000'}}
                    placeholder="Old Password"
                    secureTextEntry={!showProfileOldPassword}
                    onChangeText={text => {
                      setErrorMessage(null);
                      setOldPassword(text);
                    }}
                  />
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '20%',
                    height: '100%',
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                  }}>
                  <Ionicons
                    name={
                      showProfileOldPassword ? 'eye-outline' : 'eye-off-outline'
                    }
                    size={20}
                    style={{fontFamily: 'Lato', color: '#000'}}
                    onPress={() => {
                      setShowProfileOldPassword(!showProfileOldPassword);
                    }}
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={{marginTop: 20}}>
            <Text style={{fontFamily: 'Lato', color: '#000'}}>
              New Password
            </Text>

            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                height: 50,
                width: '100%',
                justifyContent: 'center',
                borderRadius: 10,
                elevation: 5,
                backgroundColor: '#fff',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '20%',
                  height: '100%',
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                }}>
                <MaterialCommunityIcons
                  name="lock"
                  size={20}
                  style={{fontFamily: 'Lato', color: '#000'}}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  width: '20%',
                  height: '100%',
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                }}>
                <TextInput
                  placeholderTextColor="#000"
                  style={{color: '#000'}}
                  placeholder="New Password"
                  secureTextEntry={!showProfileNewPassword}
                  onChangeText={text => {
                    setErrorMessage(null);
                    setNewPassword(text);
                  }}
                />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '20%',
                  height: '100%',
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                }}>
                <Ionicons
                  name={
                    showProfileNewPassword ? 'eye-outline' : 'eye-off-outline'
                  }
                  size={20}
                  style={{fontFamily: 'Lati', color: '#000'}}
                  onPress={() => {
                    setShowProfileNewPassword(!showProfileNewPassword);
                  }}
                />
              </View>
            </View>
          </View>
          
          <TouchableOpacity
            onPress={() => {
              {
                UpdatePwdSubmit();
              }
            }}
            style={{marginTop: 10}}>
            <View
              style={{
                paddingHorizontal: 20,
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
                width: 200,
                borderRadius: 15,
                alignSelf: 'center',
                marginTop: 20,
                backgroundColor: '#0065FF'
              }}>
              <View style={{paddingLeft: 0}}>
                <Text style={{fontSize: 18, color: '#fff'}}>Update</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>

  );
}


export default InnerChangePasswordScreen;