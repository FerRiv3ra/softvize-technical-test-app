import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

import { ProjectFonts } from "./src/assets/fonts";
import AppNavigation from "./src/navigation";
import { store } from "./src/store/store";

function RootLayout() {
  const [loaded] = useFonts(ProjectFonts);

  if (!loaded) return null;

  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <StatusBar style="dark" />
        <SafeAreaProvider>
          <NavigationContainer>
            <AppNavigation />
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default RootLayout;
