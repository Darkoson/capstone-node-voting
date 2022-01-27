const Poll = require('../../models').Poll
const Candidate = require('../../models').Candidate


//creating a poll
module.exports.CreatePoll = async (req,res,next) =>{
    
    const poll = await Poll.create(req.body);

    if(poll){
        req.session.successPollMessage = "Poll Created Successfully";
        let polls = await Poll.findAll()
        res.render('adminDashboard',{polls})
    } else {
        req.session.errorPollMessage = "Poll Creation Was Not Successful"
        
    }
};


//editing or updating a poll
module.exports.UpdatePoll = async (req,res,next) =>{

    await Poll.update(req.body, {
        where: {
          id: req.params.id
        }
      }).then(async (poll) =>{
        let polls = await Poll.findAll()
        res.render('updatePoll',{polls})
      }).catch((error)=>{
          console.log(error)
          req.session.errorPollMessage = "Poll update Was Not Successful"
        res.redirect('/dasboard')
      })
      
};




//deleting a poll

module.exports.DeletePoll = async (req,res,next) =>{

await Poll.destroy({
    where: {
      id: req.params.id
    }
  }).then(async (poll) =>{
    let polls = await Poll.findAll()
    res.render('adminDashboard',{polls})
  }).catch((error)=>{
      console.log(error)
  }) 
};


//retrieving all the polls
module.exports.RetrievingPoll = async (req,res,next) =>{
    // const poll = await Poll.create(req.body);
    // const polls = await Poll.findAll();
    // if(poll){
    //     req.session.successPollMessage = "Poll Created Successfully";
    //     res.redirect('dashboard')
    // } else {
    //     req.session.errorPollMessage = "Poll Creation Was Not Successful"
    //     res.redirect('dashboard')
    // }
};
//getting update page
module.exports.UpdatePolls = async (req, res, next) => {
    const poll = await Poll.findOne({
        where: {
         id: req.params.id
        }
    })
    const candidates = await Candidate.findAll({
      where:{
        pollId:req.params.id
      }
    })
    if (poll){
        res.render("updatePoll",
          {poll,candidates})
    }
    
}