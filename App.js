import React from "react";
import { AppContextProvider } from "./src/context/AppContext";
import MainNavigator from "./src/navigation/navigator";

export default function App() {
  return (
    <AppContextProvider>
      <MainNavigator />
    </AppContextProvider>
  );
}
