import React, { Component } from "react";
import Main from "./components/MainComponent";

// redux
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/ConfigureStore";
const { persistor, store } = ConfigureStore();
import { PersistGate } from "redux-persist/es/integration/react";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Main />
        </PersistGate>
      </Provider>
    );
  }
}
export default App;
