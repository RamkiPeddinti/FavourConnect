import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Urls from '../../models/Urls';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SignupScreen(props) {
  const { navigation } = props;
  const {api, url, setUser} = React.useContext(
    Urls,
  );
  const [errorMessage, setErrorMessage] = useState(null);
  const [fullname, setFullname] = useState(null)
  const [mobileno, setMobileno] = useState(null)
  const [email, setEmail] = useState(null)
  const [username, setUserName] = useState(null)
  const [password, setPassword] = useState(null)
  const [passwordShown, setPasswordShown] = useState(true);
  const [role, setRole] = useState(null)
  const [education, setEducation] = useState(null)
  const [hobbies, setHobbies] = useState(null)

  function RegisterSubmit() {
    setErrorMessage(null);
    if (fullname == null || fullname == undefined || fullname == '') {
      alert('Enter Full Name');
      return;
    } else if (mobileno == null || mobileno == undefined || mobileno == '') {
      alert('Enter Mobile Number');
      return;
    } else if (email == null || email == undefined || email == '') {
      alert('Enter Email');
      return;
    } else if (username == null || username == undefined || username == ''){
      alert('Enter User Name');
      return;
    } else if (password == null || password == undefined || password == '') {
      alert('Enter Password');
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
        userName: username,
        password: password,
        email: email,
        mobileNumber: mobileno,
        fullName: fullname,
        role: role,
        education: education,
        hobbies: hobbies
      }
      axios
        .post(api + url.adduser,params )
        .then(async res => {
          console.log(res.data);
          if (res.data.code == 0) {
            let params = {
              userName: username,
              password: password,
            }
            axios
            .post(api + url.validateuser, params)
            .then(async res => {
              console.log(res.data.data);
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
              }
            }) 
            // let data = res.data.data
            // let userdetails = {
            //   id: data.id,
            //   fullName: data.fullName,
            //   mobileNumber: data.mobileNumber,
            //   email: data.email,
            //   userName: data.userName,
            //   password: data.password,
            //   role: data.role,
            //   education: data.education,
            //   hobbies: data.hobbies
            // }
            // console.log(res.data)
            // try {
            //   await AsyncStorage.setItem('GETLOGGEDUSER', JSON.stringify(userdetails));
            //   try {
            //     const value = await AsyncStorage.getItem('GETLOGGEDUSER');
            //     if (value !== null) {
            //       let data = JSON.parse(value);
            //       setUser(data);
            //     } else {
            //       // console.log('No data found');
            //     }
            //   } catch (e) {
            //     // console.log(e.message);
            //   }
            // } catch (e) {
            //   setErrorMessage(e.message);
            // }
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
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <View style={{ height: "30%", width: "100%", backgroundColor: '#fff' }}>
        <Image
          style={{
            height: '100%',
            width: '100%',
            resizeMode: 'contain',
            marginTop: '5%',
          }}
          source={require('../assests/Images/register.jpg')}
        />
      </View>
      <View style={{ height: "60%", width: "100%", padding: 20, backgroundColor: '#fff' }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%', alignItems: 'flex-start' }}>
            <Text style={{ fontFamily: 'Lato', fontWeight: 700, fontSize: 35, color: '#172B4D' }}>Sign up</Text>
          </View>
          <View style={{ marginTop: 10, alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'row' }}>
            <Text style={{ color: '#627087', fontFamily: 'Lato' }}>Have an account? </Text>
            <TouchableOpacity onPress={() => {
              navigation.navigate('Login');
            }}><Text style={{ color: '#0052CC', fontFamily: 'Lato', fontWeight: 700 }}>Login</Text></TouchableOpacity>
          </View>
          <View style={{ width: '100%', height: 50, alignSelf: 'center', borderWidth: 1, borderRadius: 10, borderColor: '#ededed', marginTop: 15, }}>
            <TextInput
              placeholderTextColor="#7A869A"
              placeholder="Full Name"
              style={{
                paddingLeft: 20,
                fontFamily: 'Lato',
                color: '#000',
              }}
              onChangeText={text => {
                setErrorMessage(null);
                setFullname(text);
              }}
            />
          </View>
          <View style={{ width: '100%', height: 50, alignSelf: 'center', borderWidth: 1, borderRadius: 10, borderColor: '#ededed', marginTop: 15, }}>
            <TextInput
              placeholderTextColor="#7A869A"
              placeholder="Mobile Number"
              style={{
                paddingLeft: 20,
                fontFamily: 'Lato',
                color: '#000',
              }}
              onChangeText={text => {
                setErrorMessage(null);
                setMobileno(text);
              }}
            />
          </View>
          <View style={{ width: '100%', height: 50, alignSelf: 'center', borderWidth: 1, borderRadius: 10, borderColor: '#ededed', marginTop: 15, }}>
            <TextInput
              placeholderTextColor="#7A869A"
              placeholder="Email"
              style={{
                paddingLeft: 20,
                fontFamily: 'Lato',
                color: '#000',
              }}
              onChangeText={text => {
                setErrorMessage(null);
                setEmail(text);
              }}
            />
          </View>
          <View style={{ width: '100%', height: 50, alignSelf: 'center', borderWidth: 1, borderRadius: 10, borderColor: '#ededed', marginTop: 15, }}>
            <TextInput
              placeholderTextColor="#7A869A"
              placeholder="User Name"
              style={{
                paddingLeft: 20,
                fontFamily: 'Lato',
                color: '#000',
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
            borderRadius: 10,
            borderColor: '#ededed',
            marginTop: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <View style={{ width: '85%' }}>
              <TextInput
                placeholderTextColor="#7A869A"
                style={{
                  color: '#000',
                  fontFamily: 'Lato',
                  paddingLeft: 20,
                  width: '80%',
                }}
                maxLength={30}
                secureTextEntry={passwordShown}
                placeholder="Password"
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
                    color="#7A869A"
                    size={25}
                    onPress={() => {
                      setPasswordShown(!passwordShown);
                    }}
                  />
            </View>
          </View>
          <View style={{ width: '100%', height: 50, alignSelf: 'center', borderWidth: 1, borderRadius: 10, borderColor: '#ededed', marginTop: 15, }}>
            <TextInput
              placeholderTextColor="#7A869A"
              placeholder="Role"
              style={{
                paddingLeft: 20,
                fontFamily: 'Lato',
                color: '#000',
              }}
              onChangeText={text => {
                setErrorMessage(null);
                setRole(text);
              }}
            />
          </View>
          <View style={{ width: '100%', height: 50, alignSelf: 'center', borderWidth: 1, borderRadius: 10, borderColor: '#ededed', marginTop: 15, }}>
            <TextInput
              placeholderTextColor="#7A869A"
              placeholder="Education"
              style={{
                paddingLeft: 20,
                fontFamily: 'Lato',
                color: '#000',
              }}
              onChangeText={text => {
                setErrorMessage(null);
                setEducation(text);
              }}
            />
          </View>
          <View style={{ width: '100%', height: 50, alignSelf: 'center', borderWidth: 1, borderRadius: 10, borderColor: '#ededed', marginTop: 15, }}>
            <TextInput
              placeholderTextColor="#7A869A"
              placeholder="Hobbies"
              style={{
                paddingLeft: 20,
                fontFamily: 'Lato',
                color: '#000',
              }}
              onChangeText={text => {
                setErrorMessage(null);
                setHobbies(text);
              }}
            />
          </View>
        </ScrollView>
      </View>
      <View style={{ height: "10%", width: "100%", padding: 20, backgroundColor: '#fff' }}>
        <TouchableOpacity
          onPress={() => {
            {
              RegisterSubmit();
            }
          }}
          style={{
            height: 50,
            width: '100%',
            borderRadius: 10,
            backgroundColor: '#0065FF',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: '#fff',
              fontFamily: 'Lato',
              fontSize: 20,
            }}>
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SignupScreen;