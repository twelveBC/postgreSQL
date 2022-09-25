const { UserGames, UserGameBiodata } = require('./models')

let dataBiodata = {
    fullname:'a',
    age:'1',
    address:'a',
    gender:'a',
    phone:'123',
    UserGameId : '1'
}
let ajur = {
    username:'a',
    password:'a',
    role:'a'
}


UserGames.create(ajur)
UserGameBiodata.create(dataBiodata)