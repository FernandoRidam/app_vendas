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

  scroll: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },

  row: {
    flexDirection: 'row',
  },

  actions: {
    flexDirection: 'column',
    paddingVertical: 8,
  },
});
