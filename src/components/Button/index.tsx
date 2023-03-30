import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  StyleSheet,
} from 'react-native';
import {
  THEME,
} from "../../theme";
import { getColor } from '../../utils/getColor';

export interface ButtonStyledProps extends TouchableOpacityProps {
  Icon: React.ReactNode;
  label: string;
  color: 'primary' | 'secondary' | 'success' | 'error';
};

export const ButtonStyled: React.FC<ButtonStyledProps> = ({
  Icon,
  label,
  color,
  ...rest
}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        backgroundColor: getColor( color ),
      }}
      activeOpacity={ .8 }
      { ...rest }
    >
      { Icon }

      <Text style={ styles.label }>{ label }</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },

  label: {
    marginLeft: 16,
    color: '#FFF',
  },
});
