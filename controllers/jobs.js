const Job = require('../models/job');
const User = require('../models/user');

module.exports = {
  index,
  create, 
  show,
  update,
  delete: deleteOne 
};

async function index(req, res) {
  try{
    await User.findById(req.user._id, function(err, user) {
      res.status(201).json(user.jobs);
  });
  }
  catch(err){
      res.status(500).json(err);
  }
}

async function create(req, res) {
  const create = await User.findById(req.user._id, function(err, user) {
      user.jobs.push(req.body);
      user.save(function(err) {
      res.status(201).json(create);
      });
  });
}

async function deleteOne(req, res) {
  const deletedJob = await User.findById(req.user._id, function(err, user) {
  user.jobs.splice(req.params.id, 1);
  user.save(function(err) {
  res.status(201).json(deletedJob);
  });
})};

async function update(req, res) {
  const user = await User.findById(req.user._id)
  let updatedJob = user.jobs.splice(req.params.idx, 1, req.body);
  user.save(function(err) {
  res.status(201).json(user.jobs[req.params.idx]);
  });
};
    
async function show(req, res) {
  try {
    const job = await Job.findById(req.params.id);
    res.status(200).json(job);
  }
  catch(err){
    res.status(500).json(err);
  }
}