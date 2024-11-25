import * as yup from 'yup';

export const userSchema = yup.object().shape({

    nome_completo: yup.string().min(10).max(50),
    email: yup.string().email.required,
    telefone: yup.string().required,
    CNPJ: yup.string().required,
    endereco: yup.string().required,
    cidade: yup.string().required,
});
