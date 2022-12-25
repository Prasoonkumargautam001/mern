const Products = require("./models/productsSchema");
const products = require("./constant/productsdata");


const DefaultData = async()=>{
    try{

           await Products.deleteMany({});

        const storeData = await Products.insertMany(products);
        console.log(storeData);
    }catch(error) {
         console.log("error" + error.message);
    }
};

module.exports = DefaultData;