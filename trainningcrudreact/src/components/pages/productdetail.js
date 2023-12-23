import '../scss/addproduct.scss'
import {useState, useContext, useEffect} from "react";
import {Context} from "../provider/contextprovider";
import Productbrandservice from "../services/productbrandservice";
import brandservice from "../services/brandservice";
import productservice from "../services/productservice";
import categoryservice from "../services/categoryservice";


const DetailProduct=(props)=>{
    const value=useContext(Context);
    const [idproduct,setIdProduct]=useState(props.idProduct)
    const [idbrand,setIdBrand]=useState(props.idBrand)
    const [product,setProduct]=useState([])


    useEffect( () => {
        let branditem= document.querySelectorAll('.selectBrand option')
        let subcateitem= document.querySelectorAll('.selectSubCate option')

        productservice.getProductById(idproduct).then((res)=>{
            let data=res.data[0];
            setProduct(data)
            //select option
            for(let i=0;i<subcateitem.length;i++){
                if(data.subCateName===subcateitem[i].innerHTML){
                    subcateitem[i].selected=true;
                }
            }
        })

        //select option
        brandservice.getBrandById(idbrand).then(res=>{
            for(let i=0;i<branditem.length;i++){
                if(res.data.brandName===branditem[i].innerHTML){
                    branditem[i].selected=true;
                }
            }
        })

        return()=>{
            props.handleUnMountDetailProduct();
        }
    },[]);

    return(
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <p>Name:</p>
                        <input type={"text"} value={product.productName}/>
                    </div>
                    <div className="col-12">
                        <p>Color:</p>
                        <input type={"text"} value={product.color}/>
                    </div>
                    <div className="col-12">
                        <p>Quantity:</p>
                        <input type={"text"} value={product.quantity}/>
                    </div>
                    <div className="col-12">
                        <p>Sell price:</p>
                        <input type={"text"} value={product.sellPrice}/>
                    </div>
                    <div className="col-12">
                        <p>Origin price:</p>
                        <input type={"text"} value={product.originPrice}/>
                    </div>
                    <div className="col-12">
                        <p>Brand name:</p>
                        <select className="selectBrand">
                            {value.listBrand.map((item,index)=>{
                                return(
                                    <option key={index}>{item.brandName}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="col-12">
                        <p>Subcategory:</p>
                        <select className="selectSubCate">
                            {value.listSubCate.map((item,index)=>{
                                return(
                                    <option key={index}>{item.subCateName}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className="action">
                    <button onClick={()=>{value.handleClose()}}>Close</button>
                </div>
            </div>
        </>
    )
}

export default DetailProduct