export declare global {
  type MaritalStatus = 'Solteiro(a)' | 'Casado(a)' | 'Viúvo(a)';
  type Status = 'pending' | 'processed';
  type Sex = 'Não Identificado' | 'Masculino' | 'Feminino' | 'Outros';
  type Color = 'primary' | 'secondary' | 'success' | 'error';

  interface IProposal {
    id?: number;
    createdAt: string;
    cpfCnpj: string;
    name: string;
    ieRg?: string;
    maritalStatus: MaritalStatus;
    phone?: string;
    dateOfBirth?: string;
    cellPhone?: string;
    sex?: Sex;
    email?: string;
    state: string;
    city: string;
    neighborhood: string;
    address: string;
    number?: string;
    zipCode?: string;
    complement?: string;
    status?: Status;
  };

  interface ZipCode {
    logradouro: "Praça da Sé",
    complemento: "lado ímpar",
    bairro: "Sé",
    localidade: "São Paulo",
    uf: "SP",
  };

  interface ServiceReturn<T> {
    success: boolean;
    message?: string;
    data?: T;
  };

  interface ReportData {
    labels: Array<string>;
    values: Array<number>;
  };

  namespace ReactNavigation {
    interface RootParamList {
      home: void;
      newProposal?: IProposal;
      report: void;
    };
  };
}
