import { StyleSheet } from 'react-native';
import globalStyles from '../styles';

const loginStyles = StyleSheet.create({
  
  container: {
  	flex: 1,
  	justifyContent: 'center',
  	backgroundColor: '#FFFFFF',
  },

});
export default {
  ...globalStyles,
  ...loginStyles,
};