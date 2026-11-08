import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, Image, ScrollView, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios, { all } from 'axios';
import Urls from '../../models/Urls';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginScreen(props) {
  const { navigation } = props;
  const { api, url, setUser } = React.useContext(
    Urls,
  );
  const [updatestatus, setupdatestatus] = useState({
    login: true,
    forgotpassword: false,
  });
  const [codesent, setCodesent] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [passwordShown, setPasswordShown] = useState(true);
  const [username, setUserName] = useState(null)
  const [password, setPassword] = useState(null)
  const [email, setEmail] = useState(null)
  const [code, setCode] = useState(null)
  const [newpassword, setNewpassword] = useState(null)
  const [focused, setFocused] = useState(false);
  const showToastWithGravity = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };

  function LoginSubmit() {
    setErrorMessage(null);
    if (username == null || username == undefined || username == '') {
      alert('Enter User Name');
      return;
    } else if (password == null || password == undefined || password == '') {
      alert('Enter Password');
      return;
    }
    else {
      let params = {
        userName: username,
        password: password,
      }
      axios
        .post(api + url.validateuser, params)
        .then(async res => {
          if (res.data.code == 0) {
            let data = res.data.data
            let userdetails = {
              id: data.id,
              fullName: data.fullName,
              mobileNumber: data.mobileNumber,
              email: data.email,
              userName: data.userName,
              password: data.password,
              role: data.role,
              education: data.education,
              hobbies: data.hobbies
            }
            try {
              await AsyncStorage.setItem('GETLOGGEDUSER', JSON.stringify(userdetails));
              try {
                const value = await AsyncStorage.getItem('GETLOGGEDUSER');
                if (value !== null) {
                  let data = JSON.parse(value);
                  setUser(data);
                } else {
                  // console.log('No data found');
                }
              } catch (e) {
                // console.log(e.message);
              }
            } catch (e) {
              setErrorMessage(e.message);
            }
          } else {
            alert('Invalid Login Credentials');
          }
        })
        .catch(err => {
          console.log(err.message);
          setErrorMessage(err.message);
        });
    }
  }

  function recoverPassword() {
    setErrorMessage(null);
    if (email == null || email == undefined || email == '') {
      alert('Enter Email');
      return;
    }
    else {
      setCodesent(true)
      let params = {
        email: email,
        transId: '0',
        newPassword: 'N.A.',
      }
      axios
        .post(api + url.updpassword, params)
        .then(res => {
          if (res.data.code == 0) {
            console.log(res.data);
            showToastWithGravity(res.data.message);
            setCodesent(true)
          } else {
            alert('Please Try Again');
          }
        })
        .catch(err => {
          console.log(err.message);
          setErrorMessage(err.message);
        });
    }
  }

  function FinalUpdatePassword() {
    setErrorMessage(null);
    if (email == null || email == undefined || email == '') {
      alert('Enter Email');
      return;
    }
    else if (code == null || code == undefined || code == '') {
      alert('Enter Code');
      return;
    }
    else if (newpassword == null || newpassword == undefined || newpassword == '') {
      alert('Enter New Password');
      return;
    }
    else {
      let params = {
        email: email,
        transId: code,
        newPassword: newpassword,
      }
      console.log(params)
      axios
        .post(api + url.updpasswordcnfrm, params)
        .then(res => {
          console.log(res.data)
          if (res.data.code == 0) {
            alert('Success');
            setCodesent(false);
            setCode('');
            setNewpassword('');
            setupdatestatus({
              login: true,
              forgotpassword: false,
            })
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
    <View style={{ width: "100%", height: "100%" }}>
        <StatusBar
        animated={true}
        backgroundColor={'#181a1b'}
        hidden={false}
      />
      <View style={{ height: "30%", width: "100%", backgroundColor: '#181a1b' }}>
        {updatestatus.login ? (
          <>
          <View style={{height: "100%", width: "100%",paddingHorizontal: 20, alignItems:'center', justifyContent:'center'}}>
          <Image
            style={{
              height: '25%',
              width: '25%',
              resizeMode: 'contain',
              marginTop: '5%',
            }}
            source={require('../assests/Images/connect.png')}
          />
          <View>
            <Text style={{color:'#fff',fontFamily: 'Lato', fontWeight: 700, fontSize: 50}}>FavorConnect</Text>
            </View>
            <View style={{alignItems:'center'}}>
            <Text style={{color:'#e9b04b',fontFamily: 'Lato', fontWeight: 700, fontSize: 16,alignItems:'center'}}>Connect, Help, and Get Help</Text>
          </View>
          </View>
          </>
        ) :
        <View style={{height: "100%", width: "100%",paddingHorizontal: 20, alignItems:'center', justifyContent:'center'}}>
          <Image
            style={{
              height: '25%',
              width: '25%',
              resizeMode: 'contain',
              marginTop: '5%',
            }}
            source={require('../assests/Images/connect.png')}
          />
          <View>
          <Text style={{color:'#fff',fontFamily: 'Lato', fontWeight: 700, fontSize: 50}}>FavorConnect</Text>
          </View>
          <View style={{alignItems:'center'}}>
          <Text style={{color:'#e9b04b',fontFamily: 'Lato', fontWeight: 700, fontSize: 16,alignItems:'center'}}>Connect, Help, and Get Help</Text>
        </View>
        </View>
        }
      </View>
      <View style={{ height: "70%", width: "100%", padding: 20, backgroundColor: '#181a1b' }}>
        <ScrollView>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%', alignItems: 'flex-start' }}>

            {updatestatus.login ?
              (<Text style={{ fontFamily: 'Lato', fontWeight: 700, fontSize: 35, color: '#fff' }}>Login</Text>) :
              (<Text style={{ fontFamily: 'Lato', fontWeight: 700, fontSize: 35, color: '#fff' }}>Forgot Password</Text>)
            }

          </View>
          {updatestatus.login ? (
            <>
              <View style={{ width: '100%', height: 50, alignSelf: 'center', borderWidth: 1, borderRadius: 7, borderColor: '#fff', marginTop: 15, }}>
                <TextInput
                  onFocus={() => {
                    setFocused(true);
                  }}
                  onEndEditing={() => {
                    setFocused(false);
                  }}
                  placeholderTextColor="#fff"
                  placeholder="Enter User Name"
                  style={{
                    paddingLeft: 20,
                    fontFamily: 'Lato',
                    color: '#fff',
                  }}
                  onChangeText={text => {
                    setErrorMessage(null);
                    setUserName(text);
                  }}
                />
              </View>
              <View style={{
                height: 50,
                width: '100%',
                borderWidth: 1,
                borderRadius: 7,
                borderColor: '#fff',
                marginTop: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <View style={{ width: '85%' }}>
                  <TextInput
                    onFocus={() => {
                      setFocused(true);
                    }}
                    onEndEditing={() => {
                      setFocused(false);
                    }}
                    placeholderTextColor="#fff"
                    style={{
                      color: '#fff',
                      fontFamily: 'Lato',
                      paddingLeft: 20,
                      width: '80%',
                    }}
                    maxLength={30}
                    secureTextEntry={passwordShown}
                    placeholder="Enter Password"
                    onChangeText={text => {
                      setErrorMessage(null);
                      setPassword(text);
                    }}
                  />
                </View>
                <View
                  style={{
                    width: '15%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Ionicons
                    name={
                      passwordShown
                        ? 'eye-outline'
                        : 'ios-eye-off-outline'
                    }
                    color="#fff"
                    size={25}
                    onPress={() => {
                      setPasswordShown(!passwordShown);
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  borderRadius: 25,
                  marginTop: 10,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setupdatestatus({
                      login: false,
                      forgotpassword: true,
                    })
                  }}>
                  <Text
                    style={{
                      color: '#e9b04b',
                      fontFamily: 'Lato',
                      fontWeight: 600,
                      fontSize: 14
                    }}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : null}

          {updatestatus.forgotpassword ? (
            <>
              <View
                style={{
                  height: 50,
                  width: '100%',
                  alignSelf: 'center',
                  borderWidth: 1,
                  borderRadius: 7,
                  borderColor: '#fff',
                  marginTop: 10,
                }}>
                <TextInput
                  onFocus={() => {
                    setFocused(true);
                  }}
                  onEndEditing={() => {
                    setFocused(false);
                  }}
                  placeholderTextColor="#fff"
                  placeholder="Email Address"
                  style={{
                    paddingLeft: 20,
                    fontFamily: 'lato',
                    color: '#fff',
                  }}
                  onChangeText={text => {
                    setErrorMessage(null);
                    setEmail(text);
                  }}
                />
              </View>

              {codesent && <View>
                <View
                  style={{
                    height: 50,
                    width: '100%',
                    alignSelf: 'center',
                    borderWidth: 1,
                    borderRadius: 7,
                    borderColor: '#fff',
                    marginTop: 10,
                  }}>
                  <TextInput
                    onFocus={() => {
                      setFocused(true);
                    }}
                    onEndEditing={() => {
                      setFocused(false);
                    }}
                    placeholderTextColor="#fff"
                    placeholder="Code"
                    style={{
                      paddingLeft: 20,
                      fontFamily: 'lato',
                      color: '#fff',
                    }}
                    onChangeText={text => {
                      setErrorMessage(null);
                      setCode(text);
                    }}
                  />
                </View>
                <View
                  style={{
                    height: 50,
                    width: '100%',
                    alignSelf: 'center',
                    borderWidth: 1,
                    borderRadius: 7,
                    borderColor: '#fff',
                    marginTop: 10,
                  }}>
                  <TextInput
                    onFocus={() => {
                      setFocused(true);
                    }}
                    onEndEditing={() => {
                      setFocused(false);
                    }}
                    placeholderTextColor="#fff"
                    placeholder="New Password"
                    style={{
                      paddingLeft: 20,
                      fontFamily: 'lato',
                      color: '#fff',
                    }}
                    onChangeText={text => {
                      setErrorMessage(null);
                      setNewpassword(text);
                    }}
                  />
                </View>
              </View>}
            </>
          ) : null}
          {(updatestatus.login || updatestatus.forgotpassword) && (

            <TouchableOpacity
              onPress={() => {
                {
                  updatestatus.login && LoginSubmit()
                  updatestatus.forgotpassword && !codesent && recoverPassword()
                  updatestatus.forgotpassword && codesent && FinalUpdatePassword()
                }
              }}
              style={{
                height: 50,
                width: '100%',
                borderRadius: 20,
                backgroundColor: '#e9b04b',
                marginTop: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Lato',
                  fontSize: 20,
                }}>
                {updatestatus.login ? 'Login' : null}
                {updatestatus.forgotpassword ? 'Recover Password' : null}
              </Text>
            </TouchableOpacity>

          )}
          <View style={{ marginTop: 15, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: '#fff', fontFamily: 'Lato' }}>OR</Text>
          </View>
          {updatestatus.login ? (
            <View style={{ marginTop: 15, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
              <Text style={{ color: '#fff', fontFamily: 'Lato' }}>Don't have an acount? </Text>
              <TouchableOpacity onPress={() => {
                navigation.navigate('Register');
              }}><Text style={{ color: '#e9b04b', fontFamily: 'Lato', fontWeight: 700 }}>Register</Text>
              </TouchableOpacity>
            </View>
          ) :
            <View style={{ marginTop: 15, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
              <Text style={{ color: '#fff', fontFamily: 'Lato' }}>Back to </Text>
              <TouchableOpacity onPress={() => {
                setCodesent(false);
                setCode('');
                setNewpassword('');
                setupdatestatus({
                  login: true,
                  forgotpassword: false,
                })
              }}><Text style={{ color: '#e9b04b', fontFamily: 'Lato', fontWeight: 700 }}>Login</Text>
              </TouchableOpacity>
            </View>
          }
        </ScrollView>
      </View>
    </View>
  );
}

export default LoginScreen;