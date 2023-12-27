import {useState,useEffect} from "react";
import {createContext} from "react";
import Categoryservice from "../services/categoryservice";
import Statusservice from "../services/statusservice";
import Brandservice from "../services/brandservice";
import Productbrandservice from "../services/productbrandservice";
import productbrandservice from "../services/productbrandservice";
const Context=createContext();


const Provider=({children})=>{

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [listSubCate,setListSubCate]=useState([])
    const [listStatus,setListStatus]=useState([])
    const [listBrand,setListBrand]=useState([])
    const [listProductBrand,setListProductBrand]=useState([])
    const [totalPages,setTotalPage]=useState([]);


    //Set All Data
    useEffect( async () => {
        await showDataSubCate();
        await showDataStatus();
        await showDataBrand();
        await showDataProductBrand();
        await totalPage();
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
        return Productbrandservice.pageGetAll(1).then((response)=>{
            setListProductBrand(response.data);
        })
    }

    //chuyển page
    const setPage=(page,whatAction,dataSearch,pname,price,brandName,cateName,statusName)=>{
        if(whatAction==='none'){
            Productbrandservice.pageGetAll(page).then((response)=>{
                setListProductBrand(response.data);
            })
        }else if(whatAction==='search'){
            Productbrandservice.searchProductBrandByAll(dataSearch,page).then(res=>{
                setListProductBrand(res.data.productBrandResponseList);
            })
        }else{
            Productbrandservice.findProductBrandByAll(pname,price,brandName,cateName,statusName,page).then(res=>{
                setListProductBrand(res.data.productBrandResponseList);
            })
        }
    }

    //find
    const showDataFind=(name,price,brandName,cateName,statusName,page)=>{
        return Productbrandservice.findProductBrandByAll(name,price,brandName,cateName,statusName,page).then(res=>{
            setListProductBrand(res.data.productBrandResponseList);
            const myArray=[];
            for(let i=1;i<=res.data.totalResult;i++){
                myArray.push(i)
            }
            setTotalPage(myArray)
        })
    }

    //search
    const showDataSearch=(keyword,page)=>{
        return Productbrandservice.searchProductBrandByAll(keyword,page).then(res=>{
            setListProductBrand(res.data.productBrandResponseList);
            const myArray=[];
            for(let i=1;i<=res.data.totalResult;i++){
                myArray.push(i)
            }
            setTotalPage(myArray)
        })
    }


    const totalPage=()=>{
        const myArray=[];
        productbrandservice.totalPage().then(res=>{
            for(let i=1;i<=res.data;i++){
                myArray.push(i)
            }
            setTotalPage(myArray)
        })
    }


    const updateDataAdd=(productBrand)=>{
        setListProductBrand([productBrand,...listProductBrand])
    }

    const updateDataUpdate=(productBrand)=>{
        for(let i=0;i<listProductBrand.length;i++){
            if(productBrand.productId===listProductBrand[i].productId){
                listProductBrand.splice(i,1,productBrand);
            }
        }
    }

    const updateDataDelete=(productBrand)=>{
        for(let i=0;i<listProductBrand.length;i++){
            if(productBrand.productId===listProductBrand[i].productId){
                listProductBrand.splice(i,1);
            }
        }
    }

    const showToastMessage=(message)=>{
        //toast content
        let toastContent=document.createElement("div")
        toastContent.classList.add('toast-body')
        toastContent.innerHTML= `
                            <i class="fa-solid fa-circle-check"></i>
                            <span class="message">${message}</span>
                            <span class="countdown"></span>`

        //toast container
        let toastContainer=document.getElementsByClassName('toast-container')[0]
        toastContainer.appendChild(toastContent)
        console.log(toastContainer);

        setTimeout(()=>{
            toastContent.style.animation='endd ease-in-out 1.5s forwards'
        },3000)

        setTimeout(()=>{
            toastContent.remove()
        },6000)
    }


    const handleNameOnBlur=(input,error)=>{
        if(input===''){
            error[0].style.display='block'
            error[0].innerHTML='Bạn Chưa Điền Tên Sản Phẩm!'
        }else{
            error[0].style.display='none'
            error[0].innerHTML=''
        }
    }
    const handleColorOnBlur=(input,error)=>{
        if(input===''){
            error[1].style.display='block'
            error[1].innerHTML='Bạn Chưa Điền Màu Sắc!'
        }else{
            error[1].style.display='none'
            error[1].innerHTML=''
        }
    }
    const handleQuantityOnBlur=(input,error)=>{
        if(input===''){
            error[2].style.display='block'
            error[2].innerHTML='Bạn Chưa Điền Số Lượng!'
        }else{
            error[2].style.display='none'
            error[2].innerHTML=''
        }
    }
    const handleSellOnBlur=(input,error)=>{
        if(input===''){
            error[3].style.display='block'
            error[3].innerHTML='Bạn Chưa Điền Giá Bán!'
        }else{
            error[3].style.display='none'
            error[3].innerHTML=''
        }
    }

    const handleOriginOnBlur=(input,error)=>{
        if(input===''){
            error[4].style.display='block'
            error[4].innerHTML='Bạn Chưa Điền Giá Gốc!'
        }else{
            error[4].style.display='none'
            error[4].innerHTML=''
        }
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
        show,handleShow,handleClose,listSubCate,listStatus,listBrand,listProductBrand,totalPages,
        showDataProductBrand,validate,showDataSearch,showToastMessage,updateDataAdd,updateDataUpdate,updateDataDelete,setPage,totalPage,showDataFind,handleNameOnBlur,
        handleColorOnBlur,handleQuantityOnBlur,handleSellOnBlur,handleOriginOnBlur
    }



    return(
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export {Context,Provider}



