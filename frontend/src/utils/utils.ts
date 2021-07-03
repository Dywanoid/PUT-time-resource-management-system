import { Moment } from 'moment';

const formatDateForBackend = (date: Moment): string => date.format('YYYY-MM-DD');

export { formatDateForBackend };