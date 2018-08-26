exports.filter = function (users) {
  let data = {};

  users.forEach(u => {
    let user = {
      id: u.dataValues.id,
      nickname: u.dataValues.nickname,
      registerIp: u.dataValues.registerIp,
      registerTime: u.dataValues.registerTime,
      roles:  u.dataValues.roles
    };

    data[user.id] = user;
  });

  return data;
};