import { Model, DataTypes } from 'sequelize';
import sequelize from './db/client-sequelize.js';

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                // Define the model attributes
                name: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                date: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    
                }
            },
            {
                sequelize,
                modelName: 'Event',
                tableName: 'event'
            }
        );
    }
}

Model.init(sequelize);

export default Model;