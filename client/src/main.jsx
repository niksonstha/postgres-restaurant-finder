import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { customTheme } from "./theme/theme.js";
import { RestaurantsContextProvider } from "./context/RestaurantContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={customTheme}>
    <RestaurantsContextProvider>
      <App />
    </RestaurantsContextProvider>
  </ChakraProvider>
);
