import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';

import {
  View,
  FlatList,
} from 'react-native';

import {
  useNavigation,
  useIsFocused,
} from '@react-navigation/native';

import {
  AntDesign,
} from '@expo/vector-icons';

import {
  ButtonStyled,
  Input,
  Option,
  Proposal,
  Select,
} from '../../components';

import {
  styles,
} from './styles';

import {
  THEME,
} from '../../theme';

import {
  getProposals,
} from '../../services';

type Filter = Status | null;

const options: Array<Option> = [
  {
    label: 'Todos',
    value: null,
  },

  {
    label: 'Pendente',
    value: 'pending',
  },

  {
    label: 'Processado',
    value: 'processed',
  }
];

export const Home = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [ filter, setFilter ] = useState<Filter>( null );
  const [ search, setSearch ] = useState<string>('');

  const [ proposals, setProposals ] = useState<Array<IProposal>>([]);

  const [ filteredProposals, setFilteredProposals ] = useState<Array<IProposal>>([]);

  const handleClick = ( proposal?: IProposal ) => navigation.navigate('newProposal', proposal );

  const filterProposals = useCallback(( filter: Filter, search: string ) => {
    let currentProposals = proposals;

    if( filter ) {
      currentProposals = currentProposals.filter(( proposal ) => proposal.status === filter );
    }

    if( search ) {
      currentProposals = currentProposals.filter(( proposal ) =>
        proposal.name.toLowerCase().includes( search.toLowerCase()) ||
        proposal.cpfCnpj.toLowerCase().includes( search.toLowerCase()) ||
        proposal.cellPhone?.toLowerCase().includes( search.toLowerCase()) ||
        proposal.email?.toLowerCase().includes( search.toLowerCase()) ||
        proposal.phone?.toLowerCase().includes( search.toLowerCase())
      );
    }

    setFilteredProposals( currentProposals );
  }, [ proposals ]);

  const loadProposals = async () => {
    const _proposals = await getProposals();

    setProposals( _proposals );
    setFilteredProposals( _proposals );
  };

  useEffect(() => {
    filterProposals( filter, search );
  }, [ filter, search ]);

  useEffect(() => {
    if( isFocused ) loadProposals();
  }, [ isFocused ]);

  return (
    <View style={ styles.container }>
      <View style={ styles.top }>
        <Select
          data={ options }
          onSelect={( option ) => setFilter( option.value )}
          defaultButtonText="Filtrar por"
        />

        <Input
          placeholder="Buscar"
          value={ search }
          onChangeText={ setSearch }
          prefixIcon={<AntDesign name="search1" size={ 24 } color={ THEME.COLORS.CAPTION } />}
        />
      </View>

      <FlatList
        data={ filteredProposals }
        renderItem={({ item }) =>
          <Proposal
            data={ item }
            handleClick={() => handleClick( item )}
          />
        }
        contentContainerStyle={ styles.flatList }
      />

      <View style={ styles.actions }>
        <ButtonStyled
          Icon={<AntDesign name="addfile" size={24} color="white" />}
          label="Nova Proposta"
          color="primary"
          onPress={() => handleClick()}
        />

        <View style={{ height: 8 }} />

        <ButtonStyled
          Icon={<AntDesign name="printer" size={24} color="white" />}
          label="Relatório"
          color="success"
          onPress={() => navigation.navigate('report')}
        />
      </View>
    </View>
  );
};
