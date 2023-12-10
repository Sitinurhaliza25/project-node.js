import conn from "../database.js";
import jwt from "jsonwebtoken";

export async function addUser(req, res) {
   try {
      await conn.query(
         `INSERT INTO users VALUES (NULL,'${req.body.username}','${req.body.password}')`
       );
       res.send("Pengguna telah ditambahkan.");
   } catch (error) {
      console.error(error);
   }
}

export async function login(req,res){
   const result = await conn.query(
      `SELECT *FROM users where username = '${req.body.username}'&& password = '${req.body.password}'`
   )
   if(result.length>0){
      const token = jwt.sign({result},"liza");//proccess.env.(nama bebas(secret key))
      res.cookie("token",token);
      res.send({token});
   }else{
      res.send("login gagal.");
   }
}

export async function getdata(req,res){
   const result = await conn.query(
      `SELECT * FROM users`
   )
   res.send(result);
}
