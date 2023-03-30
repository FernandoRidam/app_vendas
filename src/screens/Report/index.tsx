import {
  useState,
  useEffect,
} from "react";

import {
  View,
  Dimensions,
  Text,
} from "react-native";

import {
  BarChart,
} from "react-native-chart-kit";

import {
  AntDesign,
} from '@expo/vector-icons';

import {
  useNavigation,
  useIsFocused,
} from '@react-navigation/native';

import {
  ButtonStyled,
  Loading,
} from "../../components";

import {
  THEME,
} from "../../theme";

import {
  styles,
} from "./styles";
import { getReportProposals } from "../../services";

export const Report = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [ loading, setLoading ] = useState<boolean>( false );

  const [ data, setData ] = useState<ReportData | null>( null );

  const loadReportProposals = async () => {
    setLoading( true );

    const data = await getReportProposals();

    setData( data );

    setLoading( false );
  };

  useEffect(() => {
    if( isFocused ) loadReportProposals();
  }, [ isFocused ]);

  return (
    <View style={ styles.container }>
      <View />

      {
        loading ? <Loading /> :
          data !== null
            ? <BarChart
                verticalLabelRotation={ -90 }
                xLabelsOffset={ -45 }
                yAxisSuffix=""
                yAxisLabel=""
                data={{
                  labels: data?.labels || [],
                  datasets: [
                    {
                      data: data?.values || [],
                    }
                  ]
                }}
                width={ Dimensions.get('screen').width }
                height={ 420 }
                showValuesOnTopOfBars
                yAxisInterval={ 10 }
                flatColor
                style={{
                  backgroundColor: THEME.COLORS.BACKGROUND,
                }}
                chartConfig={{
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  backgroundGradientFrom: THEME.COLORS.BACKGROUND,
                  backgroundGradientTo: THEME.COLORS.BACKGROUND,
                  backgroundGradientToOpacity: 0,
                  decimalPlaces: 0,
                  paddingTop: 16,
                  paddingRight: 16,
                  width: Dimensions.get('screen').width - 100,
                  propsForLabels: {
                    fontSize: 14,
                  }
                }}
              />
            : <Text>Nenhum Registro Encontrado</Text>
      }

      <View style={ styles.actions }>
        <ButtonStyled
          Icon={<AntDesign name="back" size={24} color="white" />}
          label="Voltar"
          color="primary"
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};
