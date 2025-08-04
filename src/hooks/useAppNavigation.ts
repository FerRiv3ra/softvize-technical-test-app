/**
 * Custom hook to provide navigation functionality in the app.
 * This hook wraps the `useNavigation` hook from React Navigation and provides
 * a strongly typed navigation prop for better type safety and autocompletion.
 *
 * @returns {NavigationProp} - The navigation prop with strongly typed methods.
 *
 * @template RouteName - A key from `AppScreensParamList` representing the name of a screen.
 * @template NavigatorName - A key from `AppScreensParamList` representing the name of a nested navigator.
 * @template ScreenName - A key from `AppScreensParamList` representing the name of a screen within a nested navigator.
 *
 * @typedef {Object} NavigationProp
 * @property {function(RouteName, params?: AppScreensParamList[RouteName]): void} navigate - Navigates to a specific screen in the app.
 * @property {function(NavigatorName, { screen: ScreenName, params?: AppScreensParamList[ScreenName] }): void} navigate - Navigates to a specific screen in a nested navigator.
 * @property {function({ index: number, routes: { name: keyof AppScreensParamList, params?: unknown }[] }): void} reset - Resets the navigation state to a new state.
 * @property {function(): void} goBack - Navigates back to the previous screen in the navigation stack.
 */
import { useNavigation } from "@react-navigation/native";
import { AppScreensParamList } from "../screens/AppScreens";

type NavigationProp = {
  /**
   * Navigates to a specific screen in the app.
   * @param screen - The name of the screen to navigate to.
   * @param params - (Optional) Parameters to pass to the target screen.
   */
  navigate<RouteName extends keyof AppScreensParamList>(
    screen: RouteName,
    params?: AppScreensParamList[RouteName]
  ): void;

  /**
   * Navigates to a specific screen in a nested navigator.
   * @param navigator - The name of the nested navigator.
   * @param params - An object containing the screen name and optional parameters.
   */
  navigate<
    NavigatorName extends keyof AppScreensParamList,
    ScreenName extends keyof AppScreensParamList
  >(
    navigator: NavigatorName,
    params: {
      screen: ScreenName;
      params?: AppScreensParamList[ScreenName];
    }
  ): void;

  /**
   * Pushes a new screen onto the navigation stack.
   * @param screen - The name of the screen to push.
   * @param params - (Optional) Parameters to pass to the target screen.
   *
   * @note This navigation only works for stack navigators and the screen must be in the same navigator.
   */
  push<RouteName extends keyof AppScreensParamList>(
    screen: RouteName,
    params?: AppScreensParamList[RouteName]
  ): void;

  /**
   * Resets the navigation state to a new state.
   * @param state - An object containing the new state, including the index and routes.
   */
  reset(state: {
    index: number;
    routes: { name: keyof AppScreensParamList; params?: unknown }[];
  }): void;

  /**
   * Navigates back to the previous screen in the navigation stack.
   */
  goBack(): void;
  replace<RouteName extends keyof AppScreensParamList>(
    route: RouteName,
    params?: AppScreensParamList[RouteName]
  ): void;

  /**
   * Checks if the navigation stack can go back.
   * @returns {boolean} - Returns true if there is a previous screen to go back to, otherwise false.
   */
  canGoBack(): boolean;
};

export const useAppNavigation = () => useNavigation<NavigationProp>();
