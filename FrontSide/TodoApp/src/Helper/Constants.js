import {Dimensions, Platform} from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import {
  widthPercentageToDP,
  heightPercentageToDP,
  listenOrientationChange,
  removeOrientationListener,
} from 'react-native-responsive-screen';

const API_URL = 'http://192.168.121.178:3000/';

const color = {
  black: '#000000',
  primary: '#9395D3',
  white: '#FFFFFF',
  bgcolor: '#D6D7EF',
  gray: '#8B8787',
};

const imagePath = {
  back: require('../asstes/back.png'),
  edit: require('../asstes/pen.png'),
  add: require('../asstes/add.png'),
  delete: require('../asstes/delete.png'),
  done: require('../asstes/check-mark.png'),
  calendar: require('../asstes/calendar.png'),
  clock: require('../asstes/clock.png'),
  users: require('../asstes/man.png'),
  edit: require('../asstes/edit.png'),
  apple: require('../asstes/apple.png'),
  facebook: require('../asstes/facebook.png'),
  google: require('../asstes/google.png'),
};

const Screen = {
  height: SCREEN_HEIGHT,
  width: SCREEN_WIDTH,
  wp: widthPercentageToDP,
  hp: heightPercentageToDP,
  scale: Dimensions.get('window').scale,
  fontScale: Dimensions.get('window').fontScale,
  OrientationChange: listenOrientationChange,
  OrientationListener: removeOrientationListener,
};

const End_Points = {
  login: 'login',
  register: 'register',
  profile: 'profile',
};

export {color, imagePath, Screen, API_URL, End_Points};
