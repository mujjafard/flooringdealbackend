const cartModel = require('../Models/Cart');

// function Cart(data){

// //   for (let i=0; i<data.length; i++){
//     let i=0;
//    const filter= data.filter(data=>data.productId == data[i].productId)
//    return filter;
// //   }
// }

exports.createCart = async(req,res)=>{
        const find = await cartModel.find({identifier:req.body.identifier})
        const isAddon = req.body.isAddon
        if(find.length==0){
            const {user,slug,identifier,quantity} = req.body
            const newCart = new cartModel({
                user,slug,identifier,quantity
              });
              newCart.save((error, data) => {
                if (error) { return res.status(400).json({ message: "Something went wrong" }); }
                if (data) { return res.status(201).json({ message: "Product Added To the cart Successfully", data ,toastType:"success"}) }
              })
        }else{
            if(isAddon){
                cartModel.findByIdAndUpdate({_id:find[0]._id} , { quantity: find[0].quantity+req.body.quantity } ,(err,data)=>{
                    if(err){
                        console.log(err)
                    }else{
                        res.status(201).json({message:"Cart Updated Successfully",data,toastType:"success"});
                    }
                })
            }
            else{
                res.status(201).json({message:"Product Alredy In cart",toastType:"error"});
            }
           
        }
}


exports.getCart = async(req,res)=>{
    try{
        const getCart = await cartModel.find();
        res.json(getCart);
    }
    catch{(err)=>res.json(err)};
}


exports.getCartByUserID = async (req,res)=>{
    try{
        const getCart = await cartModel.find({user:req.params.userId});
        // const cartList = Cart(getCart);
        res.json(getCart);
    }catch(err){
        res.json({err});
    }
}


exports.updateCart = (req,res)=>{
    cartModel.findOneAndUpdate({identifier:req.params.identifier} ,(req.body),{new:true},(err,data)=>{
        try{
            res.json(data);
        }catch(err){
            res.json({err});
        }
    })
}

exports.deleteCart =(req,res)=>{ 
 
    cartModel.findOneAndDelete({identifier:req.params.identifier},(err,data)=>{
        if(err){
            res.json({err});
        }else{
            res.json(data);
        }
    });
}
