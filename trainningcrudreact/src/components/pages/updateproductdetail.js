import {useContext, useEffect, useState} from "react";
import {Context} from "../provider/contextprovider";
import productbrandservice from "../services/productbrandservice";
import categoryservice from "../services/categoryservice";
import statusservice from "../services/statusservice";
import Productbrandservice from "../services/productbrandservice";
import brandservice from "../services/brandservice";
import productservice from "../services/productservice";
import Loading from "./loading";


const Updateproductdetail=(props)=>{
    const value=useContext(Context);
    const [nameP,setNameP]=useState('')
    const [colorP,setColorP]=useState('')
    const [quantityP,setQuantityP]=useState('')
    const [sellPrice,setSellPrice]=useState('')
    const [originPrice,setOriginPrice]=useState('')
    const [idSubCate,setIdSubCate]=useState('')
    const [idStatus,setIdStatus]=useState('')
    const [loading,setLoading]=useState(false)
    const [idProduct,setIdProduct]=useState(props.idProduct)
    const [idBrand,setIdBrand]=useState(props.idBrand)
    let error=document.querySelectorAll('.validate  span');


    useEffect(() => {
        let brand=document.querySelectorAll('.selectBrand option')
        let subcate=document.querySelectorAll('.selectSubCate option')
        let status=document.querySelectorAll('.selectStatus option')

        //get Product to fill on the talbe
        productservice.getProductById(idProduct).then((res)=>{
            let data=res.data[0]
            //select option
            for(let i=0;i<subcate.length;i++){
                if(data.subCateName===subcate[i].innerHTML){
                    subcate[i].selected=true;
                    setIdSubCate(subcate[i].value)
                }
            }
            setNameP(data.productName);
            setColorP(data.color);
            setQuantityP(data.quantity);
            setSellPrice(data.sellPrice);
            setOriginPrice(data.originPrice);

            for(let i=0;i<status.length;i++){
                if(data.statusName===status[i].innerHTML){
                    status[i].selected=true;
                    setIdStatus(status[i].value)
                }
            }
            //select option
            brandservice.getBrandById(idBrand).then(res=>{
                for(let i=0;i<brand.length;i++){
                    if(res.data.brandName===brand[i].innerHTML){
                        brand[i].selected=true;
                        setIdBrand(brand[i].value)
                    }
                }
            })
        })

        return()=>{
            props.handleUnMountDetailProduct();
        }
    }, []);


    const handleEditProduct=()=>{
        let idProductBrand= props.idProductBrand
        UpdateDetailProduct(idProductBrand);
    }

    const handleNameOnBlur=()=>{
        value.handleNameOnBlur(nameP,error)
    }

    const handleColorOnBlur=()=>{
        value.handleColorOnBlur(colorP,error)
    }

    const handleQuantityOnBlur=()=>{
        value.handleQuantityOnBlur(quantityP,error)
    }

    const handleSellOnBlur=()=>{
        value.handleSellOnBlur(sellPrice,error)
    }

    const handleOriginOnBlur=()=>{
        value.handleOriginOnBlur(originPrice,error)
    }

    const UpdateDetailProduct= (id)=>{
        if(value.validate(nameP,colorP,quantityP,sellPrice,originPrice,error)===0){
            setLoading(true)
            setTimeout(async ()=>{

                let productOj={
                    productName:nameP,
                    color:colorP,
                    quantity:quantityP,
                    sellPrice:sellPrice,
                    originPrice:originPrice,
                    description:'tốt',
                    idSubcate:idSubCate,
                    idStatus:idStatus
                }

                //update product
                await productservice.updateProductById(idProduct,productOj);

                let productBrandRequest={
                    brandIdEdit: idBrand,
                    productId:props.idProduct,
                    brandId:props.idBrand
                }

                await productbrandservice.updateProductBrand(productBrandRequest).then((res)=>{
                    value.updateDataUpdate(res.data)
                });

                // await value.showDataProductBrand();
                await value.handleClose();
                await setLoading(false);
                await value.showToastMessage('Sửa Sản Phẩm Thành Công!')
            },1500)
        }
    }


    return(
        <>
            {loading && <Loading/>}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="validate">
                            <p>Name:</p>
                            <span></span>
                        </div>
                        <input type={"text"} value={nameP} onChange={(e) => {setNameP(e.target.value)}} onBlur={handleNameOnBlur}/>
                    </div>
                    <div className="col-12">
                        <div className="validate">
                            <p>Color:</p>
                            <span></span>
                        </div>
                        <input type={"text"} value={colorP} onChange={(e) => {setColorP(e.target.value)}} onBlur={handleColorOnBlur}/>
                    </div>
                    <div className="col-12">
                        <div className="validate">
                            <p>Quantity:</p>
                            <span></span>
                        </div>
                        <input type={"text"} value={quantityP} onChange={(e) => {setQuantityP(e.target.value)}} onBlur={handleQuantityOnBlur}/>
                    </div>
                    <div className="col-12">
                        <div className="validate">
                            <p>Sell Price:</p>
                            <span></span>
                        </div>
                        <input type={"text"} value={sellPrice} onChange={(e) => {setSellPrice(e.target.value)}} onBlur={handleSellOnBlur}/>
                    </div>
                    <div className="col-12">
                        <div className="validate">
                            <p>Origin Price:</p>
                            <span></span>
                        </div>
                        <input type={"text"} value={originPrice} onChange={(e) => {setOriginPrice(e.target.value)}} onBlur={handleOriginOnBlur}/>
                    </div>
                    <div className="col-12">
                        <div className="validate">
                            <p>Brand Name:</p>
                            <span></span>
                        </div>
                        <select className="selectBrand" onChange={(e) => {setIdBrand(e.target.value)}}>
                            {value.listBrand.map(item => {
                                return (
                                    <option key={item.brandName} value={item.id}>{item.brandName}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="col-12">
                        <div className="validate">
                            <p>SubCateGory:</p>
                            <span></span>
                        </div>
                        <select className="selectSubCate" onChange={(e) => {setIdSubCate(e.target.value)}}>
                            {value.listSubCate.map(item => {
                                return (
                                    <option key={item.id} value={item.id}>{item.subCateName}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="col-12">
                        <div className="validate">
                            <p>Status:</p>
                            <span></span>
                        </div>
                        <select className="selectStatus" onChange={(e) => {setIdStatus(e.target.value)}}>
                            {value.listStatus.map(item => {
                                return (
                                    <option key={item.id} value={item.id}>{item.statusName}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className="action">
                    <button onClick={() => {
                        handleEditProduct()
                    }}>Save changes
                    </button>
                    <button onClick={() => {
                        value.handleClose()
                    }}>Close
                    </button>
                </div>
            </div>
        </>
    )
}

export default Updateproductdetail;