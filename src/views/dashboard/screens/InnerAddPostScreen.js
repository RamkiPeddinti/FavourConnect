import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StatusBar, ScrollView, Dimensions, TouchableOpacity, Modal, Image } from 'react-native';
import axios from 'axios';
import Urls from '../../../models/Urls';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Dropdown } from 'react-native-element-dropdown';
import LottieView from 'lottie-react-native';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const data = [
  { label: 'Post' },
  { label: 'Favour' },
];


function InnerAddPostScreen(props) {
  const { navigation } = props;
  const { api, url, user } = React.useContext(
    Urls,
  );
  const [errorMessage, setErrorMessage] = useState(null);
  const [types, setTypes] = useState(null);
  const [feeddrp, setFeeddrp] = useState('');
  const [feeddrps, setFeeddrps] = useState([]);
  const [selectedfavour, setSelectedfavour] = useState(null)
  const [posttitle, setPostTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [imagefile, setImagefile] = useState(null);
  const [loading, setloading] = useState(false);

  function openGallery() {
    launchCamera({ includeBase64: true, }).then(image => {
      // console.log(image.assets[0].base64);
      setImagefile(image.assets[0].base64);
      setErrorMessage(null)
    });
  }

  useEffect(() => {
    let params = {
      userId: 0,
      feedId: 0,
    }
    axios
      .post(api + url.getfav, params)
      .then(res => {
        console.log(res.data);
        if (res.data.code == 0) {
          setFeeddrps(res.data.data);
        } else {
          alert('Not Bind');
        }
      })
      .catch(err => {
        setErrorMessage(err.message);
      });
  }, []);

  function AddPost() {
    setErrorMessage(null);
    if (types == null || types == undefined || types == '') {
      setloading(false);
      alert('Select Type');
      return;
    } else if (selectedfavour == null || selectedfavour == undefined || selectedfavour == '') {
      setloading(false);
      alert('Enter Favour Type');
      return;
    } else if (posttitle == null || posttitle == undefined || posttitle == '') {
      setloading(false);
      alert('Enter Title');
      return;
    } else if (description == null || description == undefined || description == '') {
      setloading(false);
      alert('Enter Description');
      return;
    }
    else {
      setloading(true)
      let params = {
        favId: selectedfavour.id,
        userId: user.id,
        type: types,
        title: posttitle,
        description: description,
        preview: imagefile,
      }
      axios
        .post(api + url.addfeeds, params)
        .then(res => {
          if (res.data.code == 0) {
            setloading(false);
            alert('Post added successfully')
            navigation.navigate('InnerDashboard');
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
            Add Post
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
        {!loading ? (
          <View style={{ marginTop: 1 }}>
            <View style={{}}>
              <View style={{ marginTop: 1 }}>
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
                    <Dropdown
                      style={[
                        {
                          height: '100%',
                          borderRadius: 10,
                          paddingHorizontal: 8,
                          width: '100%',
                        },
                      ]}
                      placeholderStyle={{ color: '#000' }}
                      selectedTextStyle={{ color: '#000' }}
                      iconStyle={{ color: '#000' }}
                      showsVerticalScrollIndicator
                      data={data}
                      maxHeight={300}
                      labelField="label"
                      valueField="label"
                      placeholder="Select Type"
                      onChange={item => {
                        setTypes(item.label);
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
                  </View>
                </View>
              </View>
            </View>
            {feeddrps && <View style={{ marginTop: 15 }}>
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
                  <Dropdown
                    style={[
                      {
                        height: '100%',
                        borderRadius: 10,
                        paddingHorizontal: 8,
                        width: '100%',
                      },
                    ]}
                    placeholderStyle={{ color: '#000' }}
                    selectedTextStyle={{ color: '#000' }}
                    iconStyle={{ color: '#000' }}
                    showsVerticalScrollIndicator
                    data={feeddrps}
                    maxHeight={300}
                    labelField="displayName"
                    valueField="id"
                    placeholder="Select Type"
                    onChange={item => {
                      setSelectedfavour(item)
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
                </View>
              </View>
            </View>}


            <View style={{ marginTop: 15 }}>
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
                    placeholderTextColor="#000"
                    style={{ color: '#000' }}
                    placeholder="Enter Title"
                    onChangeText={text => {
                      setErrorMessage(null);
                      setPostTitle(text);
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
                </View>
              </View>
            </View>

            <View style={{ marginTop: 15 }}>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  height: 100,
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
                    multiline
                    numberOfLines={4}
                    placeholderTextColor="#000"
                    style={{ color: '#000' }}
                    placeholder="Enter Description"
                    onChangeText={text => {
                      setErrorMessage(null);
                      setDescription(text);
                    }}
                  />
                </View>
              </View>
            </View>

            <View style={{ marginTop: 20,flexDirection: 'row', }}>
              <View style={{width: '50%'}}>
              <Text style={{ fontFamily: 'Lato', color: '#000' }}>
                Upload Image
              </Text>
              <TouchableOpacity
                onPress={() => {
                  openGallery();
                }}
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  height: 50,
                  width: '50%',
                  justifyContent: 'center',
                  borderRadius: 10,
                  elevation: 5,
                  backgroundColor: '#fff',
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '50%',
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
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '50%',
                    height: '100%',
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                  }}>

                </View>
              </TouchableOpacity>
              </View>
              <View style={{width: '50%'}}>
              <View
                style={{
                  height: (WIDTH * 20) / 100,
                  width: (WIDTH * 20) / 100,
                  borderRadius: (WIDTH * 20) / 100 / 2,
                  backgroundColor: 'lightblue',
                  marginTop: 10,
                }}>
                <Image
                  source={{
                    uri: `data:image/png;base64,${imagefile}`,
                  }}
                  style={{
                    borderRadius: (WIDTH * 20) / 100 / 2,
                    height: (WIDTH * 20) / 100,
                    width: (WIDTH * 20) / 100,
                  }}
                />
              </View>
              </View>
            </View> 
            <TouchableOpacity
              onPress={() => {
                {
                  AddPost();
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
                  <Text style={{ fontSize: 18, color: '#fff' }}>Add Post</Text>
                </View>
              </View>
            </TouchableOpacity>
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
    </View>
  );
}

export default InnerAddPostScreen;

