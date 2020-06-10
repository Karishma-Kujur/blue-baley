import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Menu from './src/navigators/Menu';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import configureStore from './src/appConfig/store/configureStore';

const store = configureStore();

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
      <Provider store={store}>  
        <Menu />
        </Provider>
      </NavigationContainer>
    );
  }
}

export default App;