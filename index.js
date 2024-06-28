const express = require("express");
const fs = require("fs");
const app = express();
const body_parser = require("body-parser");
app.use(body_parser.json());

app.get("/users/", (req, res) => {
  const users = fs.readFileSync("./users.json");
  res.send(JSON.parse(users));
});
//////////////////////////////////////////////////////////Get
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;

  try {
    const users = fs.readFileSync("./users.json");
    const jsonUsers = JSON.parse(users);
    const user = jsonUsers.find((elem) => elem.id == userId);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong...");
  }
});
////////////////////////////////////////////////////Post1
app.post("/users", (req, res) => {
  let singli_user_data = {
    id: req.body.id,
    name: req.body.name,
    age: req.body.age,
    gmail: req.body.gmail,
    passworrd: req.body.passworrd,
  };
  try {
    const user_data = fs.readFileSync("users.json");
    const users = JSON.parse(user_data);
    users.push(singli_user_data);
    fs.writeFileSync("users.json", JSON.stringify(users));
    res.status(201).send(singli_user_data);
  } catch {
    console.error(err);
    res.status(500).send("Something went wrong...");
  }

});

///////////////////////////////////////////////////////Post profile
app.post("/users/:id/profile", (req, res) => {
  let singli_user_data = {
    id: req.params.id,
    img: req.body.img,
    bio: req.body.bio
  };
  try {
    const profile_data = fs.readFileSync("profil.json");
    const users = JSON.parse(profile_data);
    users.push(singli_user_data);
    fs.writeFileSync("profil.json", JSON.stringify(users));
    res.status(201).send(singli_user_data);
  } catch {
    res.status(500).send("Something went wrong...");
  }

});
////////////////////////////////////////////get profile
app.get("/users/:id/profile", (req, res) => {
  const userId = req.params.id;

  try {
    const users = fs.readFileSync("profil.json");
    const jsonUsers = JSON.parse(users);
    const user = jsonUsers.find((elem) => elem.id == userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch {
    res.status(500).send("Something went wrong...");
  }

});
//////////////////////////////////////////////////Put
app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const updatedUserData = req.body;

  try {
    const user_data = fs.readFileSync("users.json");
    let users = JSON.parse(user_data);

    const userIndex = users.findIndex((elem) => elem.id == userId);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updatedUserData };
      fs.writeFileSync("users.json", JSON.stringify(users));
      res.status(200).send(users[userIndex]);
    } else {
      res.status(404).send("User not found");
    }
  } catch {
    console.error(33333)
  }

});
////////////////////////////////////////////////////////////////Delete
app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  try {
    const user_data = fs.readFileSync("users.json")
    const normUsers = JSON.parse(user_data)
    const userIndex = normUsers.findIndex((elem) => elem.id == userId);
    if (userIndex !== -1) {
      normUsers.splice(userIndex, 1)
      fs.writeFileSync("users.json", JSON.stringify(normUsers));
      res.status(200).send(`hajoxutyamb jnjecir ${userId} - errordy`,);
    } else {
      res.status(404).send("User not found");
    }
  } catch {
    console.error(33333)
  }
});
/////////////////////////////////////delete profile
app.delete("/users/:id/profile", (req, res) => {
  const userId = req.params.id;
  try {
    const user_data = fs.readFileSync("profil.json")
    const normUsers = JSON.parse(user_data)
    const userIndex = normUsers.findIndex((elem) => elem.id == userId);
    if (userIndex !== -1) {
      normUsers.splice(userIndex, 1)
      fs.writeFileSync("profil.json", JSON.stringify(normUsers));
      res.status(200).send(`hajoxutyamb jnjecir ${userId} - errordy`,);
    } else {
      res.status(404).send("User not found");
    }
  } catch {
    console.error(33333)
  }
});


const PORT = 3006;
app.listen(PORT);


