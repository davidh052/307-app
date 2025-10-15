import express from "express";
import cors from "cors";
import user_services from "./user_services";


const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());


// update these to call on user services, which is mongodb/ the database
app.get("/", (req, res) => {
  res.send("Hello World!");
});


//done - this should handle get all users, get by name, get by job

app.get("/users", async (req, res) => {

    const {name,job} = req.query;
    try {
      const users = await user_services.getUsers(name,job);
      res.send({users_list: users});
    } catch (err) {
      res.status(500).send({erros: err.message});
    }

});


//done
app.get("/users/:id", async (req, res) => {
  try {
    const user = await user_services.findUserById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch(err) {
    res.status(500).send({erros: err.message});
  }
});

//done


app.post("/users", async (req, res) => {
  try {
    const newUser = await user_services.addUser(req.body);
    res.status(201).send(newUser);
  } catch(err) {
    res.status(400).send({erorr: err.message});
  }
});
  

//done

app.delete("/users/:id", async (req, res) => {

  try {
    const deleted = await user_services.deleteUserById(req.params.id);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).send("User not found");
    }
  } catch(err) {
    res.status(400).send({error:err.message});
  }

});
  
  


app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});