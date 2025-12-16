const express = require("express");
const fs = require("node:fs/promises");
const path = require("node:path");

const app = express();
const port = 3000;

app.use(express.json());

const usersFile = path.resolve("./usersFile.json");

app.post("/user", async (req, res, next) => {
  try {
    const data = await fs.readFile(usersFile, "utf-8");
    const users = JSON.parse(data || "[]");

    const newUser = {
      id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
      ...req.body,
    };

    users.push(newUser);
    await fs.writeFile(usersFile, JSON.stringify(users, null, 2));
    res.status(201).json({ message: "User Added Successfully." });
  } catch (err) {
    res.status(500).json({ message: "Error saving user" });
  }
});

app.patch("/user/:id", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    const updates = req.body;

    const data = await fs.readFile(usersFile, "utf-8");
    let users = JSON.parse(data || "[]");

    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({ message: "User ID not found!" });
    }

    users[userIndex] = { ...users[userIndex], ...updates };

    await fs.writeFile(usersFile, JSON.stringify(users, null, 2));

    const fields = Object.keys(updates).join(", ");
    res.json({ message: `User (${fields}) Updated Successfully` });
  } catch (err) {
    res.status(500).json({ message: "Error updating user" });
  }
});

app.delete("/user{/:id}", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);

    const data = await fs.readFile(usersFile, { encoding: "utf-8" });
    let users = JSON.parse(data || "[]");

    const userExists = users.some((u) => u.id === userId);

    if (!userExists) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const newUsersList = users.filter((u) => u.id !== userId);

    await fs.writeFile(usersFile, JSON.stringify(newUsersList, null, 2));

    res.json({ message: `User with ID: ${userId} deleted successfully` });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user" });
  }
});

app.get("/user/getByName", async (req, res, next) => {
  try {
    const searchName = req.query.name;

    if (!searchName) {
      return res
        .status(400)
        .json({ message: "Please provide a name to search for." });
    }

    const data = await fs.readFile(usersFile, { encoding: "utf-8" });
    const users = JSON.parse(data || "[]");

    const filteredUsers = users.filter((u) =>
      u.name.toLowerCase().includes(searchName.toLowerCase())
    );

    if (filteredUsers.length === 0) {
      return res.status(404).json({ message: "User Name Not Found." });
    }

    res.json(filteredUsers);
  } catch (err) {
    res.status(500).json({ message: "Error searching for user" });
  }
});

app.get("/user", async (req, res, next) => {
  try {
    const data = await fs.readFile(usersFile, { encoding: "utf-8" });

    const users = JSON.parse(data || "[]");

    res.json({
      count: users.length,
      users: users,
    });
  } catch (err) {
    res.status(500).json({ message: "Error Fetching Users" });
  }
});

app.get("/user/filter", async (req, res, next) => {
  try {
    const minAge = parseInt(req.query.minAge);

    if (isNaN(minAge)) {
      return res
        .status(400)
        .json({ message: "Please Provide A Valid Number For Minimum Age." });
    }

    const data = await fs.readFile(usersFile, { encoding: "utf-8" });
    const users = JSON.parse(data || "[]");

    const filteredUsers = users.filter((u) => u.age >= minAge);

    res.json({
      requestedMinAge: minAge,
      count: filteredUsers.length,
      users: filteredUsers,
    });
  } catch (err) {
    res.status(500).json({ message: "Error Filtering Users." });
  }
});

app.get("/user/:id", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);

    const data = await fs.readFile(usersFile, { encoding: "utf-8" });
    const users = JSON.parse(data || "[]");

    const user = users.find((u) => u.id === userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user" });
  }
});

app.listen(port, () => console.log(`Server Run On Port >>> ${port} ✔`));
