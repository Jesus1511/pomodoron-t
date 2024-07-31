import { useEffect } from 'react';
import { Appp } from './components/App.jsx';
import { Purchases } from './components/configuracion/Purchases.jsx'

import firebase from '@react-native-firebase/app';
import Crashlytics from '@react-native-firebase/crashlytics'

const credentials = {
  appId: '1:656543080555:android:c4858af558e5a70d73512e', 
  apiKey: 'AIzaSyC43qeZI-VpOT6wrVu7GPYjccVxlfKZOpk', 
  databaseURL: '', 
  storageBucket: 'pomodoront.appspot.com', 
  messagingSenderId: '656543080555', 
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
    Crashlytics().log('App mounted.');
    Crashlytics().recordError(new Error('Test error'));

  }, []);

  return <Appp />;
};

export default App;