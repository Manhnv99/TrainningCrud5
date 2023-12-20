import axios from "axios";

class Productbrandservice{
    getAll=()=>{
        return axios(`http://localhost:8080/productBrand/list`)
    }

    getProductBrandById=(id)=>{
        return axios(`http://localhost:8080/productBrand/list/${id}`)
    }

    addProductBrand=(productBrand)=>{
        return axios.post(`http://localhost:8080/productBrand/add`,productBrand)
    }

    findProductBrandByAll=(name,price,brandName,cateName,statusName)=>{
        return axios.get(`http://localhost:8080/productBrand/find`,
            {
                params:{
                    name,price,brandName,cateName,statusName
                }
            }
        );
    }

    searchProductBrandByAll=(keyword)=>{
        // ở đây phaỉ đặt đúng value ten la keyword như ở bên kia đặt
        return axios.get(`http://localhost:8080/productBrand/search`,
            {
            params:{
                keyword
            }
        })
    }


    deleteProductBrandById=(id)=>{
        return axios.delete(`http://localhost:8080/productBrand/remove/${id}`);
    }

    getById=(id)=>{
        return axios.get(`http://localhost:8080/productBrand/listProductBrand/${id}`)
    }

    updateProductBrandById=(id,productBrand)=>{
        return axios.put(`http://localhost:8080/productBrand/update/${id}`,productBrand)
    }

}

export default new Productbrandservice()