import React from "react";
import FlashMessage from "react-native-flash-message";
import { AppContextProvider } from "./src/context/AppContext";
import MainNavigator from "./src/navigation/navigator";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

export default function App() {
  return (
    <AppContextProvider>
      <ActionSheetProvider>
        <>
          <MainNavigator />
          <FlashMessage />
        </>
      </ActionSheetProvider>
    </AppContextProvider>
  );
}
