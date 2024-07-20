import { useEffect } from 'react';
import { Appp } from './components/App.jsx';
import firebase from '@react-native-firebase/app';
//import Crashlytics from '@react-native-firebase/crashlytics'

const credentials = {
  clientId: '108905434404498737461',
  appId: '1:656543080555:android:26f1e3cf9e34beab73512e',
  apiKey: 'AIzaSyC43qeZI-VpOT6wrVu7GPYjccVxlfKZOpk',
  databaseURL: 'https://pomodoront.firebaseio.com',
  storageBucket: 'pomodoront.appspot.com',
  messagingSenderId: '108905434404498737461',
  projectId: 'pomodoront',
};

const config = {
  name: 'SECONDARY_APP',
};

const App = () => {
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(credentials, config)
    }
    //Crashlytics().log('App mounted.');
    //Crashlytics().recordError(new Error('Test error'));

  }, []);

  return <Appp />;
};

export default App;