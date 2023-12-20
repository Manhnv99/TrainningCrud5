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
    const [idBrand,setIdBrand]=useState('')
    const [idSubCate,setIdSubCate]=useState('')
    const [idStatus,setIdStatus]=useState('')
    const [idProductBrand,setIdProductBrand]=useState(props.idProductBrand)
    const [loading,setLoading]=useState(false)

    useEffect(() => {
        Productbrandservice.getProductBrandById(idProductBrand).then(res=>{
            let productBrand= res.data;
            let brand=document.querySelectorAll('.selectBrand option')
            let subcate=document.querySelectorAll('.selectSubCate option')
            let status=document.querySelectorAll('.selectStatus option')
            setNameP(productBrand.name);
            setColorP(productBrand.color);
            setQuantityP(productBrand.quantity);
            setSellPrice(productBrand.sellPrice);
            setOriginPrice(productBrand.originPrice);
            for(let i=0;i<brand.length;i++){
                if(productBrand.brandName===brand[i].innerHTML){
                    brand[i].selected=true;
                    setIdBrand(brand[i].value)
                }
            }
            for(let i=0;i<subcate.length;i++){
                if(productBrand.subCategory===subcate[i].innerHTML){
                    subcate[i].selected=true;
                    setIdSubCate(subcate[i].value)
                }
            }
            for(let i=0;i<status.length;i++){
                if(productBrand.pStatus===status[i].innerHTML){
                    status[i].selected=true;
                    setIdStatus(status[i].value)
                }
            }
        })
        return()=>{
            props.handleUnMountDetailProduct();
        }
    }, []);


    const handleChangeName=(e)=>{
        setNameP(e.target.value)
    }

    const handleChangeColor=(e)=>{
        setColorP(e.target.value)
    }

    const handleChangeQuantity=(e)=>{
        setQuantityP(e.target.value)
    }

    const handleChangeSellPrice=(e)=>{
        setSellPrice(e.target.value)
    }

    const handleChangeOriginPrice=(e)=>{
        setOriginPrice(e.target.value)
    }

    const handleChangeBrandName=(e)=>{
        setIdBrand(e.target.value)
    }


    const handleChangeSubCate=(e)=>{
        setIdSubCate(e.target.value)
    }

    const handleChangeStatus=(e)=>{
        setIdStatus(e.target.value)
    }

    const handleEditProduct=()=>{
        let idProductBrand= props.idProductBrand
        UpdateDetailProduct(idProductBrand);
    }

    const UpdateDetailProduct= (id)=>{
        setLoading(true)
        setTimeout(async ()=>{
            let error=document.querySelectorAll('.validate  span');
            if(value.validate(nameP,colorP,quantityP,sellPrice,originPrice,error)===0){
                let productBrand;
                let idProductBrandEdit;
                let idProductEdit;
                let subCate={};
                let status={};
                let brandOj={};
                let currentProduct={};
                //lấy ra product_brand để lấy idbrand và idProduct để update productBrand
                await productbrandservice.getById(id).then(res=>{
                    productBrand=res.data;
                });


                //get brand object
                await brandservice.getBrandById(idBrand).then(res=>{
                    brandOj=res.data;
                });

                //get subcate object
                await categoryservice.getSubCateById(idSubCate).then(res=>{
                    subCate=res.data;
                });

                //get status object to add into product
                await statusservice.getStatusById(idStatus).then(res=>{
                    status=res.data;
                })

                //lấy ra idBrand và idProduct để thực hiện update
                idProductBrandEdit=productBrand.id;
                idProductEdit=productBrand.product.id;


                let productOj={
                    productName:nameP,
                    color:colorP,
                    quantity:quantityP,
                    sellPrice:sellPrice,
                    originPrice:originPrice,
                    description:'tốt',
                    subCategory:subCate,
                    status:status
                }

                await productservice.updateProductById(idProductEdit,productOj);

                await productservice.getProductById(idProductEdit).then(res=>{
                    currentProduct=res.data;
                })

                let productBrandOj={
                    product: currentProduct,
                    brand:brandOj
                }

                await productbrandservice.updateProductBrandById(idProductBrandEdit,productBrandOj);
                await value.showDataProductBrand();
                await value.handleClose();
                setLoading(false);
            }
        },1500)
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
                        <input type={"text"} value={nameP} onChange={(e) => {
                            handleChangeName(e)
                        }} />
                    </div>
                    <div className="col-12">
                        <div className="validate">
                            <p>Color:</p>
                            <span></span>
                        </div>
                        <input type={"text"} value={colorP} onChange={(e) => {
                            handleChangeColor(e)
                        }}/>
                    </div>
                    <div className="col-12">
                        <div className="validate">
                            <p>Quantity:</p>
                            <span></span>
                        </div>
                        <input type={"text"} value={quantityP} onChange={(e) => {
                            handleChangeQuantity(e)
                        }}/>
                    </div>
                    <div className="col-12">
                        <div className="validate">
                            <p>Sell Price:</p>
                            <span></span>
                        </div>
                        <input type={"text"} value={sellPrice} onChange={(e) => {
                            handleChangeSellPrice(e)
                        }}/>
                    </div>
                    <div className="col-12">
                        <div className="validate">
                            <p>Origin Price:</p>
                            <span></span>
                        </div>
                        <input type={"text"} value={originPrice} onChange={(e) => {
                            handleChangeOriginPrice(e)
                        }}/>
                    </div>
                    <div className="col-12">
                        <div className="validate">
                            <p>Brand Name:</p>
                            <span></span>
                        </div>
                        <select className="selectBrand" onChange={(e) => {
                            handleChangeBrandName(e)
                        }}>
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
                        <select className="selectSubCate" onChange={(e) => {
                            handleChangeSubCate(e)
                        }}>
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
                        <select className="selectStatus" onChange={(e) => {
                            handleChangeStatus(e)
                        }}>
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