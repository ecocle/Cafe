const express = require("express");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");

const app = express();
const port = 8080;

const dbConfig = {
  host: "192.168.3.15",
  user: "root",
  password: "Shawn090209",
  database: "Coffee_Orders",
  charset: "utf8",
};

const conn = mysql.createConnection(dbConfig);

conn.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

app.use(express.json());
app.use(express.static("../dist"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

app.get("/", (req, res) => {
  res.sendFile("index.html", {root: "../dist"});
});
/**
 * Handles the request for coffee-related data.
 * @param {string} sql - The SQL query for retrieving data.
 * @param {object} res - The response object.
 */
function handleCoffeeRequest(sql, res) {
  conn.query(sql, (err, result) => {
    if (err) throw err;
    res.json({data: result});
  });
}

app.get("/api/dataCoffee", (req, res) => {
  const sql = "SELECT * FROM Coffee";
  handleCoffeeRequest(sql, res);
});

app.get("/api/dataCaffeineFree", (req, res) => {
  const sql = "SELECT * FROM Caffeine_free";
  handleCoffeeRequest(sql, res);
});

app.get("/api/dataBreakfast", (req, res) => {
  const sql = "SELECT * FROM Breakfast";
  handleCoffeeRequest(sql, res);
});

app.post("/api/orders", (req, res) => {
  const data = req.body;

  const selectedToppings = data.selectedToppings ?
    data.selectedToppings.join(",") : "";
  const charles = `${data.name}, ${data.selectedSize}, ${selectedToppings}, 
  ${data.price}`;

  const values = [
    data.firstName,
    data.lastName,
    data.name,
    data.temperature,
    data.selectedSize,
    selectedToppings,
    data.price,
    data.comments,
    data.useCup,
    charles,
  ];

  const sql = `
      INSERT INTO Orders (First_name,
                          Last_name,
                          Coffee_type,
                          Temperature,
                          Size,
                          Toppings,
                          Price,
                          Order_time,
                          Comments,
                          Cup,
                          CHARLES)
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?, ?)
  `;

  conn.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error placing order:", err);
      return res.status(500).json({error: "Error placing order"});
    }

    const username = req.cookies.access_token;
    if (username) {
      const updateSql = "UPDATE Accounts SET Balance = ? WHERE User_name = ?";
      const updateValues = [data.balance, username];
      conn.query(updateSql, updateValues, (err, result) => {
        if (err) console.error("Error updating balance:", err);
      });
    }

    res.json({message: "Order placed successfully", responseData: result});
  });
});

app.get("/api/addMoneyToAcc", (req, res) => {
  const data = req.body;

  const amount = data.amount;

  const username = req.cookies.access_token;
  if (username) {
    const updateSql = "UPDATE Accounts SET Balance = Balance + ? " +
      "WHERE User_name = ?";
    const updateValues = [amount, username];
    conn.query(updateSql, updateValues, (err, result) => {
      if (err) {
        console.error("Error adding money to account:", err);
        return res.status(500).json({error: "Error adding money to account"});
      }
      res.json({message: "Amount added to account"});
    });
  } else {
    res.status(401).json({error: "User not logged in"});
  }
});

app.post("/api/login", (req, res) => {
  const data = req.body;

  const username = data.username;
  const password = data.password;

  const sql = "SELECT * FROM Accounts WHERE User_name=? AND Password=?";
  conn.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error("Error logging in:", err);
      return res.status(500).json({error: "Error logging in"});
    }
    const user = result[0];
    if (user) {
      const token = jwt.sign({username: username}, "SECRET_KEY",
          {expiresIn: "30d"});
      const response = {
        message: "Login successful",
        username: username,
        token: token,
      };
      res.cookie("access_token", token, {maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true});
      res.json(response);
    } else {
      res.status(401).json({error: "Invalid username or password"});
    }
  });
});

app.post("/api/register", (req, res) => {
  const data = req.body;

  const username = data.username;
  const password = data.password;

  const sql = "SELECT * FROM Accounts WHERE User_name=?";
  conn.query(sql, [username], (err, result) => {
    if (err) {
      console.error("Error registering user:", err);
      return res.status(500).json({error: "Error registering user"});
    }
    if (result.length > 0) {
      return res.status(400).json({error: "Username already exists"});
    } else {
      const insertSql = "INSERT INTO Accounts (User_name, Password) " +
        "VALUES (?, ?)";
      conn.query(insertSql, [username, password], (err, result) => {
        if (err) {
          console.error("Error creating account:", err);
          return res.status(500).json({error: "Error creating account"});
        }
        res.json({message: "Account created successfully"});
      });
    }
  });
});

app.get("/api/userData", (req, res) => {
  const username = req.cookies.access_token;
  if (username) {
    const sql = "SELECT User_name, Balance FROM Accounts WHERE User_name=?";
    conn.query(sql, [username], (err, result) => {
      if (err) {
        console.error("Error getting user data:", err);
        return res.status(500).json({error: "Error getting user data"});
      }
      const userData = result[0];
      if (userData) {
        res.json({username: userData.User_name, balance: userData.Balance});
      } else {
        res.status(404).json({error: "User data not found"});
      }
    });
  } else {
    res.status(401).json({error: "User not logged in"});
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
