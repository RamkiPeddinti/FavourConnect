import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StatusBar, ScrollView, Dimensions, TouchableOpacity, Modal, Image } from 'react-native';
import axios from 'axios';
import Urls from '../../../models/Urls';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import LottieView from 'lottie-react-native';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

function InnerViewPostScreen(props) {
  const { navigation, route } = props;
  const { api, url, user } = React.useContext(
    Urls,
  );
  const [errorMessage, setErrorMessage] = useState(null);
  const [filldata, setFilldata] = useState(null);
  console.log(route.params.id)

  useEffect(() => {
    let params = {
      userId: 0,
      feedId: route.params.id,
    }
    axios
      .post(api + url.getfeed, params)
      .then(res => {
        console.log(res.data);
        if (res.data.code == 0) {
          setFilldata(res.data.data);
        } else {
          alert('Not Bind');
        }
      })
      .catch(err => {
        setErrorMessage(err.message);
      });
  }, []);

  function ContactFeed() {
    let params = {
      userId: user.id,
      feedId: route.params.id,
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
            View Post
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
        {isNaN(filldata) ? (
          filldata.map((item, index) => (
            <View key={index} style={{ marginTop: 5 }}>
              <View style={{}}>
                <View style={{ marginTop: 1 }}>
                  <Text style={{ fontFamily: 'Lato', color: '#000' }}>
                    Type
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
                      <Feather
                        name="type"
                        size={20}
                        style={{ fontFamily: 'Lato', color: '#000' }}
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
                        editable={false}
                        placeholderTextColor="#000"
                        style={{ color: '#000' }}
                        placeholder="Enter Title"
                        value={item.type}
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
                    </View>
                  </View>
                </View>
              </View>
              {/* <View style={{ marginTop: 20 }}>
                <Text style={{ fontFamily: 'Lato', color: '#000' }}>
                  Favour Type
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
                    <MaterialIcons
                      name="subtitles"
                      size={20}
                      style={{ fontFamily: 'Lato', color: '#000' }}
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
                      editable={false}
                      placeholderTextColor="#000"
                      style={{ color: '#000' }}
                      placeholder="Enter Title"

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
                  </View>
                </View>
              </View> */}
              <View style={{ marginTop: 20 }}>
                <Text style={{ fontFamily: 'Lato', color: '#000' }}>
                  Title
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
                    <MaterialIcons
                      name="subtitles"
                      size={20}
                      style={{ fontFamily: 'Lato', color: '#000' }}
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
                      editable={false}
                      placeholderTextColor="#000"
                      style={{ color: '#000' }}
                      placeholder="Enter Title"
                      value={item.title}
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
                  </View>
                </View>
              </View>
              <View style={{ marginTop: 20 }}>
                <Text style={{ fontFamily: 'Lato', color: '#000' }}>
                  Description
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
                    <MaterialIcons
                      name="description"
                      size={20}
                      style={{ fontFamily: 'Lato', color: '#000' }}
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
                      editable={false}
                      placeholderTextColor="#000"
                      style={{ color: '#000' }}
                      placeholder="Enter Description"
                      value={item.description}
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
                  </View>
                </View>
              </View>
              <View style={{ marginTop: 20 }}>
                <Text style={{ fontFamily: 'Lato', color: '#000' }}>
                  Preview
                </Text>
                <View
                  style={{
                    height: (WIDTH * 40) / 100,
                    width: (WIDTH * 80) / 100,
                    borderRadius: (WIDTH * 5) / 100 / 2,
                    backgroundColor: 'lightblue',
                    marginTop: 10,
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
              <TouchableOpacity
                onPress={() => {
                  {
                    ContactFeed();
                  }
                }}
                style={{ marginTop: 10 }}>
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
                  <View style={{ paddingLeft: 0 }}>
                    <Text style={{ fontSize: 18, color: '#fff' }}>Contact</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))
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
    </View>
  );
}

export default InnerViewPostScreen;

