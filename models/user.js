module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
          username: {
              type: DataTypes.STRING,
              primaryKey: true,
          },
          firstname: DataTypes.STRING,
          lastname: DataTypes.STRING,
          email: DataTypes.STRING,
          password: DataTypes.STRING,
          salt: DataTypes.STRING
      },
      {
          freezeTableName: true,
      }
  );
  return User;
}
