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
                    username: users.username,
                    id: users.id
                }
                return res.redirect('/dashboard');
            }
            res.redirect("/login")
        } catch (error) {
            res.redirect("/login")
        }
    },
    actionLogout: async (req,res) =>{
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
            if (req.session.user == undefined || req.session.user == null){
                return res.redirect('/login')
            }
            res.render("dashboard",{ user: req.session.user })        
        } catch (error) {
            res.send("semangat bang")
        }
    },
    viewGameGBK: async (req,res) =>{
        try {
            if (req.session.user == undefined || req.session.user == null){
                return res.redirect('/login')
            }
            res.render("game",{ user: req.session.user })
        } catch (error) {
            
        }
    },

    viewBiodata: async (req,res) =>{
        try {
            if (req.session.user == undefined || req.session.user == null){
                return res.redirect('/login')
            }
            let user = req.session.user
            const users = await UserGames.findOne({where:{username:user.username}})
            const bio = await UserGameBiodata.findOne({where:{UserGameId:users.id}})
            res.render("biodata",{
                name:bio.fullname,
                age:bio.age,
                user:user.username
            }) 
        } catch (error) {
            
        }
    },
    viewActionBiodata: async (req,res) =>{
        try {
            if (req.session.user == undefined || req.session.user == null){
                return res.redirect('/login')
            }       
            res.render("updateBiodata")
        } catch (error) {
            res.send('gagal')
        }
    },ActionBiodata: async (req,res) =>{
        try {
            const { fullname,age } = req.body
            const id = req.session.user
            const users = await UserGameBiodata.findOne({where:{ UserGameId:id}})
            console.log(users);
            console.log(request);
            res.redirect("/dashboard")
        } catch (error) {
            res.send('gagal')
        }
    },

    viewHistory: async (req,res) =>{
        try {
            if (req.session.user == undefined || req.session.user == null){
                return res.redirect('/login')
            }
            let user = req.session.user
            console.log(user.id)
            res.render("histori")
        } catch (error) {
            
        }
    },

    deleteAccount: async (req,res) =>{
        try {
            res.send("delete account success")
        } catch (error) {
            res.send("gagal")
        }
    },
}
