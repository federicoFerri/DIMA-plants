import { createSwitchNavigator } from 'react-navigation';
import LoadingScreen from '../components/LoadingScreen';
import SignInScreen from '../components/SignInScreen';

const AuthNavigator = createSwitchNavigator(
  {
    Loading: { screen: LoadingScreen },
    SignIn: { screen: SignInScreen }
  },
  { initialRouteName: 'Loading' }
);

export default AuthNavigator;
