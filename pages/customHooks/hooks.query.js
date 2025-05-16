import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Products  = async() => {
    try{
const res = await axios.get('https://fakestoreapi.com/products')
console.log(res.data);
return res?.data
        }
        catch(err){
            console.error(err)
        }
    }
    export const useProductList = () => {
        return useQuery({
            queryFn: () => Products(),
            queryKey:['product'],
            onSuccess:() => {
               console.log('Data successfully fetched');
               
            }
               })
    }