import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StatusBar, ScrollView, Dimensions, TouchableOpacity, Modal } from 'react-native';
import axios from 'axios';
import Urls from '../../../models/Urls';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

function InnerProfileScreen(props) {
  const { navigation } = props;
  const {api, url, user} = React.useContext(
    Urls,
  );
  const [errorMessage, setErrorMessage] = useState(null);
  const [fullname, setFullname] = useState(null)
  const [mobileno, setMobileno] = useState(null)
  const [email, setEmail] = useState(null)
  const [username, setUserName] = useState(null)
  const [password, setPassword] = useState(null)
  const [role, setRole] = useState(null)
  const [education, setEducation] = useState(null)
  const [hobbies, setHobbies] = useState(null)
  useEffect(() => {
    getProInfo();
  }, []);

  function getProInfo() {
    let userid = user.id
    axios
      .get(api + url.getprofile+'?userId='+ userid)
      .then(res => {
        if (res.data.code == 0) {
          let getusr = res.data.data
          console.log(getusr)
          setErrorMessage(null);
          setFullname(getusr.fullName)
          setMobileno(getusr.mobileNumber)
          setEmail(getusr.email)
          setUserName(getusr.userName)
          setPassword(getusr.password)
          setRole(getusr.role)
          setEducation(getusr.education)
          setHobbies(getusr.hobbies)
        } else {
          alert('Not Updated');
        }
      })
      .catch(err => {
        console.log(err.message);
        setErrorMessage(err.message);
      });
  }

  function updateprofile () {
    setErrorMessage(null);
    if (fullname == null || fullname == undefined || fullname == '') {
      alert('Enter Full Name');
      return;
    } else if (mobileno == null || mobileno == undefined || mobileno == '') {
      alert('Enter Mobile Number');
      return;
    } else if (mobileno.length < 10 || mobileno.length > 10 || mobileno < 6000000000) {
      alert('Enter Correct Mobile Number');
      return;
    } else if (email == null || email == undefined || email == '') {
      alert('Enter Email ID');
      return;
    } else if (email.indexOf('@') == -1 || email.indexOf('.') == -1){
      alert('Enter Valid Email ID');
      return;
    } else if (role == null || role == undefined || role == '') {
      alert('Enter Role');
      return;
    } else if (education == null || education == undefined || education == '') {
      alert('Enter Education');
      return;
    }else if (hobbies == null || hobbies == undefined || hobbies == '') {
      alert('Enter Hobbies');
      return;
    }
    else
    {
      let params = {
        id: user.id,
        userName: username,
        email: email,
        mobileNumber: mobileno,
        fullName: fullname,
        role: role,
        education: education,
        hobbies: hobbies
      }
      axios
        .post(api + url.updprofile,params )
        .then(res => {
          if (res.data.code == 0) {
            alert('Success');
            getProInfo()
          } else {
            alert('Update Correctly');
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
        backgroundColor={'#181a1b'}
        hidden={false}
      />
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
            width: '40%',
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
            Profile
          </Text>
        </View>
      </View>
      <View
        style={{
          widht: '100%',
          height: (HEIGHT * 78) / 100,
          backgroundColor: '#fff',
          marginTop: 5,
        }}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}>
          <View style={{ paddingHorizontal: 20 }}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: 10,
                borderColor: '#B1B1B1',
                paddingHorizontal: 10,
                marginTop: 30,
              }}>
              <View
                style={{
                  width: '10%',
                  justifyContent: 'center',
                }}>
                <FontAwesome
                  name="user-o"
                  size={20}
                  color="#4d4d4d"
                  style={{ marginLeft: 0 }}
                />
              </View>
              <View
                style={{
                  width: '25%',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Lato',
                    color: '#a6a6a6',
                    top: -2,
                    marginLeft: 10,
                  }}>
                  Full Name
                </Text>
              </View>
              <View
                style={{
                  width: '65%',
                  justifyContent: 'center',
                }}>
                <TextInput
                  placeholder="Your Full Name"
                  placeholderTextColor={'#000'}
                  style={{ fontFamily: 'Lato', color: '#000' }}
                  value={fullname}
                  onChangeText={text => {
                    setFullname(text);
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: 10,
                borderColor: '#B1B1B1',
                paddingHorizontal: 10,
                marginTop: 15,
              }}>
              <View
                style={{
                  width: '10%',
                  justifyContent: 'center',
                }}>
                <Entypo
                  name="mobile"
                  size={20}
                  color="#4d4d4d"
                  style={{ marginLeft: 0 }}
                />
              </View>
              <View
                style={{
                  width: '25%',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Lato',
                    color: '#a6a6a6',
                    top: -2,
                    marginLeft: 10,
                  }}>
                  Mobile No
                </Text>
              </View>
              <View
                style={{
                  width: '65%',
                  justifyContent: 'center',
                }}>
                <TextInput
                  placeholder="Your Mobile Number"
                  placeholderTextColor={'#000'}
                  style={{ fontFamily: 'Lato', color: '#000' }}
                  value={mobileno}
                  onChangeText={text => {
                    setMobileno(text);
                  }}
                  keyboardType="numeric"
                  maxLength={10}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: 10,
                borderColor: '#B1B1B1',
                paddingHorizontal: 10,
                marginTop: 15,
              }}>
              <View
                style={{
                  width: '10%',
                  justifyContent: 'center',
                }}>
                <Entypo
                  name="email"
                  size={20}
                  color="#4d4d4d"
                  style={{ marginLeft: 0 }}
                />
              </View>
              <View
                style={{
                  width: '25%',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Lato',
                    color: '#a6a6a6',
                    top: -2,
                    marginLeft: 10,
                  }}>
                  E-mail ID
                </Text>
              </View>
              <View
                style={{
                  width: '65%',
                  justifyContent: 'center',
                }}>
                <TextInput
                  placeholder="Your E-mail"
                  placeholderTextColor={'#000'}
                  style={{ fontFamily: 'Lato', color: '#000' }}
                  value={email}
                  onChangeText={text => {
                    setEmail(text);
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: 10,
                borderColor: '#B1B1B1',
                paddingHorizontal: 10,
                marginTop: 15,
              }}>
              <View
                style={{
                  width: '10%',
                  justifyContent: 'center',
                }}>
                <FontAwesome
                  name="user-circle"
                  size={20}
                  color="#4d4d4d"
                  style={{ marginLeft: 0 }}
                />
              </View>
              <View
                style={{
                  width: '25%',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Lato',
                    color: '#a6a6a6',
                    top: -2,
                    marginLeft: 10,
                  }}>
                  User Name
                </Text>
              </View>
              <View
                style={{
                  width: '65%',
                  justifyContent: 'center',
                }}>
                <TextInput
                  editable={false}
                  placeholder="Your User Name"
                  placeholderTextColor={'#000'}
                  style={{ fontFamily: 'Lato', color: '#000' }}
                  value={username}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: 10,
                borderColor: '#B1B1B1',
                paddingHorizontal: 10,
                marginTop: 15,
              }}>
              <View
                style={{
                  width: '10%',
                  justifyContent: 'center',
                }}>
                <Feather
                  name="refresh-ccw"
                  size={17}
                  color="#4d4d4d"
                  style={{ marginLeft: 0 }}
                />
              </View>
              <View
                style={{
                  width: '25%',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Lato',
                    color: '#a6a6a6',
                    top: -2,
                    marginLeft: 10,
                  }}>
                  Role
                </Text>
              </View>
              <View
                style={{
                  width: '65%',
                  justifyContent: 'center',
                }}>
                <TextInput
                  placeholder="Your Role"
                  placeholderTextColor={'#000'}
                  style={{ fontFamily: 'Lato', color: '#000' }}
                  value={role}
                  onChangeText={text => {
                    setRole(text);
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: 10,
                borderColor: '#B1B1B1',
                paddingHorizontal: 10,
                marginTop: 15,
              }}>
              <View
                style={{
                  width: '10%',
                  justifyContent: 'center',
                }}>
                <FontAwesome
                  name="graduation-cap"
                  size={18}
                  color="#4d4d4d"
                  style={{ marginLeft: 0 }}
                />
              </View>
              <View
                style={{
                  width: '25%',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Lato',
                    color: '#a6a6a6',
                    top: -2,
                    marginLeft: 10,
                  }}>
                  Education
                </Text>
              </View>
              <View
                style={{
                  width: '65%',
                  justifyContent: 'center',
                }}>
                <TextInput
                  placeholder="Your Education"
                  placeholderTextColor={'#000'}
                  style={{ fontFamily: 'Lato', color: '#000' }}
                  value={education}
                  onChangeText={text => {
                    setEducation(text);
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: 10,
                borderColor: '#B1B1B1',
                paddingHorizontal: 10,
                marginTop: 15,
              }}>
              <View
                style={{
                  width: '10%',
                  justifyContent: 'center',
                }}>
                <Feather
                  name="activity"
                  size={20}
                  color="#4d4d4d"
                  style={{ marginLeft: 0 }}
                />
              </View>
              <View
                style={{
                  width: '25%',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Lato',
                    color: '#a6a6a6',
                    top: -2,
                    marginLeft: 10,
                  }}>
                  Hobbies
                </Text>
              </View>
              <View
                style={{
                  width: '65%',
                  justifyContent: 'center',
                }}>
                <TextInput
                  placeholder="Your Hobbies"
                  placeholderTextColor={'#000'}
                  style={{ fontFamily: 'Lato', color: '#000' }}
                  value={hobbies}
                  onChangeText={text => {
                    setHobbies(text);
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          widht: '100%',
          height: (HEIGHT * 14) / 100,
          backgroundColor: '#fff',
          marginTop: 5,
          paddingHorizontal: 20 
        }}>
        <TouchableOpacity
          onPress={() => {
            updateprofile();
          }}
          style={{
            height: 50,
            width: '100%',
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
            Update Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>

  );
}


export default InnerProfileScreen;