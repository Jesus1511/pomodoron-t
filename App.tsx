import { useEffect } from 'react';
import { Appp } from './components/App.jsx';
import firebase from '@react-native-firebase/app';
import Crashlytics from '@react-native-firebase/crashlytics'

const credentials = {
  appId: '1:656543080555:android:c4858af558e5a70d73512e', // mobilesdk_app_id
  apiKey: 'AIzaSyC43qeZI-VpOT6wrVu7GPYjccVxlfKZOpk', // current_key
  databaseURL: '', // No está en tu archivo. Necesitas obtenerlo desde Firebase Console.
  storageBucket: 'pomodoront.appspot.com', // storage_bucket
  messagingSenderId: '656543080555', // project_number
  projectId: 'pomodoront', // project_id
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