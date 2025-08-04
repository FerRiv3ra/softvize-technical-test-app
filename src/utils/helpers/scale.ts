import { Dimensions } from "react-native";
import DeviceInfo from "react-native-device-info";

const { width: fullWidth, height: fullHeight } = Dimensions.get("window");

const isTablet = DeviceInfo.isTablet();
// this is from dimensions of the iphone 15 pro max
const HEIGHT_DESIGN_REF = 956;
const WIDTH_DESIGN_REF = 440;

const heightRef = fullHeight / HEIGHT_DESIGN_REF; // Base height for scaling
const widthRef = fullWidth / WIDTH_DESIGN_REF; // Base width for scaling
const fontRef = fullHeight / HEIGHT_DESIGN_REF; // Base font scaling

type ScaleType = "width" | "height" | "font";

/**
 * Scale a value based on the device dimensions.
 * @param {number} size - The value to scale.
 * @param {'width'|'height'|'font'} type - The scaling type.
 * @returns {number} - The scaled value.
 */

const scale = (size: number, type: ScaleType = "width"): number => {
  if (isTablet) {
    return size;
  }
  switch (type) {
    case "height":
      return size * heightRef;
    case "font":
      return size * fontRef;
    default:
      return size * widthRef;
  }
};

// this is used to force the scale to be the same on all devices
const forceScale = (size: number, type: ScaleType = "width") => {
  switch (type) {
    case "height":
      return size * heightRef;
    case "font":
      return size * fontRef;
    default:
      return size * widthRef;
  }
};

const screenIsSmall = fullHeight < 700;

export {
  fontRef,
  forceScale,
  fullHeight,
  fullWidth,
  heightRef,
  isTablet,
  scale,
  screenIsSmall,
  widthRef,
};
