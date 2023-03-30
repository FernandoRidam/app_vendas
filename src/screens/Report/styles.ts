import {
  StyleSheet,
} from 'react-native';

import {
  THEME,
} from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: THEME.COLORS.BACKGROUND,
  },

  actions: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
