import moment from 'moment';

export const formatDate = (str: string | undefined): string => {
  if (!str) return 'x';
  return moment(str).format('H:mm DD/MM/YYYY').toString();
};

export const formatRelativeTime = (str: string | undefined): string => {
  if (!str) return 'x';
  return moment(str).fromNow();
};
