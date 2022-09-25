sequelize model:generate --name UserGame --attributes username:string,password:string,role:string

sequelize model:generate --name UserGameBiodata --attributes fullname:string,age:integer,address:string,gender:string,phone:string

sequelize model:generate --name UserGameHistory --attributes user:string,com:string,result:string