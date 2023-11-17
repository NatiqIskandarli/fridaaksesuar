const sequelize = require("../config/config");
const fakeUserModel = require("../models/fakeUser");
const ProfileModel = require("../models/profileModel");
const ProfitModel = require("../models/profitModel");
const UserModel = require("../models/userModel");
const { getDovriyye } = require("./orderController");
const { getDownlineUserId } = require("./profitController");
require("dotenv").config()

class UserController {

    constructor(){
        this.getDownlineInfo = this.getDownlineInfo.bind(this),
        this.getUserDownline = this.getUserDownline.bind(this)
        this.getIndividualUserTurnover = this.getIndividualUserTurnover.bind(this)
    }

    async register(req,res){
        const {email,password,sponsorId} = req.body;
        try{        
        const checkEmail = await UserModel.findOne({where : {email}})
        if(checkEmail){
            return res.json({message : "This email already have"})
        }

        const createUser = await UserModel.create({email, password,sponsorId})
        return res.json({createUser})
      }catch{
        return res.json({message : "Sehv yarandi"})
      }
    }

    async addNetwork(req,res){
        const {email, sponsorId} = req.body
        try {            
            const checkEmail = await UserModel.findOne({where : {email}})
            if(checkEmail){
                return res.json({message : "This email already have"})
            }
            const addOne = await UserModel.create({email,sponsorId})
            return res.json({addOne})
        } catch (error) {
            return res.json(error.parent.detail)
        }
    }


    async inteqrasiya(req, res) {
      try {
          const findAll = await fakeUserModel.findAll();
          const usersToProcess = findAll.filter(user => user.fakeid);
  
          const arr = []
          const sponsorArr = []
          const userMap = new Map();
          findAll.forEach(user => {
            //console.log(user.fakeid, user.user, user.kiminqrupu)
            arr.push({
              fakeid : user.fakeid, 
              ad : user.ad, 
              soyad : user.soyad, 
              phone : user.telefon, 
              useradi : user.user, 
              password : user.vesiqeFin, 
              kiminqrupu : user.kiminqrupu})
            sponsorArr.push({
                fakeid : user.fakeid, 
                useradi : user.user,
              })
              //userMap.set(user.fakeid, user);
          });

          // console.log(arr)
          // console.log("**************")
          //console.log(sponsorArr)    
          
        //   function logArrayInChunks(array, chunkSize = 100) {
        //     for (let i = 0; i < array.length; i += chunkSize) {
        //         console.log(array.slice(i, i + chunkSize));
        //     }
        //    }
        
        // logArrayInChunks(sponsorArr, 100);
          // console.log("------")

          // Using a transaction for batch operations
          await sequelize.transaction(async (t) => {
              for (const user of arr) {

                // 1-ci bu addim

                  // await UserModel.create({
                  //     id: user.fakeid,
                  //     email:  user.useradi + "@email.com",
                  //     password:  user.password
                  //     // sponsorId : spon.fakeid
                  // }, { transaction: t });

                  // await ProfileModel.create({
                  //     firstName: user.ad,
                  //     lastName: user.soyad,
                  //     phone: user.phone,
                  //     adress: user.password,
                  //     userId: user.fakeid
                  // }, { transaction: t });

                for(const spon of sponsorArr){
                  if(user.kiminqrupu === spon.useradi){
                    // console.log({
                    //   id: user.fakeid,
                    //   email:  user.useradi + "@email.com",
                    //   password:  user.password,
                    //   sponsorId : spon.fakeid,
                    //   firstName: user.ad,
                    //   lastName: user.soyad,
                    //   phone: user.phone,
                    //   adress: user.password,
                    //   userId: user.fakeid
                    // })

                    //sonra 1i sondurub 2ci yandirmaq lazimdir

                    const updateValues = {                        
                        email:  user.useradi + "@email.com",
                        password:  user.password,
                        sponsorId : spon.fakeid
                     }

                    await UserModel.update(updateValues,{where : {id: user.fakeid}})

                  }
                }
                
                
              }
          });
  
          return res.json({message : "ok"});
      } catch (error) {
          console.error(error); // Log the error
          return res.status(500).json({ error: "An error occurred" });
      }
  }
  
  
  

    

