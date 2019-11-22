// ИЗМЕНЕНИЕ ОТОБРАЖЕНИЯ КОЛИЧЕСТВА просмотров
const viewCountFunc = (count) => {
  if (count >= 1000000000) {
    return `${Math.floor((count / 1000000000) * 10) / 10} млрд. просмотров`;
  }
  if (count >= 1000000) {
    return `${Math.floor((count / 1000000) * 10) / 10} млн. просмотров`;
  }
  if (count >= 1000) {
    return `${Math.floor(count / 1000)} тыс. просмотров`;
  }
  return `${count} просмотров`;
};

export default viewCountFunc;
