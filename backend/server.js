const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const Schema = mongoose.Schema;
const app = express();

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 
  }

app.use(cors());
app.use(express.json());

const clientSchema = new Schema({
    account_number: Number,
    surname: String,
    name: String,
    patronymic: String,
    date_of_birth: String,
    INN: String,
    FIO_employee: String,
    status: String
  }, {versionKey: false});

const Client = mongoose.model("Client", clientSchema);

const userSchema = new Schema({
    FIO: String,
    login: String,
    password: String
  }, {versionKey: false});

const User = mongoose.model("User", userSchema);

(async () => {
    
  try {
      await mongoose.connect("mongodb://127.0.0.1:27017/peopledb");
      app.listen(3001);
      console.log('Connection');

  } catch(err) {
      return console.log(err);
  }
})();

app.post("/api/users/login", async(req, res) => {

  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).json({ error: 'Необходимо заполнить все поля' });
  };

  const user = await User.findOne({ login, password });

  if (!user) {
    return res.status(404).json({ error: 'Пользователь не найден' });
  };

  const FIO = user.FIO;

  const clients = await Client.find({ FIO_employee: FIO });

  res.status(200).send(clients);
});

app.post("/api/clients/:account_number/updateStatus", async (req, res) => {
  
  const { status } = req.body;
  const account_number = req.params["account_number"];

  try {
    const client = await Client.findOne({ account_number });

    if (!client) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    client.status = status;

    await client.save();

    res.status(200).send(client);
  } catch (error) {
    console.error('Ошибка при обновлении статуса клиента:', error);
    res.status(500).json({ error: 'Ошибка при обновлении статуса клиента' });
  }
});

process.on("SIGINT", async() => {
  await mongoose.disconnect();
  console.log('No connection');
  process.exit();    
});