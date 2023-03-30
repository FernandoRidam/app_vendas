import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

import {
  AntDesign,
} from '@expo/vector-icons';

import SelectDropdown from "react-native-select-dropdown";

import MaskInput, {
  Mask,
} from 'react-native-mask-input';

import {
  THEME,
} from "../../theme";
import { Option } from "../Select";

export interface InputProps extends TextInputProps {
  prefixIcon?: React.ReactNode;
  label?: string;
  error?: string;
  width?: 4 | 3 | 2 | 1;
  formError?: boolean;
  disabled?: boolean;
  options?: Array<Option>;
  mask?: Mask;
};

export const Input: React.FC<InputProps> = ({
  prefixIcon,
  label,
  error = '',
  width = 0,
  formError = false,
  disabled = false,
  options = null,
  mask = null,
  ...rest
}) => {

  return (
    <View style={{
      flex: width,
    }}>
      <View
        style={[
          styles.inputView,
          disabled ? styles.disabled : {},
          error ? styles.borderError : {}
        ]}
      >
        {
          label &&
            <Text
              style={[
                styles.label,
                error ? styles.labelError : {},
              ]}
            >
              { label }
            </Text>
        }

        { prefixIcon }

        {
          !disabled
            ? !!options
                ? <SelectDropdown
                    data={ options }
                    onSelect={( option: Option ) => rest.onChangeText && rest.onChangeText( option.value )}
                    buttonTextAfterSelection={( item: Option ) => item.label }
                    rowTextForSelection={( item: Option ) => item.label }
                    renderDropdownIcon={(selected) => selected
                      ? <AntDesign name="caretup" size={ 10 } color="black" />
                      : <AntDesign name="caretdown" size={ 10 } color="black" />
                    }
                    statusBarTranslucent
                    defaultButtonText=" "
                    buttonTextStyle={ styles.input }
                    dropdownStyle={{
                      borderRadius: 8,
                    }}
                    buttonStyle={ styles.input }
                  />
                : !!mask
                    ? <MaskInput
                        style={{
                          ...styles.input,
                          marginLeft: prefixIcon ? 16 : 0,
                        }}
                        { ...rest }
                        onChangeText={( masked ) => rest.onChangeText && rest.onChangeText( masked )}
                        mask={ mask }
                        keyboardType="numeric"
                      />
                    : <TextInput
                        style={{
                          ...styles.input,
                          marginLeft: prefixIcon ? 16 : 0,
                        }}
                        { ...rest }
                      />
            : <Text
                style={[
                  styles.input,
                  disabled ? styles.disabledValue : {}
                ]}
              >
                { rest.value || rest.placeholder }
              </Text>
        }
      </View>

      {
        formError && <Text style={ styles.errorText }>{ error }</Text>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginTop: 16,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: THEME.COLORS.CAPTION,
  },

  borderError: {
    borderColor: THEME.COLORS.ERROR,
  },

  disabled: {
    borderColor: THEME.COLORS.CAPTION_DISABLED,
  },

  label: {
    position: 'absolute',
    left: 8,
    top: -16,
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: '#FFF',
    color: THEME.COLORS.CAPTION,
  },

  labelError: {
    color: THEME.COLORS.ERROR,
  },

  input: {
    flex: 1,
    fontSize: 16,
    height: 28,
    backgroundColor: THEME.COLORS.BACKGROUND,
  },

  disabledValue: {
    color: THEME.COLORS.CAPTION,
  },

  errorText: {
    marginTop: 4,
    marginLeft: 8,
    fontSize: 12,
    fontWeight: 'bold',
    color: THEME.COLORS.ERROR,
  },
});
