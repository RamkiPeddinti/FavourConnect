import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Urls = React.createContext();

export const AuthContext = ({children}) => {
const [user, setUser] = useState(null);
const [refresh, setRefresh] = useState(true);

const api = 'http://3.145.94.175/api/';
//Api Urls
const url = {
  validateuser: 'Authentication/validateuser',
  adduser: 'Authentication/adduser',
  updpassword: 'Authentication/updpassword',
  updpasswordcnfrm: 'Authentication/updpasswordcnfrm',
  changepassword: 'User/changepassword',
  updprofile: 'User/updprofile',
  getfav:'User/getfav',
  addfeeds:'User/addfeeds',
  getfeed:'User/getfeed',
  contactfeed:'User/contactfeed',
  getprofile: 'User/getprofile',
};


useEffect(() => {
  getData();
}, []);

// Checking user already logged in
const getData = async () => {
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
};

// making user logout
const logOut = async () => {
  try {
    let clear = await AsyncStorage.removeItem('GETLOGGEDUSER');
    setUser(clear);
  } catch (error) {}
};

return (
  <Urls.Provider
    value={{
      api,
      url,
      logOut,
      user,
      setUser,
    }}>
    {children}
  </Urls.Provider>
);
};

export default Urls;