import '../scss/addproduct.scss'
import {useState, useContext, useEffect} from "react";
import {Context} from "../provider/contextprovider";
import Productbrandservice from "../services/productbrandservice";
const DetailProduct=(props)=>{
    const value=useContext(Context);
    const [idProductBrand,setIdProductBrand]=useState(props.idProductBrand)
    const [productBrand,setProductBrand]=useState({})

    useEffect(() => {
        Productbrandservice.getProductBrandById(idProductBrand).then(res=>{
            setProductBrand(res.data)
        })
        return()=>{
            props.handleUnMountDetailProduct();
        }
    }, []);

    return(
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <p>Name:</p>
                        <input type={"text"} value={productBrand.name}/>
                    </div>
                    <div className="col-12">
                        <p>Color:</p>
                        <input type={"text"} value={productBrand.color}/>
                    </div>
                    <div className="col-12">
                        <p>Quantity:</p>
                        <input type={"text"} value={productBrand.quantity}/>
                    </div>
                    <div className="col-12">
                        <p>Sell price:</p>
                        <input type={"text"} value={productBrand.sellPrice}/>
                    </div>
                    <div className="col-12">
                        <p>Origin price:</p>
                        <input type={"text"} value={productBrand.originPrice}/>
                    </div>
                    <div className="col-12">
                        <p>Brand name:</p>
                        <select>
                            <option>{productBrand.brandName}</option>
                        </select>
                    </div>
                    <div className="col-12">
                        <p>Subcategory:</p>
                        <select>
                            <option>{productBrand.subCategory}</option>
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