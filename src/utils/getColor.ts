import {
  THEME
} from "../theme";

export const getColor = ( color: Color ): string => {
  switch ( color ) {
    case 'primary':
      return THEME.COLORS.PRIMARY;

    case 'secondary':
      return THEME.COLORS.SECONDARY;

    case 'success':
      return THEME.COLORS.SUCCESS;

      case 'error':
        return THEME.COLORS.ERROR;

    default:
      return THEME.COLORS.PRIMARY;
  }
};
