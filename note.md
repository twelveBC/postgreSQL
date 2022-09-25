sequelize model:generate --name UserGames --attributes username:string,password:string,role:string
sequelize model:generate --name UserGameBiodata --attributes fullname:string,age:integer
sequelize model:generate --name UserGameHistories --attributes user:string,com:string,result:string