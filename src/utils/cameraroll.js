import Storage from 'react-native-storage';
import Contacts from 'react-native-contacts';
import { findUser } from './session';
const session = new Storage({
    size: 10000,    
    defaultExpires: 1000 * 3600 * 24 * 365,
    enableCache: true,
    sync: {

    }
});

