import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { enableScreens } from 'react-native-screens';
import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import { Provider } from 'react-redux';
import ShopNavigator from './navigation/ShopNavigator';

import productsReducer from './store/reducers/products'
import cartReducer from './store/reducers/cart'
import ordersReducer from './store/reducers/order'


enableScreens()
SplashScreen.preventAutoHideAsync();

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer
})

// const store = createStore(rootReducer, applyMiddleware(thunk))
const store = createStore(rootReducer, applyMiddleware(thunk))

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
          'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
        })
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  )
}

export default App