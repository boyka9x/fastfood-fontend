import { OrderStatus } from '../models';

export const getStatusColor = (status: OrderStatus): string => {
  const statusColor = {
    order: '#B1E1FF',
    transaction: '#AFB4FF',
    shipping: '#9C9EFE',
    complete: '#A66CFF',
    cancel: '#E64848',
  };

  return statusColor[status] || '#7F8487';
};

export const capitalizeString = (str: string): string => {
  if (!str) return '';

  return `${str[0].toUpperCase()}${str.slice(1)}`;
};
