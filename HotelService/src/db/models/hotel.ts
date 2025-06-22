import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import sequelize from './sequelize';

class Hotel extends Model<InferAttributes<Hotel>, InferCreationAttributes<Hotel> > {
  declare id: CreationOptional<number>;
  declare name: string;
  declare address: string;
  declare location: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date | null>;
  declare rating?: number;
  declare ratingCount?: number;
}

Hotel.init({
        id: {
          type: "INTEGER",
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: "STRING",
          allowNull: false,
        },
        address: {
          type: "STRING",
          allowNull: false,
        },
        location: {
          type: "STRING",
          allowNull: false,
        },
        rating: {
          type: "FLOAT",
          allowNull: true,
          defaultValue: null,
        },
        ratingCount: {
          type: "INTEGER",
          allowNull: true,
          defaultValue: null,
        },
        createdAt: {
          type: "DATE",
          allowNull: false,
          defaultValue: new Date(),
        },
        updatedAt: {
          type: "DATE",
          allowNull: false,
          defaultValue: new Date(),
        },
        deletedAt: {
          type: "DATE",
          defaultValue: null,
        },
      },
      {
        sequelize,
        tableName: 'hotels',
        // modelName: 'Hotel',
        timestamps: true,
        underscored: true // createdAt -> created_at
      }
    );
export default Hotel;