import React from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

export const IconButton: React.FC<TouchableOpacityProps> = ({
  children,
  ...rest
}) => {
  return (
    <TouchableOpacity
      activeOpacity={ .8 }
      style={{
        borderRadius: 16,
        padding: 4,
      }}
      { ...rest }
    >
      { children }
    </TouchableOpacity>
  );
};
