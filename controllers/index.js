const Poll = require('../models').Poll
const Candidate = require('../models').Candidate



module.exports.GetIndex = async (req, res, next) => {
    let votingPolls = await Poll.findAll()
    if (votingPolls != null){
        res.render('index', {votingPolls})
    }
}

module.exports.GetSinglePoll = async (req, res, next) => {
    let candidates = await Candidate.findAll({
        where: {
            pollId: req.params.id
        }
    })
    res.render('singlepoll',{candidates})
}