const { where } = require("sequelize")
const { UserGames, UserGameBiodata, UserGamesHistories } = require("../models")

module.exports = {
    viewLogin: async (req,res) =>{
        try {
            if (req.session.user == null || req.session.user == undefined){
               return res.render("login")
            } else {
              return  res.redirect('/dashboard')
            }
        } catch (error) {
            res.redirect('/login')
        }
    },
    actionLogin: async (req,res) =>{
        try {
            const { username, password } = req.body
            const users = await UserGames.findOne({ where: { username:username} } )
            if (!users) {
                return res.redirect("/login")
            } else if(users.password == password) {
                req.session.user = {
                    username: users.username
                }
                return res.redirect('/dashboard');
            }
            res.redirect("/login")
        } catch (error) {
            res.redirect("/login")
        }
    },actionLogout: async (req,res) =>{
        try {
            req.session.destroy()
            res.redirect("/login")
        } catch (error) {
            res.redirect("/dashboard")
        }
    },

    viewRegister: async (req,res) =>{
        try {
            res.render("register")
        } catch (error) {
            
        }
    },
    actionRegister: async (req,res) =>{
        try {
            // const { fullname, age, address, gender, phone, username, password, role } = req.body
            // console.log(req.body);
            // const users = await UserGames.findOne({ where: { username:username} } )
            // if (users){
            //    return res.send('username sudah terdaftar')
            // }
            // UserGames.create({
            //     username,
            //     password,
            //     role,
            // })
            UserGameBiodata.create({
                fullname: 'a',
                age: '1',
                address: 'a',
                gender: 'a',
                phone: 'a',
                UserGameId: '2'
            })
            res.send('user dapat dibuat')
        } catch (error) {
            res.redirect("/register")
        }
    },

    viewDashboard: async (req,res) =>{
        try {
            if (req.session.user != null || req.session.user != undefined){
                return res.render("dashboard",{
                    user: req.session.user
                })
             } else {
               return  res.redirect('/login')
             }       
        } catch (error) {
            res.send("semangat bang")
        }
    },
    viewGameGBK: async (req,res) =>{
        try {
            res.render("game")
        } catch (error) {
            
        }
    },
    viewBiodata: async (req,res) =>{
        try {
            res.render("biodata")
        } catch (error) {
            
        }
    },
    actionBiodata: async (req,res) =>{
        try {
            res.render("biodata")
        } catch (error) {
            
        }
    },

    viewHistory: async (req,res) =>{
        try {
            res.render("histori")
        } catch (error) {
            
        }
    },
}
