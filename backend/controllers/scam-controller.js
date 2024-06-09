import { LoginUser } from '../models/Scam-user.js';
async function postUserData(req, res) {
  const { name,title,district,scam,myFile } = req.body;
  
  const newUser = new LoginUser({name,title,district,scam,myFile});
  if (req.body.name === undefined) {
    return res.status(400).send({ error: "Name is required" });
  }
  try {
    const savedUser = await newUser.save();
    return res.status(200).send(savedUser);
  } catch (error) {
    return res.status(500).send({ error: "Internal Server Error" });
  }
}

// Function to search for a user
async function searchUser(req, res) {
  const { name } = req.query;
  try {
    const user = await LoginUser.findOne({ name: name });
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
}


async function getAllPosts(req, res) {
  
  try {
    const user = await LoginUser.find({  });
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
}

async function updateUpvotes(req, res) {
  const { id } = req.body; 
  try {
    const user = await LoginUser.findById(id);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    user.upvotes += 1; // Increment upvotes by 1
    const updatedUser = await user.save();
    return res.status(200).send(updatedUser);
  } catch (error) {
    return res.status(500).send({ error: "Internal Server Error" });
  }
}

async function updateDownvotes(req, res) {
  const { id } = req.body; // Assuming the user's ID is passed as a URL parameter
  try {
    const user = await LoginUser.findById(id);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    user.downvotes += 1; // Increment downvotes by 1
    const updatedUser = await user.save();
    return res.status(200).send(updatedUser);
  } catch (error) {
    return res.status(500).send({ error: "Internal Server Error" });
  }
}

function paginationResult(req, res) {


  res.status(200).json(res.paginationResult)
}

 async function  postcount (req,res) {
  try {
    const postCount = await LoginUser.find().count();
    return res.status(200).json({ postCount });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
}

// Exporting the functions using ES Module syntax
export { postUserData, searchUser,getAllPosts,updateUpvotes,updateDownvotes,paginationResult,postcount };
