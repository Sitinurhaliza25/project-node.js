import conn from "../database.js";

export async function getAllbarang(_req, res) {
    const rows = await conn.query("SELECT * FROM barang");
    res.send(rows);
  }

  export async function getbarangbyid(req, res) {
    const rows = await conn.query(
      `SELECT * FROM barang WHERE id= '${req.params.id}'`
    );
    res.send(rows[0]);
  }
 
  export async function addbarang(req, res) {
    await conn.query(
      `INSERT INTO barang VALUES (NULL, '${req.body.nama_barang}','${req.body.harga}','${req.body.kode}','${req.body.stok}','${req.file.filename}')`
    );
    res.send("barang telah ditambahkan.");
  }

  
  export async function editbarangById(req, res) {
    console.log(req.params.id);
    await conn.query(
      `UPDATE barang SET nama_barang ='${req.body.nama_barang}', harga = '${req.body.harga}' ,stok = '${req.body.stok}',image='${req.image}' WHERE id = '${req.params.id}'`
    );
    res.send("barang telah diedit.");
  }
  
  export async function deletebarangById(req, res) {
    await conn.query(`DELETE FROM barang WHERE id = '${req.params.id}'`);
    res.send("barang telah dihapus.");
  }
  

  export async function getdata(req,res){
    const result = await conn.query(
       `SELECT * FROM users`
    )
    res.send(result);
 }