
import * as yup from "yup";
import { validateCpfCnpj } from "../utils/validate";

const requiredMessage = 'Campo Obrigatório'

export const newProposalSchema = yup.object({
  createdAt: yup.string().required( requiredMessage ),
  cpfCnpj: yup
    .string()
    .required( requiredMessage )
    .test(
      'test-invalid-cpf',
      function(cpf) {
        cpf = cpf.replace(/\D+/g, "");

        if(!validateCpfCnpj(cpf)){
          if(cpf.length <= 11) return this.createError({ message: 'CPF Inválido'});
          else return this.createError({ message: 'CNPJ Inválido'});
        }

        return true;
      }),
  name: yup.string().required( requiredMessage ),
  maritalStatus: yup.string<MaritalStatus>().required( requiredMessage ),
  state: yup.string().required( requiredMessage ),
  city: yup.string().required( requiredMessage ),
  neighborhood: yup.string().required( requiredMessage ),
  address: yup.string().required( requiredMessage ),
  email: yup.string().email('Email inválido'),
});
