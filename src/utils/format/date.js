import moment from 'moment';

function formatTimeStampToDate(date) {
  if (!date) return '';
  try {
    return moment(date).utc().format('DD/MM/YYYY');
  } catch (e) {
    return date;
  }
}

function formatTimeStampGetTime(date) {
  if (!date) return '';
  try {
    return moment(date).format('HH:mm');
  } catch (e) {
    return date;
  }
}

function formatDateMaterial(date) {
  // timeStamp -> time of mui
  if (!date) return null;
  try {
    return moment(date).format('YYYY-MM-DD');
  } catch (e) {
    return date;
  }
}

function formatDateMaterialToTimeStamp(date) {
  if (!date) return '';
  try {
    const dateFormat = new Date(date);
    // return moment(dateFormat).format().replace('+07:00', '.000').replace('+06:42', '.000') + 'Z';
    return moment(dateFormat).format().slice(0, 19) + '.000Z';
  } catch (e) {
    return date;
  }
}

export {
  formatDateMaterial,
  formatDateMaterialToTimeStamp,
  formatTimeStampToDate,
  formatTimeStampGetTime,
};
