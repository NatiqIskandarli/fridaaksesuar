const UserModel = require("../models/userModel")
require("dotenv").config()
const checkOutSponsorLimit = async (req, res, next)=>{
    const { sponsorId } = req.body.fullData;
  
    if (!sponsorId) {
      return res.json({message : 'Sponsor ID is required'})
      //return res.status(400).send('Sponsor ID is required');
    }
  
    const sponsor = await UserModel.findByPk(sponsorId, {
      include: {
        model: UserModel,
        as: 'Downlines'
      }
    });

    
    
    if (!sponsor) {
      return res.json({message : 'Sponsor not found'})
      //return res.status(404).send('Sponsor not found');
    }
  
    if (sponsor.Downlines.length >= process.env.NETWORK_ALT_QRUP_MAX_SAY) {
      return res.json({message : 'This sponsor already has 3 users under them'})
      //return res.status(400).json({message : 'This sponsor already has 3 users under them'});
    }
  
    next();
  }

  module.exports = checkOutSponsorLimit
  