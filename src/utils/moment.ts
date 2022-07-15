import moment from 'moment';

export const formatDate = (str: string | undefined): string => {
  if (!str) return 'x';
  return moment(str).format('DD-MM-YYYY H:mm').toString();
};
