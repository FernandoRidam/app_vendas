import {
  StyleSheet,
} from 'react-native';

import {
  THEME,
} from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.BACKGROUND,
  },

  top: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  flatList: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },

  actions: {
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
