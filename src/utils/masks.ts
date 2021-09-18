export const phoneMask = (phone: string) =>
  phone
    .replace(/^(8|(\+7))/g, '')
    .replace(/\D/g, '')
    .replace(/^(\d)/, '($1')
    .replace(/^(\(\d{3})(\d)/, '$1) $2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
    .replace(/^(\(\d{3}\)\s\d{3}-\d{2}-\d{2})$/g, '+7 $1');
