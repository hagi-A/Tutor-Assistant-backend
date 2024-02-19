const Child = require("../models/childModel");
const User = require("../models/userModel");

exports.createChild = async (req, res) => {
  try {
    // Find or create parent user with role 'Parent'
    let parent = await User.findOne({
      username: req.body.parentUsername,
      role: "Parent",
    });

    // if (!parent) {
    //   parent = await User.create({
    //     username: req.body.parentUsername,
    //     role: "Parent",
    //   });
    // }

    // Create child with parent reference
    const childData = {
      ...req.body,
      parent: parent._id,
    };

    const child = await Child.create(childData);
    res.status(201).json(child);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
