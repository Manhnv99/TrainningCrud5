import {useState,useEffect} from "react";
import {createContext} from "react";
import Categoryservice from "../services/categoryservice";
import Statusservice from "../services/statusservice";
import Brandservice from "../services/brandservice";
import Productbrandservice from "../services/productbrandservice";
import categoryservice from "../services/categoryservice";

const Context=createContext();
const Provider=({children})=>{

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [listSubCate,setListSubCate]=useState([])
    const [listStatus,setListStatus]=useState([])
    const [listBrand,setListBrand]=useState([])
    const [listProductBrand,setListProductBrand]=useState([])

    //Set All Data
    useEffect( async () => {
        await showDataSubCate();
        await showDataStatus();
        await showDataBrand();
        await showDataProductBrand();
    }, []);

    const showDataSubCate= ()=>{
        return Categoryservice.getAll().then((response)=>{
            setListSubCate(response.data);
        })
    }
    const showDataStatus=()=>{
        return Statusservice.getAll().then((response)=>{
            setListStatus(response.data);
        })
    }

    const showDataBrand=()=>{
        return Brandservice.getAll().then((response)=>{
            setListBrand(response.data);
        })
    }

    const showDataProductBrand=()=>{
        return Productbrandservice.getAll().then((response)=>{
            setListProductBrand(response.data);
        })
    }

    const showDataFind=(name,price,brandName,cateName,statusName)=>{
        return Productbrandservice.findProductBrandByAll(name,price,brandName,cateName,statusName).then(res=>{
            setListProductBrand(res.data);
        })
    }

    const showDataSearch=(keyword)=>{
        return Productbrandservice.searchProductBrandByAll(keyword).then(res=>{
            setListProductBrand(res.data);
        })
    }


    const validate=(name,color,quantity,sellprice,originprice,error)=>{
        let count =0;
        if(name===''){
            error[0].style.display='block'
            error[0].innerHTML='Bạn Chưa Điền Tên Sản Phẩm!'
            count++;
        }else{
            error[0].style.display='none'
            if(color===''){
                error[1].style.display='block'
                error[1].innerHTML='Bạn Chưa Điền Màu Sắc!'
                count++;
            }else{
                error[1].style.display='none'
                if(quantity===''){
                    error[2].style.display='block'
                    error[2].innerHTML='Bạn Chưa Điền Số Lượng!'
                    count++;
                }else{
                    if(isNaN(quantity)){
                        error[2].style.display='block'
                        error[2].innerHTML='Số Lượng Phải Là Số!'
                        count++;
                    }else{
                        error[2].style.display='none'
                        if(sellprice===''){
                            error[3].style.display='block'
                            error[3].innerHTML='Bạn Chưa Điền Giá Bán!'
                            count++;
                        }else{
                            if(isNaN(sellprice)){
                                error[3].style.display='block'
                                error[3].innerHTML='Giá Bán Phải Là Số!'
                                count++;
                            }else{
                                error[3].style.display='none'
                                if(originprice===''){
                                    error[4].style.display='block'
                                    error[4].innerHTML='Bạn Chưa Điền Giá Gốc!'
                                    count++;
                                }else {
                                    if(isNaN(originprice)){
                                        error[4].style.display='block'
                                        error[4].innerHTML='Giá Gốc Phải Là Số!'
                                        count++;
                                    }else{
                                        error[4].style.display='none'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        return count;
    }




    const value={
        show,handleShow,handleClose,listSubCate,listStatus,listBrand,listProductBrand,showDataProductBrand,showDataFind,showDataSearch,validate
    }



    return(
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export {Context,Provider}



