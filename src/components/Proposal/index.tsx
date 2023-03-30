import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";

import {
  AntDesign,
} from '@expo/vector-icons';

import {
  THEME,
} from "../../theme";
import { formatCpfCnpj } from "../../utils/formart";

export interface ProposalProps {
  data: IProposal;
  handleClick?: () => void;
};

export const Proposal: React.FC<ProposalProps> = ({
  data,
  handleClick,
}) => {
  return (
    <TouchableOpacity
      style={ styles.proposal }
      activeOpacity={ .6 }
      onPress={ handleClick }
    >
      <View style={ styles.column }>
        <Text style={ styles.name }>{ data.name }</Text>
        <Text style={ styles.info }>{ data.city } - { data.state }</Text>
        <Text style={ styles.info }>{ formatCpfCnpj( data.cpfCnpj )}</Text>
      </View>

      {
        data.status === 'pending'
          ? <AntDesign name="clockcircleo" size={ 28 } color={ THEME.COLORS.SECONDARY } />
          : <AntDesign name="checkcircleo" size={ 28 } color={ THEME.COLORS.SUCCESS } />
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  proposal: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: '#AAA',
    paddingVertical: 16,
  },

  name: {
    textTransform: 'uppercase',
    fontSize: 16,
  },

  info: {
    textTransform: 'uppercase',
    fontSize: 12,
    color: '#777',
    marginTop: 4,
    marginLeft: 4,
  },

  column: {
    flex: 1,
  },
});
