import SelectDropdown, {
  SelectDropdownProps
} from 'react-native-select-dropdown';

import {
  AntDesign,
} from '@expo/vector-icons';

import {
  THEME,
} from "../../theme";

export interface Option {
  label: string;
  value: any;
};

export const Select: React.FC<SelectDropdownProps> = ({
  data,
  onSelect,
  ...rest
}) => {
  return (
    <SelectDropdown
      data={data}
      onSelect={ onSelect }
      buttonTextAfterSelection={( item: Option ) => item.label }
      rowTextForSelection={( item: Option ) => item.label }
      selectedRowTextStyle={{
        color: THEME.COLORS.PRIMARY,
      }}
      selectedRowStyle={{
        backgroundColor: `${ THEME.COLORS.PRIMARY }22`,
      }}
      renderDropdownIcon={(selected) => selected
        ? <AntDesign name="caretup" size={ 10 } color="black" />
        : <AntDesign name="caretdown" size={ 10 } color="black" />
      }
      statusBarTranslucent
      dropdownStyle={{
        borderRadius: 8,
      }}
      buttonStyle={{
        width: '100%',
        borderWidth: 1,
        borderRadius: 8,
      }}
      { ...rest }
    />
  );
};
