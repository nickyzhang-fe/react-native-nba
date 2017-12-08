/**
 * Created by Cral-Gates on 2017/12/09.
 */
import {
  Platform,
  NativeModules
} from 'react-native';
import OrientationIOS from 'react-native-orientation';
const {Orientation: OrientationAndroid} = NativeModules;

let Orientation;

if (Platform.OS === 'ios') {
  Orientation = OrientationIOS;
} else {
  Orientation = OrientationAndroid;
}

export default Orientation;