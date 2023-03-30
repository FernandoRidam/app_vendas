import {
  useEffect,
} from 'react';

import {
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  useForm,
} from "react-hook-form";

import {
  yupResolver,
} from '@hookform/resolvers/yup';

import {
  AntDesign,
} from '@expo/vector-icons';

import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import {
  createProposal,
  deleteProposal,
  editProposal,
  getZipCodeData,
} from '../../services';

import {
  ButtonStyled,
  IconButton,
  InputForm,
} from '../../components';

import {
  styles,
} from './styles';

import {
  newProposalSchema,
} from '../../schemas';

import {
  Masks,
} from 'react-native-mask-input';
import { idGenerator } from '../../utils/idGenerator';
import { THEME } from '../../theme';

const initialValue = {
  createdAt: Intl.DateTimeFormat('pt-BR').format( new Date()),
  cpfCnpj: '',
  name: '',
  ieRg: '',
  maritalStatus: '',
  dateOfBirth: '',
  sex: '',
  phone: '',
  cellPhone: '',
  email: '',
  zipCode: '',
  state: '',
  city: '',
  neighborhood: '',
  address: '',
  complement: '',
  number: '',
};

export const NewProposal = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const proposal = route.params as IProposal;

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    setError,
  } = useForm<IProposal>({
    mode: 'onChange',
    defaultValues: proposal || initialValue,
    resolver: yupResolver( newProposalSchema ),
  });

  const handleChangeStatus = async ( status: Status ) => {
    const newProposal = proposal;

    newProposal.status = status;
    await editProposal( proposal.id as number, newProposal);

    navigation.goBack();
  };

  const handleDeleteProposal = async () => {
    if( proposal ) {
      await deleteProposal( proposal.id as number );

      navigation.goBack();
    }
  };

  const onSubmit = async ( data: IProposal ) => {
    data.id = idGenerator();
    data.status = 'pending';

    await createProposal( data );

    navigation.goBack();
  };

  const loadZipCodeData = async ( zipCode: string ) => {
    const result = await getZipCodeData( zipCode );

    if( result.success && result.data ) {
      setValue('state', result.data?.uf, { shouldValidate: true });
      setValue('city', result.data?.localidade, { shouldValidate: true });
      setValue('neighborhood', result.data?.bairro, { shouldValidate: true });
      setValue('address', result.data?.logradouro, { shouldValidate: true });
      setValue('complement', result.data?.complemento, { shouldValidate: true });
    } else {
      setError('zipCode', {
        type: 'required',
        message: result.message,
      });
    }
  };

  const zipCode = watch('zipCode');

  useEffect(() => {
    if( zipCode?.replace(/\D+/g, "").length === 8 && zipCode !== proposal?.zipCode ) {
      loadZipCodeData( zipCode );
    }
  }, [ zipCode ]);

  useEffect(() => {
    if( proposal ) {
      navigation.setOptions({
        headerRight: () =>
          <IconButton
            onPress={() => handleDeleteProposal()}
          >
            <AntDesign name="delete" size={24} color={ THEME.COLORS.ERROR } />
          </IconButton>
      });
    }
  }, []);

  return (
    <View style={ styles.container }>
      <ScrollView contentContainerStyle={ styles.scroll }>
        <View style={ styles.row }>
          <InputForm
            control={ control }
            name="createdAt"
            label="Dt. Proposta*"
            width={ 2 }
            disabled
          />

          <View style={{ width: 16 }} />

          <InputForm
            control={ control }
            name="cpfCnpj"
            label="CPF/CNPJ*"
            width={ 2 }
            disabled={ !!proposal?.id && !!proposal?.cpfCnpj }
            mask={( value ) => {
              value = value || '';
              if( value?.replace(/\D+/g, "").length <= 11 )
                return Masks.BRL_CPF;
              else
                return Masks.BRL_CNPJ;
            }}
          />
        </View>

        <InputForm
          control={ control }
          name="name"
          label="Nome do Titular*"
        />

        <View style={ styles.row }>
          <InputForm
            control={ control }
            name="ieRg"
            label="IE/RG"
            width={ 2 }
            disabled={ !!proposal?.id && !!proposal?.ieRg }
            keyboardType="numeric"
          />

          <View style={{ width: 16 }} />

          <InputForm
            control={ control }
            name="maritalStatus"
            label="Estado Civil*"
            width={ 2 }
            options={[
              {
                label: 'Solteiro(a)',
                value: 'Solteiro(a)',
              },
              {
                label: 'Casado(a)',
                value: 'Casado(a)',
              },
              {
                label: 'Viúvo(a)',
                value: 'Viúvo(a)',
              },
            ]}
          />
        </View>

        <View style={ styles.row }>
          <InputForm
            control={ control }
            name="dateOfBirth"
            label="Dt. de Nascimento"
            width={ 2 }
            mask={ Masks.DATE_DDMMYYYY }
          />

          <View style={{ width: 16 }} />

          <InputForm
            control={ control }
            name="sex"
            label="Sexo"
            width={ 2 }
            options={[
              {
                label: 'Não Identificado',
                value: 'Não Identificado',
              },
              {
                label: 'Masculino',
                value: 'Masculino',
              },
              {
                label: 'Feminino',
                value: 'Feminino',
              },
              {
                label: 'Outros',
                value: 'Outros',
              },
            ]}
          />
        </View>

        <View style={ styles.row }>
          <InputForm
            control={ control }
            name="phone"
            label="Telefone"
            width={ 2 }
            mask={ Masks.BRL_PHONE }
          />

          <View style={{ width: 16 }} />

          <InputForm
            control={ control }
            name="cellPhone"
            label="Celular"
            width={ 2 }
            mask={ Masks.BRL_PHONE }
          />
        </View>

        <InputForm
          control={ control }
          name="email"
          label="Email"
          keyboardType="email-address"
        />

        <View style={ styles.row }>
          <InputForm
            control={ control }
            name="zipCode"
            label="CEP*"
            width={ 1 }
            mask={ Masks.ZIP_CODE }
          />

          <View style={{ width: 16 }} />

          <InputForm
            control={ control }
            name="state"
            label="Estado*"
            width={ 1 }
            disabled
          />
        </View>

        <InputForm
          control={ control }
          name="city"
          label="Cidade*"
          placeholder="Digite o CEP para buscar"
          width={ 2 }
          disabled
        />

        <InputForm
          control={ control }
          name="neighborhood"
          label="Bairro*"
        />

        <InputForm
          control={ control }
          name="address"
          label="Endereço*"
        />

        <View style={ styles.row }>


        <InputForm
            control={ control }
            name="complement"
            label="Complemento"
            width={ 3 }
          />

          <View style={{ width: 16 }} />

          <InputForm
            control={ control }
            name="number"
            label="Número"
            width={ 1 }
          />
        </View>

        <View style={ styles.actions }>
          {
            proposal?.id && (
              <>
                <ButtonStyled
                  Icon={<AntDesign name={ proposal?.status === 'pending' ? 'checkcircleo' : 'clockcircleo'} size={24} color="white" />}
                  label={`Marcar como ${ proposal?.status === 'pending' ? 'processado' : 'pendente'}`}
                  color={ proposal?.status === 'pending' ? 'success' : 'secondary'}
                  onPress={() => handleChangeStatus( proposal?.status === 'pending' ? 'processed' : 'pending')}
                />

                <View style={{ height: 8 }} />
              </>
            )
          }

          <ButtonStyled
            Icon={<AntDesign name="save" size={24} color="white" />}
            label="Salvar"
            color="primary"
            onPress={ handleSubmit( onSubmit )}
          />
        </View>
      </ScrollView>
    </View>
  );
};
