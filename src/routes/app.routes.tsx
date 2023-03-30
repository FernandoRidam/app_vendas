import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import {
  Home,
  NewProposal,
  Report,
} from '../screens';

import {
  THEME,
} from '../theme';

const {
  Navigator,
  Screen,
} = createNativeStackNavigator();

export const AppRoutes = () => {
  return (
    <Navigator
      screenOptions={{
        headerTintColor: '#FFF',
        headerStyle: {
          backgroundColor: THEME.COLORS.PRIMARY
        }
      }}
    >
      <Screen
        name="home"
        component={ Home }
        options={{
          headerTitle: 'Propostas de Venda',
        }}
      />

      <Screen
        name="newProposal"
        component={ NewProposal }
        options={{
          headerTitle: 'Proposta de Venda',
        }}
      />

      <Screen
        name="report"
        component={ Report }
        options={{
          headerTitle: 'Relatório',
        }}
      />
    </Navigator>
  );
};
