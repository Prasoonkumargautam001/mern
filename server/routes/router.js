const express = require("express");
const router = new express.Router();
const Products = require("../models/productsSchema");
const bcrypt = require("bcryptjs");
const USER = require("../models/userSchema");
const authenticate = require("../middleware/authenticate");

router.get("/getproducts",async(req,res)=>{
    try{
        const productsdata = await Products.find();
        //  console.log(productsdata);
        res.status(201).json(productsdata);
        
    }catch(error){
       console.log("error" + error.message);
    }
})

//get individual data
router.get("/getproductsone/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        //console.log(id);

        const individualdata = await Products.findOne({id:id});
        //console.log(individualdata);
        res.status(201).json(individualdata);

    }catch(error){
     res.status(400).json(error);
     console.log('error' + error.message);
    }
});

//register data

router.post("/register",async(req,res)=>{
    //console.log(req.body);

    const { fname, email, mobile, password, cpassword } = req.body;

    if (!fname || !email || !mobile || !password || !cpassword) {
        res.status(422).json({ error: "filll the all details" });
        console.log("details not present");
    };

    try {

        const preuser = await USER.findOne({ email: email });

        if (preuser) {
            res.status(422).json({ error: "This email is already exist" });
        } else if (password !== cpassword) {
            res.status(422).json({ error: "password are not matching" });;
        } else {

            const finaluser = new USER({
                fname, email, mobile, password, cpassword 
            });

            //password hasing process
            const storedata = await finaluser.save();
            // console.log(storedata + "user successfully added");
            res.status(201).json(storedata);

        } 
      } catch (error) {
            console.log("error " + error.message);
            res.status(422).send(error);
        }
    
    
});

//login data
router.post("/login", async (req, res) => {
    // console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "fill the details" });
    }

    try {

        const userlogin = await USER.findOne({ email: email });
        console.log(userlogin);
        if (userlogin) {
            const isMatch = await bcrypt.compare(password, userlogin.password);
            console.log(isMatch);





            if (!isMatch) {
                res.status(400).json({ error: "invalid crediential pass" });
              
            } else {
                const token = await userlogin.generatAuthtoken();
                console.log(token);

                
                res.cookie("eccomerce", token, {
                    expires: new Date(Date.now() + 2589000),
                    httpOnly: true
                });

                res.status(201).json(userlogin);
            }
            } else {
            res.status(400).json({ error: "user not exist" });
        }
        
    }catch(error){
       res.status(400).json({error:"invalid details"})        
    }
})

// adding the data into cart
router.post("/addcart/:id", authenticate, async (req, res) => {

    try {
        console.log("perfect 6");
        const { id } = req.params;
        const cart = await Products.findOne({ id: id });
        console.log(cart);

        const Usercontact = await USER.findOne({ _id: req.userID });
        console.log(Usercontact);


        if (Usercontact) {
            const cartData = await Usercontact.addcartdata(cart);

            await Usercontact.save();
            console.log(cartData);
            console.log(Usercontact);
            res.status(201).json(Usercontact);
        }else{
            res.status(401).json({error:"invalid user"});
        }
    } catch (error) {
        res.status(401).json({error:"invalid user"});
        console.log(error);
    }
});

// get data into the cart
router.get("/cartdetails", authenticate, async (req, res) => {
    try {
        const buyuser = await USER.findOne({ _id: req.userID });
        console.log(buyuser + "user hain buy pr");
        res.status(201).json(buyuser);
    } catch (error) {
        console.log(error + "error for buy now");
    }
});

// get user is login or not
router.get("/validuser", authenticate, async (req, res) => {
    try {
        const validuserone = await USER.findOne({ _id: req.userID });
        console.log(validuserone + "user hain home k header main pr");
        res.status(201).json(validuserone);
    } catch (error) {
        console.log(error + "error for valid user");
    }
});

// // for userlogout

router.get("/logout", authenticate, async (req, res) => {
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
            return curelem.token !== req.token
        });

        res.clearCookie("eccomerce", { path: "/" });
        req.rootUser.save();
        res.status(201).json(req.rootUser.tokens);
        console.log("user logout");

    } catch (error) {
        console.log(error + "jwt provide then logout");
    }
});

// // remove iteam from the cart

router.get("/remove/:id", authenticate, async (req, res) => {
    try {
        const { id } = req.params;

        req.rootUser.carts = req.rootUser.carts.filter((curel) => {
            return curel.id != id
        });

        req.rootUser.save();
        res.status(201).json(req.rootUser);
        console.log("iteam remove");

    } catch (error) {
        console.log(error + "jwt provide then remove");
        res.status(400).json(error);
    }
});

module.exports = router;
