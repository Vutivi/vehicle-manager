const vehicle = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define('vehicle', {
      make: {
          type: DataTypes.STRING,
          unique: false,
          allowNull: false
      },
      model: {
          type: DataTypes.STRING,
          unique: false,
          allowNull: false
      },
      mileage: {
          type: DataTypes.INTEGER,
          unique: false,
          allowNull: false
      },
      year: {
          type: DataTypes.INTEGER,
          unique: false,
      },
      price: {
          type: DataTypes.DECIMAL,
          unique: false,
          allowNull: false
      }, 
      imageUrl: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: true
    },
  });
  Vehicle.associate = models => {
    Vehicle.belongsTo(models.User);
  };
  return Vehicle;
};

export default vehicle;