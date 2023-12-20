import '../scss/addproduct.scss'
import {useState, useContext, useEffect} from "react";
import {Context} from "../provider/contextprovider";
import brandservice from "../services/brandservice";
import categoryservice from "../services/categoryservice";
import statusservice from "../services/statusservice";
import productservice from "../services/productservice";
import productbrandservice from "../services/productbrandservice";
import Loading from "./loading";


const AddProduct=(props)=>{
    const value=useContext(Context);
    const [nameP,setNameP]=useState('')
    const [colorP,setColorP]=useState('')
    const [quantityP,setQuantityP]=useState('')
    const [sellPrice,setSellPrice]=useState('')
    const [originPrice,setOriginPrice]=useState('')
    const [idBrand,setIdBrand]=useState('')
    const [idSubCate,setIdSubCate]=useState('')
    const [loading,setLoading]=useState(false)

    useEffect( () => {
        categoryservice.getAll().then(res=>{
            setIdSubCate(res.data.shift().id);
        })
        brandservice.getAll().then(res=>{
            setIdBrand(res.data.shift().id);
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

    const handleAddProduct=()=>{
        setLoading(true)
        setTimeout(async ()=>{
            let error=document.querySelectorAll('.validate  span')
            if(value.validate(nameP,colorP,quantityP,sellPrice,originPrice,error)===0){
                //get brand object
                let brand={};
                let subCate={};
                let status={};
                let top1Product;


                //get brand object
                await brandservice.getBrandById(idBrand).then(res=>{
                    brand=res.data;
                });

                //get subcate object
                await categoryservice.getSubCateById(idSubCate).then(res=>{
                    subCate=res.data;
                });

                //get status object to add into product
                await statusservice.getStatusById(1).then(res=>{
                    status=res.data;
                })

                //set product để add
                let product= {
                    productName:nameP,
                    color:colorP,
                    quantity:quantityP,
                    sellPrice:sellPrice,
                    originPrice:originPrice,
                    description:'tốt',
                    subCategory:subCate,
                    status:status
                }

                //add Product
                await productservice.addProduct(product);

                //Lấy ra product vừa add
                await productservice.getAll().then(res=>{
                    top1Product=res.data.pop()
                });

                //set productBrand để add
                let productBrand={
                    product:top1Product,
                    brand:brand
                }

                //add ProductBrand
                await productbrandservice.addProductBrand(productBrand);


                await  value.showDataProductBrand();
                await value.handleClose();
                setLoading(false)
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
                        <input type={"text"} onChange={(e)=>{handleChangeName(e)}}/>
                    </div>
                    <div className="col-12">
                        <div className="validate">
                            <p>Color:</p>
                            <span></span>
                        </div>
                        <input type={"text"} onChange={(e) => {
                            handleChangeColor(e)
                        }}/>
                    </div>
                    <div className="col-12">
                        <div className="validate">
                            <p>Quantity:</p>
                            <span></span>
                        </div>
                        <input type={"text"} onChange={(e) => {
                            handleChangeQuantity(e)
                        }}/>
                    </div>
                    <div className="col-12">
                        <div className="validate">
                            <p>Sell Price:</p>
                            <span></span>
                        </div>
                        <input type={"text"} onChange={(e) => {
                            handleChangeSellPrice(e)
                        }}/>
                    </div>
                    <div className="col-12">
                        <div className="validate">
                            <p>Origin Price:</p>
                            <span></span>
                        </div>
                        <input type={"text"} onChange={(e) => {
                            handleChangeOriginPrice(e)
                        }}/>
                    </div>
                    <div className="col-12">
                        <div className="validate">
                            <p>Brand Name:</p>
                            <span></span>
                        </div>
                        <select onChange={(e) => {
                            handleChangeBrandName(e)
                        }}>
                            {value.listBrand.map(item => {
                                return(
                                    <option key={item.id} value={item.id}>{item.brandName}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="col-12">
                        <div className="validate">
                            <p>SubCateGory:</p>
                            <span></span>
                        </div>
                        <select onChange={(e) => {
                            handleChangeSubCate(e)
                        }}>
                            {value.listSubCate.map(item => {
                                return(
                                    <option key={item.id} value={item.id}>{item.subCateName}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className="action">
                    <button onClick={()=>{handleAddProduct()}}>Save changes</button>
                    <button onClick={()=>{value.handleClose()}}>Close</button>
                </div>
            </div>
        </>
    )
}

export default AddProduct