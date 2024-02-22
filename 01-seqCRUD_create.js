import { DataTypes, Sequelize } from "sequelize";

const sequelize = new Sequelize("test", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

await sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

const colorsArr = ["light", "dark", "silver", "blue", "red"];

const WebShopCustomer = sequelize.define("WebShopCustomer", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    validate: {
      isInt: true,
    },
  },
  name: {
    type: DataTypes.STRING(16),
    allowNull: false,
    validate: {
      len: [1, 16],
    },
  },
  surname: {
    type: DataTypes.STRING(32),
    allowNull: false,
    validate: {
      len: [1, 32],
    },
  },
  email: {
    type: DataTypes.STRING(128),
    allowNull: false,
    unique: true,
    validate: {
      len: [5, 128],
      isEmail: true,
    },
  },
  shopPoints: {
    comment: "Points earned in the web shop",
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 100000,
      notNull: {
        msg: "Points can't be null",
      },
      notBelowZero(value) {
        if (value < 0) {
          throw new Error("Points can't be null");
        }
      },
    },
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 18,
      max: 100,
      notNull: {
        msg: "age can't be null",
      },
    },
  },
  registerDate: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: true,
    validate: {
      isDate: true,
      isAfter: "2010-01-01",
      isBefore: "2055-01-01",
    },
  },
  themeColor: {
    type: DataTypes.STRING(12),
    defaultValue: "light",
    validate: {
      isAlpha: true,
      notEmpty: true,
      isLowercase: true,
      isIn: [colorsArr],
    },
  },
});

await WebShopCustomer.sync({ force: true });

function getRandElFromArr(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomCustomer() {
  const nameArr = [
    "Ola",
    "Kasia",
    "Zuzia",
    "Ania",
    "Basia",
    "Karolina",
    "Agata",
    "Daria",
    "Andrzej",
  ];
  const surnameArr = [
    "Kowalska",
    "Adamska",
    "Barska",
    "Karolińska",
    "Zubrzycka",
    "Mielniczuk",
  ];
  const randNum = Math.floor(Math.random() * 100000);
  const name = getRandElFromArr(nameArr);
  const surname = getRandElFromArr(surnameArr);
  const email = name.toLowerCase() + "." + surname + randNum + "@gmail.com";
  return {
    name: name,
    surname: surname,
    email: email,
    shopPoints: Math.floor(Math.random() * 1000),
    age: 18 + Math.floor(Math.random() * 50),
    registerDate: new Date(
      new Date().getTime() -
        Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365 * 5)
    ),
    themeColor: getRandElFromArr(colorsArr),
  };
}

try {
  const customer = getRandomCustomer();
  await WebShopCustomer.create(customer);
  const customerArr = [];
  for (let i = 0; i < 30; i++) {
    customerArr.push(getRandomCustomer());
  }

  const customerDb = await WebShopCustomer.bulkCreate(customerArr, {
    validate: true,
  });

  for (const c of customerDb) {
    console.log(c.dataValues);
  }
} catch (error) {
  console.log(error);
}

await sequelize.close();
