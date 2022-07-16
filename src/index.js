import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// Redux
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import persistRedux from "./Redux/Persistor/index";
// `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={persistRedux().store}>
    <PersistGate loading={null} persistor={persistRedux().persistor}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </PersistGate>
  </Provider>
);
