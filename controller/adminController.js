const { UserGames, UserGameBiodata, UserGamesHistories } = require("../models")

module.exports = {
    viewLogin: async (req,res) =>{
        try {
            if (req.session.user == null || req.session.user == undefined){
               return res.render("login",{user:false})
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
                return res.render("login",{user:true})
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
            const { username, password, role, fullname, age } = req.body
            const users = await UserGames.findOne({ where: { username:username} } )
            let dataUser = { username, password, role }
            if (users){
                return res.send('username sudah terdaftar')
            }
            UserGames.create(dataUser)
            res.redirect(`/isibiodata/${username}/${fullname}/${age}`)
        } catch (error) {
            res.redirect("/register")
        }
    },
    viewIsiBiodata: async (req,res) =>{
        try {
            const username = req.params.username
            const users = await UserGames.findOne({ where: { username:username} } )
            res.render("registerBiodata")
        } catch (error) {
            res.send("page tidak di temukan")
        }
    },
    actionIsiBiodata: async (req,res) =>{
        const username = req.params.username
        const fullname = req.params.fullname
        const age = req.params.age
        const users = await UserGames.findOne({ where: { username:username} } )
        const UserGameId = users.id
        const {address, gender, phone} = req.body
        try {
            let dataBiodata = {
                fullname,
                age,
                address,
                gender,
                phone,
                UserGameId
            }
            UserGameBiodata.create(dataBiodata)
            res.render("registerBiodata")
        } catch (error) {
            res.send("biodata tidak dapat di input")
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
            if (req.session.user != null || req.session.user != undefined){
                return res.render("game",{
                    user: req.session.user
                })
            } else {
                return  res.redirect('/login')
            }   
        } catch (error) {
            
        }
    },

    viewHistory: async (req,res) =>{
        try {
            res.render("histori")
        } catch (error) {
            
        }
    },

    viewBiodata: async (req,res) =>{
        try {
            let user = req.session.user
            const users = await UserGames.findOne({where:{username:user.username}})
            const bio = await UserGameBiodata.findOne({where:{UserGameId:users.id}})
            let { name, age } = req.body
            res.render("biodata",{
                name:bio.fullname,
                age:bio.age,
                user:user.username
            }) 
        } catch (error) {
            
        }
    },
    actionBiodata: async (req,res) =>{
        try {
            console.log(req.body);
            res.redirect("/biodata")
        } catch (error) {
            
        }
    },
}