    async getAll(req,res){
        const findAll = await UserModel.findAll()
        return await res.json({findAll})
    }

    async getOneUser(req,res){
        const {email} = req.body
        const findUser = await UserModel.findByPk(email)
        if(findUser){
            const sponsor = await findUser.getSponsor();
            return res.json({sponsor})
        }
    }

    async getMyPass(req,res){
      try {        
        const {id} = req.params
        const findUser = await UserModel.findByPk(id)
        if(findUser){
          return res.status(201).json(findUser)
        }

      } catch (error) {
          return res.status(500).json(error)
      }
      
    }

    async saveMyPass(req,res){
      const {userId, password} = req.body.fullData
      try {            
          const checkUser = await UserModel.findByPk(userId)
          if(checkUser){
              const updateValues = { password: password }
              await UserModel.update(updateValues,{where : {id: userId}})
            
              return res.status(201).json({message: "Parol Yenilendi"})
          }
          
          return res.status(201).json({message: "User tapilmadi"})
      } catch (error) {
        return res.status(500).json({message: "sehv yarandi"})
      }
    }

    async getMyAdress(req,res){
      try {        
        const {id} = req.params
        const findUser = await ProfileModel.findOne({where: {userId : id}})
        if(findUser){
          return res.status(201).json(findUser)
        }

      } catch (error) {
          return res.status(500).json(error)
      }
      
    }

    

    async saveAdress(req,res){
      const {userId, adress} = req.body.fullData
      try {            
          const checkUser = await ProfileModel.findOne({where : {userId}})
          if(checkUser){
              const updateValues = { adress: adress }
              await ProfileModel.update(updateValues,{where : {userId: userId}})
            
              return res.status(201).json({message: "Ünvan Yenilendi"})
          }
          
          return res.status(201).json({message: "User tapilmadi"})
      } catch (error) {
        return res.status(500).json({message: "sehv yarandi"})
      }
    }

    getIndividualUserTurnover = async (userId)=>{
      const { totalAmount,createdAt } = await getDovriyye(userId);
      return {totalAmount,createdAt};
  }

    getDownlineInfo = async (userId)=>{
        const user = await UserModel.findByPk(userId, {
          attributes: ['id', 'password', 'email','sponsorId'],
          include: {
            model: UserModel,
            as: 'Downlines',
            attributes: ['id', 'password', 'email','sponsorId'],
          }
        });
      
        if (!user || !user.Downlines) {
          return { count: 0, users: [], totalTurnover: 0 };
      }
      
        
        // let count = user.Downlines.length;
        // let users = user.Downlines.map(u => ({ 
        //   id: u.id, 
        //   password: u.password, 
        //   email: u.email,
        //   sponsorId: u.sponsorId 
        // }));

        let totalTurnover = 0;
        const users = await Promise.all(user.Downlines.map(async (downlineUser) => {
          const {earnedMoney, levelName} = await getDownlineUserId(downlineUser.id);
          const downlineResult = await this.getDownlineInfo(downlineUser.id);
          const {totalAmount, createdAt} = await this.getIndividualUserTurnover(downlineUser.id)
          const userTurnover = downlineResult.totalTurnover + totalAmount;

          totalTurnover += userTurnover;

          return {
              ...downlineUser.toJSON(),
              "qazanc" : earnedMoney,
              "vezifesi" :levelName,
              "OzDovriyyesi" : totalAmount,
              "Dovriyye tarixi" : createdAt,
              QrupToplamDovriyye: userTurnover
          };
        }));

        return { count: user.Downlines.length, users, totalTurnover };
      }

