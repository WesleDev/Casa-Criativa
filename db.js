const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./ws.db')

db.serialize(function () {
    // criar tabela
    db.run(`
        create table if not exists ideas(
            id integer primary key autoincrement,
            image text,
            title text,
            category text,
            description text,
            link text
        );
    `)

    // inserir dado na tabela
//     const query = `
//     insert into ideas(
//         image,
//         title,
//         category,
//         description,
//         link
//     ) values (?,?,?,?,?); 
//     `
//     const values = [
//         "https://image.flaticon.com/icons/svg/2729/2729007.svg",
//         "Cursos de Programação",
//         "Estudo",
//         "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam, placeat. Beatae numqua",
//         "https://rocketseat.com.br"
//    ]

//     db.run(query, values, function(err) {
//         if(err) return console.log(err)

//         console.log(this)
//     })

    //  //delete um dado da tabela
    //  db.run(`delete from ideas where id = ?`, [3], function(err) {
    //     if(err) return console.log(err)

    //     console.log("DELETEI", this)
    // })

    // //consultar dados na tabela
    // db.all(`select * from ideas`, function(err, rows){
    //     if (err) return console.log(err)

    //     console.log(rows)
    // })

   
})

module.exports = db