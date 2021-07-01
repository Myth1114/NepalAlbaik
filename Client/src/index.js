import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { CookiesProvider } from "react-cookie";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#f2720c",
    },
    secondary: {
      main: "#000000",
    },
    error: {
      main: "#ff4757",
    },
    success: {
      main: "#4caf50",
    },
    info: {
      main: "#1e90ff",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      // '"Segoe UI"',
      // "Roboto",
      // '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      // '"Apple Color Emoji"',
      // '"Segoe UI Emoji"',
      // '"Segoe UI Symbol"',
    ].join(","),
  },
});

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <BrowserRouter>
        <ScopedCssBaseline>
          <PersistGate persistor={persistor}>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </PersistGate>
        </ScopedCssBaseline>
      </BrowserRouter>
    </Provider>
  </CookiesProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
serviceWorkerRegistration.register();
reportWebVitals();
