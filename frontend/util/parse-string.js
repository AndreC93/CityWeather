export const formatName = name => {
  const filteredName = name.match(/([A-Z | a-z])+/g);

  if (filteredName) {
    return filteredName
      .map(word => capitalize(word))
      .join(" ");
  } else {
    return '';
  }
}

export const capitalizeAll = str => {
  return str.split(' ').map(word => capitalize(word)).join(' ');
}

export const capitalize = str => {
  if (!str) return '';
  return str[0].toUpperCase() + str.slice(1);
}