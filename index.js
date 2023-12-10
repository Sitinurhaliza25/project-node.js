import cookieParser from "cookie-parser";
import express from "express";
import jwt from "jsonwebtoken";
import multer from "multer";
import { admin } from "./router/admin.js";
import {
  addbarang,
  deletebarangById,
  editbarangById,
  getAllbarang,
  getbarangbyid,
} from "./router/barang.js";
import { addUser, getdata, login } from "./router/regist.js";
const app = express();
app.use(cookieParser());
app.use(express.json());
const upload = multer({ dest: "public/image" });
app.use((req, res, next) => {
  if (req.path.startsWith("/api/login") || req.path.startsWith("/Asset")||req.path.startsWith("/api/register")) {
    next();
  } else {
    let authorized = false;
    if (req.cookies.token) {
      try {
        req.me = jwt.verify(req.cookies.token, "liza");
        authorized = true;
      } catch (error) {
        res.clearCookie("token");
      }
    }
    if (authorized) {
      if (req.path.startsWith("/login")) {
        res.redirect("/home");
      } else {
        next();
      }
    } else {
      if (req.path.startsWith("/login") || req.path.startsWith("/register")) {
        next();
      } else {
        if (req.path.startsWith("/api")) {
          res.status(401);
          res.send("anda harus login dulu.");
        } else {
          res.redirect("/login");
        }
      }
    }
  }
});
app.use(express.static("public"));
app.post("/api/register", addUser);
app.post("/api/login", login);
app.post("/api/admin", admin);

app.get("/api/data",getdata)
app.get("/api/barang", getAllbarang);
app.get("/api/barang/:id", getbarangbyid);
app.post("/api/barang", upload.single("image"), addbarang);
app.put("/api/barang/:id", upload.single("image"), editbarangById);
app.delete("/api/barang/:id", deletebarangById);
app.get("/api/logout", (req, res) => {
  res.clearCookie("token");
  res.send("logout berhasil !!!");
})

app.listen(3000, () => {
  console.log("The server starts on port 3000.");
});
