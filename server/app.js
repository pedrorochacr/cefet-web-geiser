// importação de dependência(s)
const express = require('express')
const app = express()
const path = require('path')

// variáveis globais deste módulo
const PORT = 3000
const db = {}


// carregar "banco de dados" (data/jogadores.json e data/jogosPorJogador.json)
// você pode colocar o conteúdo dos arquivos json no objeto "db" logo abaixo
// dica: 1-4 linhas de código (você deve usar o módulo de filesystem (fs))




// configurar qual templating engine usar. Sugestão: hbs (handlebars)
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'))
// dica: 2 linhas


// EXERCÍCIO 2
// definir rota para página inicial --> renderizar a view index, usando os
// dados do banco de dados "data/jogadores.json" com a lista de jogadores
// dica: o handler desta função é bem simples - basta passar para o template
//       os dados do arquivo data/jogadores.json (~3 linhas)



// EXERCÍCIO 3
// definir rota para página de detalhes de um jogador --> renderizar a view
// jogador, usando os dados do banco de dados "data/jogadores.json" e
// "data/jogosPorJogador.json", assim como alguns campos calculados
// dica: o handler desta função pode chegar a ter ~15 linhas de código


// EXERCÍCIO 1
// configurar para servir os arquivos estáticos da pasta "client"
app.use(express.static(path.join(__dirname, '..', 'client')))

// abrir servidor na porta 3000 (constante PORT)
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))
