const User = require("../../Models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


exports.signup = (req, res) => {
  console.log(req.body)
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (user)
      return res.status(400).json({
        error: "Admin already registered",
      });

    const { firstName, lastName, email, password } = req.body;
    // const hash_password = await bcrypt.hash(password, 10);
    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      role: "admin"
    });

    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }
      if(data){
        return res.status(201).json({
            message:"Admin created successfully",
            user:data
        })
      }
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      const isPassword = await user.authenticate(req.body.password);
      if (isPassword && user.role==="admin") {
        const token = jwt.sign({_id: user._id, role:user.role}, process.env.JWT_SECRET, { expiresIn:"1d"});
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.status(200).json({
          token,
          user: { _id, firstName, lastName, email, role, fullName },
        });
      } else {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  });
};

exports.getUser = async(req,res)=>{
  try{
      const response = await User.find();
      const filter = response.filter((user)=>user.role==="user");
      res.json(filter);
  }
  catch{(err)=>res.json(err)};
}