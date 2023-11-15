import conn from "../database.js";

export async function addUser(req, res) {
    const rows = await conn.query(
        `INSERT INTO users VALUES(NULL, '${req.body.username}', '${req.body.password}')`
    );
    res.send("pengguna telah ditambahkan.");

}