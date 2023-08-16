import moment from 'moment';

export const formatDate = (date: string) => {
  if (date)
    return moment(date).format('DD/MM/YYYY');
};
