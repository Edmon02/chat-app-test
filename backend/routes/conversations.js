const router = require("express").Router();
const Conversation = require("../models/Conversation");

//new conv
router.post("/", async (req, res) => {
     const newConversation = new Conversation({
          members: [req.body.senderId, req.body.receiverId],
     });

     try{
          const savedConversatino = await newConversation.save();
          res.status(200).json(savedConversatino)
     }catch(err) {
          res.status(500).json.apply(err)
     }
})

//get conv of user
router.get("/:userId", async (req, res) => {
     try{
          const conversation = await Conversation.find({
               members: { $in: [req.params.userId] },
          });
          res.status(200).json(conversation)
     }catch(err) {
          res.status(500).json(err)
     }
})

module.exports = router