      getUserDownline = async (req, res, next)=>{
        const userId = req.params.userId;
      
        try {
          const { count, users, totalTurnover } = await this.getDownlineInfo(userId);

          const ozunuCek = await UserModel.findOne({where: {id: userId}})

          let {earnedMoney, levelName} = await getDownlineUserId(userId);
          let {totalAmount} = await getDovriyye(userId);

          let ozDovriyyesi = totalAmount
    
          let cem = 0

          if(users){            
            let altUserFaizHesabla = 0

            const UcMinArr = []
            //users alt qrupdakilardir
            users.forEach((user) => {
              let numericValue = Number(user.QrupToplamDovriyye);
              if(numericValue<7500){
                UcMinArr.push(numericValue)
              }
              
              cem +=numericValue;
              if (numericValue > 99 && numericValue < 300) {
                altUserFaizHesabla += numericValue * process.env.F_005;
              }else if (numericValue > 299 && numericValue < 900) {
                altUserFaizHesabla += numericValue * process.env.F_007;
              }else if (numericValue > 899 && numericValue < 1500) {
                altUserFaizHesabla += numericValue * process.env.F_009;
              }else if (numericValue > 1499 && numericValue < 3000) {
                altUserFaizHesabla += numericValue * process.env.F_012;
              }else if (numericValue > 2999 && numericValue < 5000) {
                altUserFaizHesabla += numericValue * process.env.F_015;
              }else if (numericValue > 4999 && numericValue < 7500) {
                altUserFaizHesabla += numericValue * process.env.F_018;
              }else if (numericValue >=7500) {
                altUserFaizHesabla += numericValue * process.env.F_020;
              }
            });
            
           
            totalAmount = cem+ozDovriyyesi;
            let digerQolAmount = UcMinArr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            

            if(totalAmount > 99 && totalAmount < 300){
              earnedMoney = parseFloat(totalAmount * process.env.F_005)

              levelName = "Lider"

            try{            
             const [instance, created] = await ProfitModel.findOrCreate({
                where : {userId},
                defaults: {
                  earnedMoney,
                  levelName
                }
              })

              if (created) {
                console.log('A new instance was created!');
                next()
              } else {
                console.log('An existing instance was found, updating...');
                await instance.update({
                  earnedMoney,
                  levelName
                });
              }

            }catch(err){
              return res.send("Level name can not be null")
            }


            }else if(totalAmount > 299 && totalAmount < 900){
              earnedMoney = parseFloat(totalAmount * process.env.F_007) - parseFloat(altUserFaizHesabla)

              levelName = "Lider"

            try{            
             const [instance, created] = await ProfitModel.findOrCreate({
                where : {userId},
                defaults: {
                  earnedMoney,
                  levelName
                }
              })

              if (created) {
                console.log('A new instance was created!');
                next()
              } else {
                console.log('An existing instance was found, updating...');
                await instance.update({
                  earnedMoney,
                  levelName
                });
              }

            }catch(err){
              return res.send("Level name can not be null")
            }


            }else if(totalAmount > 899 && totalAmount < 1500){
              earnedMoney = parseFloat(totalAmount * process.env.F_009) - parseFloat(altUserFaizHesabla)

              levelName = "Lider"

            try{            
             const [instance, created] = await ProfitModel.findOrCreate({
                where : {userId},
                defaults: {
                  earnedMoney,
                  levelName
                }
              })

              if (created) {
                console.log('A new instance was created!');
                next()
              } else {
                console.log('An existing instance was found, updating...');
                await instance.update({
                  earnedMoney,
                  levelName
                });
              }

            }catch(err){
              return res.send("Level name can not be null")
            }


            }else if(totalAmount > 1499 && totalAmount < 3000){
              earnedMoney = parseFloat(totalAmount * process.env.F_012) - parseFloat(altUserFaizHesabla)

              levelName = "Baş Lider"

            try{            
             const [instance, created] = await ProfitModel.findOrCreate({
                where : {userId},
                defaults: {
                  earnedMoney,
                  levelName
                }
              })

              if (created) {
                console.log('A new instance was created!');
                next()
              } else {
                console.log('An existing instance was found, updating...');
                await instance.update({
                  earnedMoney,
                  levelName
                });
              }

            }catch(err){
              return res.send("Level name can not be null")
            }


            }else if(totalAmount > 2999 && totalAmount < 5000){
              earnedMoney = parseFloat(totalAmount * process.env.F_015) - parseFloat(altUserFaizHesabla)

              levelName = "Baş Lider"

            try{            
             const [instance, created] = await ProfitModel.findOrCreate({
                where : {userId},
                defaults: {
                  earnedMoney,
                  levelName
                }
              })

              if (created) {
                console.log('A new instance was created!');
                next()
              } else {
                console.log('An existing instance was found, updating...');
                await instance.update({
                  earnedMoney,
                  levelName
                });
              }

            }catch(err){
              return res.send("Level name can not be null")
            }


            }else if(totalAmount > 4999 && totalAmount < 7500){
              earnedMoney = parseFloat(totalAmount * process.env.F_018) - parseFloat(altUserFaizHesabla)

              levelName = "Baş Lider"

            try{            
             const [instance, created] = await ProfitModel.findOrCreate({
                where : {userId},
                defaults: {
                  earnedMoney,
                  levelName
                }
              })

              if (created) {
                console.log('A new instance was created!');
                next()
              } else {
                console.log('An existing instance was found, updating...');
                await instance.update({
                  earnedMoney,
                  levelName
                });
              }

            }catch(err){
              return res.send("Level name can not be null")
            }


            }else if(totalAmount >= 7500){
              earnedMoney = parseFloat(totalAmount * process.env.F_020) - parseFloat(altUserFaizHesabla)

              levelName = "Direktor"

              

            try{          
              
              const direktorSayi = users.filter((item)=> item.vezifesi === "Direktor")
              if(direktorSayi.length == 2){
                earnedMoney = 600
              } else if(direktorSayi.length == 3){
                earnedMoney = 900
                levelName = "Baş direktor"
              } else if(direktorSayi.length == 1 && digerQolAmount>3000){
                earnedMoney = 300
                //direktor olmayanlarin doviryyesinin 20 faiz hesablasin
              }

              const basDirektorSayi = users.filter((item)=> item.vezifesi === "Baş direktor")
              if(basDirektorSayi.length == 3){
                earnedMoney = 2700
                levelName = "Qızıl direktor"
              }

              const qizilDirektorSayi = users.filter((item)=> item.vezifesi === "Qızıl direktor")
              if(qizilDirektorSayi.length == 3){
                earnedMoney = 6750
                levelName = "Zümrüd direktor"
              }

              const zumrudDirektorSayi = users.filter((item)=> item.vezifesi === "Zümrüd direktor")
              if(zumrudDirektorSayi.length == 3){
                earnedMoney = 14150
                levelName = "Brilliant direktor"
              }

             const [instance, created] = await ProfitModel.findOrCreate({
                where : {userId},
                defaults: {
                  earnedMoney,
                  levelName
                }
              })

              if (created) {
                console.log('A new instance was created!');
                next()
              } else {
                console.log('An existing instance was found, updating...');
                await instance.update({
                  earnedMoney,
                  levelName
                });
              }

            }catch(err){
              return res.send("Level name can not be null")
            }

            }

          }
                        
          
            

          let  SponsorunOzu = {
                  "id": ozunuCek.id,
                  "email" : ozunuCek.email,
                  "sponsorId": ozunuCek.sponsorId,
                  "qazanc" : (earnedMoney).toFixed(2),
                  "vezifesi" :levelName,
                  "OzDovriyyesi":ozDovriyyesi,
                  "QrupToplamDovriyye" : totalTurnover+ozDovriyyesi
            }
            

          res.json({ 
            sponsorunOzu : SponsorunOzu,
            downlineCount: count, 
            downlineUsers: users
          });
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      }
      
      



}

module.exports = new UserController;