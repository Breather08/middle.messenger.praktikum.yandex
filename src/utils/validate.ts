import { FormData } from '../types/form';

export const validateForm = (formData: FormData, inputAmount: number) => {
  let formError = '';

  const formEntries = Object.values(formData);
  if (formEntries.length < inputAmount) {
    formError = 'Заполните все поля';
    alert(formError);
    return;
  }
  formEntries.forEach((params) => {
    if (!params.isValid) {
      formError = 'Убедитесь что поля заполнены верно';
    }
  });
  if (formError) {
    alert(formError);
    return;
  }
  console.log(formData);
};
