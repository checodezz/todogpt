import { createRoot } from "react-dom/client";
import store from "../store/store.js";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import { SnackbarProvider } from "notistack";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <SnackbarProvider maxSnack={3}>
      <App />
    </SnackbarProvider>
  </Provider>
);
