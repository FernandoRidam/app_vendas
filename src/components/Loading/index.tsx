import {
  ActivityIndicator,
} from "react-native";

import {
  THEME,
} from "../../theme";

export const Loading = () => {
  return (
    <ActivityIndicator
      color={ THEME.COLORS.PRIMARY }
      size={ 64 }
    />
  );
};
