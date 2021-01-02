import { createSwitchNavigator } from 'react-navigation';
import LoadingScreen from '../components/LoadingScreen';
import SignUpScreen from '../components/SignUpScreen';
import SignInScreen from '../components/SignInScreen';
const AuthNavigator = createSwitchNavigator(
  {
    Loading: { screen: LoadingScreen },
    SignUp: { screen: SignUpScreen },
    SignIn: { screen: SignInScreen }
  },
  { initialRouteName: 'Loading' }
);
export default AuthNavigator;
