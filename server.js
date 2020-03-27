const express = require('express')
const server = express()

const db = require('./db')

server.use(express.static("public"))

server.use(express.urlencoded({ extended: true }))

const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true,
})

// const ideas = [
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
//         title: "Cursos de Programação",
//         category: "Estudo",
//         description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam, placeat. Beatae numqua",
//         url: "https://rocketseat.com.br"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
//         title: "Exercicios",
//         category: "Saúde",
//         description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam, placeat. Beatae numqua",
//         url: "https://rocketseat.com.br"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
//         title: "Meditação",
//         category: "Mentalidade",
//         description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam, placeat. Beatae numqua",
//         url: "https://rocketseat.com.br"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
//         title: "Karaokê",
//         category: "Musica",
//         description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam, placeat. Beatae numqua",
//         url: "https://rocketseat.com.br"
//     },
// ]

server.get('/', function (req, res) {

    //consultar dados na tabela
    db.all(`select * from ideas`, function (err, rows) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        const reversedIdeas = [...rows].reverse()
        let lastIdeas = []
        for (let idea of reversedIdeas) {
            if (lastIdeas.length < 2) {
                lastIdeas.push(idea)
            }
        }

        return res.render("index.html", { ideas: lastIdeas })
    })


})


server.get('/ideias', function (req, res) {
    db.all(`select * from ideas`, function (err, rows) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        const reversedIdeas = [...rows].reverse()

        return res.render("ideias.html", { ideas: reversedIdeas })

    })


})

server.post('/', function (req, res) {
    // inserir dado na tabela
    const query = `
     insert into ideas(
         image,
         title,
         category,
         description,
         link
     ) values (?,?,?,?,?); 
     `
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ]

    db.run(query, values, function (err) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }
        return res.redirect("/ideias")
    })

})

server.listen(3000)