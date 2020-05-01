module.exports = (sequelize, DataTypes) => {
    const Note = sequelize.define('note', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            author: DataTypes.STRING,
            content: DataTypes.STRING,
        },
        {
            freezeTableName: true,
        }
    );
    return Note;
}
