const syncState = (obj, params, value, index = 0) => {
  if (index < params.length - 1) {
    return {
      ...obj,
      [params[index]]: syncState(obj[params[index]], params, value, index + 1),
    };
  }

  return { ...obj, [params[index]]: value };
};

exports.syncState = syncState;
