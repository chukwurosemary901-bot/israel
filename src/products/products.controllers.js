import { products } from "./products.services.js";

export const getProductIdController= async (req, res)=>{
try {
    const{id}=req.params
if(!id){
  return res.status(404).json({message:'pls input a valid id'})
}
// check if id exists
if(id){
  const checkid= products.find((product)=>product.id===parseInt(id))
if(!checkid){return res.status(404).json({error:`pls enter a valid id, id ${id} does not exists`})}

return res.status(201).json({checkid})
}
} catch (error) {
    console.log("Error logging in user", error);
    return res.status(500).json({error: "Internal Server Error"});
} 
}



export const addProductController= async (req, res)=>{
    try {
        const{ id, name, price, category}=req.body
    // check if products exists using name
    const Checkproduct= products.find((prod)=>prod.name===name)
    if(Checkproduct){return res.status(404).json({error:`name of products already exists`})}
    // check if products id exist
    // push your values into the list
    products.push({id, name, price, category})
    return res.status(201).json({message:'successful', products})
}
     catch (error) {
        console.log("Error logging in user", error);
    return res.status(500).json({error: "Internal Server Error"});
    } 

}



export const allProductController= async (req, res)=>{
try {
    return res.status(201).json({message:`All products`, products})
} catch (error) {
    console.log("Error logging in user", error);
    return res.status(500).json({error: "Internal Server Error"});
}
}



export const deleteProductController=  async (req, res) => {
    
    const {id}=req.params
    if(!id){return res.status(404).json({error:`id is required`})}
// check if id exists
const checkid= products.find((product)=> product.id===parseInt(id))
if(!checkid){return res.status(201).json({error:`pls enter a valid id, id ${id} does not exists`})}
products.find((product)=> product.id !== id)
return res.status(201).json({message:`Succesfully deleted`, products})
}