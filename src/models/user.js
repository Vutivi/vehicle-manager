const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
      username: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false
      },
      email: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false
      },
      first_name: {
          type: DataTypes.STRING,
          unique: false,
          allowNull: false
      },
      last_name: {
          type: DataTypes.STRING,
          unique: false,
      },
      password: {
          type: DataTypes.STRING,
          unique: false,
          allowNull: false
      }
  });

  User.associate = models => {
      User.hasMany(models.Vehicle, { onDelete: 'CASCADE' });
  };

  User.findByLogin = async (login, password) => {
      let user = await User.findOne({
        where: { username: login },
      });
      if (!user) {
        user = await User.findOne({
          where: { email: login },
        });
      }
      return user;
    };
  
  return User;
};
export default user;