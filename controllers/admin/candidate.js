const Candidate = require('../../models').Candidate
const Poll = require('../../models').Poll

module.exports.CreateCandidate = async (req, res, next) => {
    const candidate = await Candidate.create(req.body);
    
    if (candidate){
        const candidates = await Candidate.findAll();
        const poll = await Poll.findOne({
            where:{
                id:req.body.pollId
            }
        })
        res.render('updatePoll',{poll,candidates})
    }
}