import AsyncStorage from "@react-native-async-storage/async-storage";
import { removeDuplicates } from "../utils/removeDuplicates";

export const createProposal = async ( proposal: IProposal ) => {
  const proposals = JSON.parse( await AsyncStorage.getItem('@Proposals') || '[]') as Array<IProposal>;

  await AsyncStorage.setItem('@Proposals', JSON.stringify([ proposal, ...proposals ]));
};

export const getProposals = async (): Promise<Array<IProposal>> => {
  return JSON.parse( await AsyncStorage.getItem('@Proposals') || '[]') as Array<IProposal>;
};

export const editProposal = async ( id: number, newProposal: IProposal ) => {
  let proposals = JSON.parse( await AsyncStorage.getItem('@Proposals') || '[]') as Array<IProposal>;

  proposals = proposals.map(( proposal ) => {
    if( proposal.id === id ) return newProposal;

    return proposal;
  });

  await AsyncStorage.setItem('@Proposals', JSON.stringify( proposals ));
};

export const clearProposals = async () => {
  await AsyncStorage.clear();
};

export const deleteProposal = async ( id: number ) => {
  let proposals = JSON.parse( await AsyncStorage.getItem('@Proposals') || '[]') as Array<IProposal>;

  proposals = proposals.filter(( proposal ) => proposal.id !== id );

  await AsyncStorage.setItem('@Proposals', JSON.stringify( proposals ));
};

export const getReportProposals = async (): Promise<ReportData | null> => {
  const proposals = JSON.parse( await AsyncStorage.getItem('@Proposals') || '[]') as Array<IProposal>;

  if( proposals.length === 0 ) return null;

  const cities = removeDuplicates(proposals.map(( proposal ) => proposal.city ));
  const data = cities.map(( city ) => {
    let count = 0;

    proposals.forEach(( proposal ) => {
      if( proposal.city === city ) count ++;
    });

    return count;
  });

  return {
    labels: cities,
    values: data,
  };
};
