import * as yup from 'yup';

export const todoFormSchema = yup.object().shape({
  todo: yup.string().required('Please enter the title').min(8).max(50),
  userId: yup.number().required('Please select user'),
  completed: yup.boolean().optional().default(false),
});

export type TodoFormInput = yup.InferType<typeof todoFormSchema>;
