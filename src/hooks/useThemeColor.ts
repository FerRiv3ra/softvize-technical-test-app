import { useSelector } from "react-redux";
import { appConfigSelectors } from "../store/appConfig/appConfig";
import { Colors } from "../utils/constants/Colors";

export function useThemeColor() {
  const isDarkMode = useSelector(appConfigSelectors.isDarkMode);

  const colors = isDarkMode ? Colors.dark : Colors.light;

  return colors;
}
