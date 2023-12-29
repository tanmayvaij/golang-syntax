import React, { useEffect, useState, useRef, useContext } from "react";
import { AppState, LogBox } from "react-native";
import FlashMessage from "react-native-flash-message";
import { AuthContext, Provider } from "./src/context";
import MainNavigator from "./src/navigation/navigator";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

LogBox.ignoreAllLogs();

export default function App() {
  const authContext = useContext(AuthContext);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState("");

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        !appState.current.match(/inactive|background/) &&
        nextAppState !== "active"
      ) {
        authContext?.savePin("1847");
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, [appStateVisible, authContext]);

  return (
    <React.Fragment>
      <Provider>
        <ActionSheetProvider>
          <>
            <MainNavigator />
            <FlashMessage />
          </>
        </ActionSheetProvider>
      </Provider>
    </React.Fragment>
  );
}
