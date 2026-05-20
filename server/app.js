// importação de dependência(s)
const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')

// variáveis globais deste módulo
const PORT = 3000
const db = {}


// configurar qual templating engine usar. Sugestão: hbs (handlebars)
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'))
// dica: 2 linhas


// EXERCÍCIO 2
// definir rota para página inicial --> renderizar a view index, usando os
// dados do banco de dados "data/jogadores.json" com a lista de jogadores
app.get('/', (req, res) => {
  res.render('index', { jogadores: db.jogadores.players })
})


// EXERCÍCIO 3
// definir rota para página de detalhes de um jogador --> renderizar a view
// jogador, usando os dados do banco de dados "data/jogadores.json" e
// "data/jogosPorJogador.json", assim como alguns campos calculados
app.get('/jogador/:id/', function(req, res) {
  const id = req.params.id

  // acha o jogador pelo steamid
  let jogador = null
  for (let i = 0; i < db.jogadores.players.length; i++) {
    if (db.jogadores.players[i].steamid === id) {
      jogador = db.jogadores.players[i]
      break
    }
  }

  const jogosData = db.jogosPorJogador[id]

  if (!jogador || !jogosData) {
    res.status(404).send('Jogador não encontrado')
    return
  }

  // ordena os jogos do mais jogado para o menos jogado
  const jogos = jogosData.games.slice()
  jogos.sort(function(a, b) {
    return b.playtime_forever - a.playtime_forever
  })

  // conta jogos nunca jogados
  let naoJogados = 0
  for (let i = 0; i < jogosData.games.length; i++) {
    if (jogosData.games[i].playtime_forever === 0) {
      naoJogados++
    }
  }

  // monta o objeto do jogo favorito
  const jogoFavorito = jogos[0]
  const favorito = {
    nome: jogoFavorito.name,
    horasJogadas: Math.round(jogoFavorito.playtime_forever / 60),
    imgUrl: 'http://media.steampowered.com/steamcommunity/public/images/apps/' + jogoFavorito.appid + '/' + jogoFavorito.img_logo_url + '.jpg',
    statsUrl: 'http://steamcommunity.com/profiles/' + id + '/stats/' + jogoFavorito.appid
  }

  
  const top5 = []
  for (let i = 0; i < 5; i++) {
    const jogo = jogos[i]
    top5.push({
      nome: jogo.name,
      horasJogadas: Math.round(jogo.playtime_forever / 60),
      imgUrl: 'http://media.steampowered.com/steamcommunity/public/images/apps/' + jogo.appid + '/' + jogo.img_logo_url + '.jpg'
    })
  }

  res.render('jogador', {
    jogador: jogador,
    quantidadeJogos: jogosData.game_count,
    naoJogados: naoJogados,
    favorito: favorito,
    top5: top5
  })
})


// EXERCÍCIO 1
// configurar para servir os arquivos estáticos da pasta "client"
app.use(express.static(path.join(__dirname, '..', 'client')))

// carregar "banco de dados" (data/jogadores.json e data/jogosPorJogador.json)
db.jogadores = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'jogadores.json')))
db.jogosPorJogador = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'jogosPorJogador.json')))

// abrir servidor na porta 3000 (constante PORT)
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))
