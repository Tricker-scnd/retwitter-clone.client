import { format, formatDistanceStrict, getDaysInMonth } from 'date-fns';
import { ru } from 'date-fns/locale';

export const formatDate = (date: Date) => format(date, 'p  •  PPP', { locale: ru });

export const formatDateDistance = (date: Date) =>
  formatDistanceStrict(date, new Date(), { locale: ru, addSuffix: true });

export const formatDateToString = (y: number, m: number, d: number) => `${y}-${m}-${d}`;

export const formatRegisterDate = (date: Date) => format(date, 'PP', { locale: ru });
