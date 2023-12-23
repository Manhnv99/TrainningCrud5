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


    const handleAddProduct=()=>{
        let error=document.querySelectorAll('.validate  span')
        if(value.validate(nameP,colorP,quantityP,sellPrice,originPrice,error)===0){
            setLoading(true)
            setTimeout(async ()=>{
                //get brand object
                let currentProduct;

                let product= {
                    productName:nameP,
                    color:colorP,
                    quantity:quantityP,
                    sellPrice:sellPrice,
                    originPrice:originPrice,
                    description:'tốt',
                    idSubcate:idSubCate,
                    idStatus:1
                }

                //add Product
                await productservice.addProduct(product).then(res=>{
                    currentProduct=res.data;
                });

                let productBrand={
                    brandIdEdit:null,
                    productId:currentProduct.id,
                    brandId:idBrand
                }

                // add ProductBrand
                await productbrandservice.addProductBrand(productBrand).then(res=>{
                    // value.updateDataAdd(res.data)
                    value.setPage(1)
                    value.totalPage()
                });
                await value.handleClose();
                await setLoading(false)
                await value.showToastMessage('Thêm Sản Phẩm Thành Công!')
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
                        <input type={"text"} onChange={(e)=>{setNameP(e.target.value)}}/>
                    </div>
                    <div className="col-12">
                        <div className="validate">
                            <p>Color:</p>
                            <span></span>
                        </div>
                        <input type={"text"} onChange={(e) => {setColorP(e.target.value)}}/>
                    </div>
                    <div className="col-12">
                        <div className="validate">
                            <p>Quantity:</p>
                            <span></span>
                        </div>
                        <input type={"text"} onChange={(e) => {setQuantityP(e.target.value)}}/>
                    </div>
                    <div className="col-12">
                        <div className="validate">
                            <p>Sell Price:</p>
                            <span></span>
                        </div>
                        <input type={"text"} onChange={(e) => {setSellPrice(e.target.value)}}/>
                    </div>
                    <div className="col-12">
                        <div className="validate">
                            <p>Origin Price:</p>
                            <span></span>
                        </div>
                        <input type={"text"} onChange={(e) => {setOriginPrice(e.target.value)}}/>
                    </div>
                    <div className="col-12">
                        <div className="validate">
                            <p>Brand Name:</p>
                            <span></span>
                        </div>
                        <select onChange={(e) => {setIdBrand(e.target.value)}}>
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
                        <select onChange={(e) => {setIdSubCate(e.target.value)}}>
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