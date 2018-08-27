exports.index = function (datas, column) {
  let newDatas = {};

  datas.forEach(d => {
    newDatas[d.dataValues[column]] = d;
  });

  return newDatas;
};