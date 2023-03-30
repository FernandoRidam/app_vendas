import axios from "axios";

export const getZipCodeData = async ( zipCode: string ): Promise<ServiceReturn<ZipCode>> => {
  try {
    const {
      data,
    } = await axios.get(`https://viacep.com.br/ws/${ zipCode }/json/`);

    if( data. erro ) throw new Error;

    return {
      success: true,
      data: data as ZipCode,
    };
  } catch (error) {
    return {
      success: false,
      message: 'CEP não encontrado',
    };
  }
};
