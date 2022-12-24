import validator from "validator";
module.exports = (sequelize, Sequelize) => {
    const userSchema = sequelize.define('userSchema', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        fullname: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Ad Soyad boş bırakılamaz."
                },
                len: {
                    args: [3, 50],
                    msg: "Ad Soyad en az 3 en fazla 50 karakter olabilir."
                }
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Şifre boş bırakılamaz."
                },
                len: {
                    args: [6, 50],
                    msg: "Şifre en az 6 en fazla 50 karakter olabilir."
                }
            }
        },
        corectionPassword: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Şifre tekrarı boş bırakılamaz."
                },
                len: {
                    args: [6, 50],
                    msg: "Şifre tekrarı en az 6 en fazla 50 karakter olabilir."
                }
            }
        },
        phoneNumber: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Telefon numarası boş bırakılamaz."
                },
                len: {
                    args: [10, 10],
                    msg: "Telefon numarası 10 karakter olmalıdır."
                }
            }
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                    msg: "Email boş bırakılamaz."
                },
                isEmail: {
                    msg: "Email formatı uygun değil."
                },
                len: {
                    args: [3, 50],
                    msg: "Email en az 3 en fazla 50 karakter olabilir."
                }
            }
        },

    });

    return userSchema;
}
