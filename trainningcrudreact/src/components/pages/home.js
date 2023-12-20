import '../scss/home.scss'
import {useState, useContext, useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AddProduct from "./addproductdetail";
import DetailProduct from "./productdetail";
import {Context} from "../provider/contextprovider";
import Updateproductdetail from "./updateproductdetail";
import productbrandservice from "../services/productbrandservice";
import productservice from "../services/productservice";
import Loading from "./loading";

const Home=()=>{
    // get value from contextprovider
    const value=useContext(Context);
    const [showDetailProduct,setShowDetailProduct]=useState(0);
    const [idProductBrand,setIdProductBrand]=useState(0);
    const [pname,setPname]=useState('')
    const [price,setPrice]=useState('')
    const [brandName,setBrandName]=useState('')
    const [cateName,setCateName]=useState('')
    const [statusName,setStatusName]=useState('')
    const [loading,setLoading]=useState(false)

    let i=1;

    const handleShowDetailProduct =async (id)=>{
        await setShowDetailProduct(1);
        await setIdProductBrand(id);
        await value.handleShow();
    }

    const handleShowAddProduct= async ()=>{
        await setShowDetailProduct(2);
        await value.handleShow();
    }

    const handleEditDetailProduct= async(id)=>{
        await setShowDetailProduct(3);
        await setIdProductBrand(id)
        await value.handleShow();
    }


    const handleRemoveDetailProduct= (id)=>{
        setLoading(true)
        setTimeout(async ()=>{
            let productBrand;
            await productbrandservice.getById(id).then(res=>{
                productBrand=res.data;
            });
            await productbrandservice.deleteProductBrandById(id);
            await productservice.removeProductById(productBrand.product.id);
            await value.showDataProductBrand();
            setLoading(false)
        },1500)

    }


    const handleUnMountDetailProduct=()=>{
        setShowDetailProduct(0);
    }

    const handleFind=()=>{
        value.showDataFind(pname,price,brandName,cateName,statusName);
    }

    const handleSearch=(e)=>{
        value.showDataSearch(e.target.value);
    }

    return(
        <>
            {loading===true && <Loading/>}
            <div className="container-fluid">
                <div className="product__container">
                    <div className="product__body">
                        <div className="search-header">
                            <div className="row">
                                <div className="col-md-2">
                                    <p>Name</p>
                                    <input type="text" className="search-header__setWidth" onChange={(e)=>{setPname(e.target.value)}}/>
                                </div>
                                <div className="col-md-2">
                                    <p>Price</p>
                                    <input type="text" className="search-header__setWidth" onChange={(e)=>{setPrice(e.target.value)}}/>
                                </div>
                                <div className="col-md-2">
                                    <p>Brand</p>
                                    <select className="search-header__setWidth" onChange={(e)=>{setBrandName(e.target.value)}}>
                                        {value.listBrand.map(item=>{
                                            return(
                                                <option key={item.id}>{item.brandName}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="col-md-2">
                                    <p>Category</p>
                                    <select className="search-header__setWidth" onChange={(e)=>{setCateName(e.target.value)}}>
                                        {value.listSubCate.map((item)=>{
                                            return(
                                                <option key={item.id}>{item.subCateName}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="col-md-2">
                                    <p>Status</p>
                                    <select className="search-header__setWidth" onChange={(e)=>{setStatusName(e.target.value)}}>
                                        {value.listStatus.map(item=>{
                                            return(
                                                <option>{item.statusName}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="col-md-2">
                                    <div className="search-header__icon">
                                        <i onClick={()=>{handleFind()}} className="fa-solid fa-magnifying-glass"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="table-body">
                            <div className="table-body__service">
                                <div className="table-body__service__add">
                                    <button onClick={handleShowAddProduct}>Add Product</button>
                                </div>
                                <div className="table-body__service__search">
                                    <span>Search:</span>
                                    <input type="text" onChange={(e)=>{handleSearch(e)}}/>
                                </div>
                            </div>
                            <div className="table-body__table">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Product Name</th>
                                            <th>Brand Name</th>
                                            <th>Subcategory</th>
                                            <th>Price</th>
                                            <th>Status</th>
                                            <th className="function">Function</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {value.listProductBrand.map(item=>{
                                            return(
                                                <tr>
                                                    <td>{i++}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.brandName}</td>
                                                    <td>{item.subCategory}</td>
                                                    <td>{item.sellPrice}</td>
                                                    <td>{item.pStatus}</td>
                                                    <td className="function">
                                                        <a onClick={() => {
                                                            handleShowDetailProduct(item.id)
                                                        }} className="function__eye"><i className="fa-solid fa-eye"></i></a>
                                                        <a onClick={() => {
                                                            handleEditDetailProduct(item.id)
                                                        }} className="function__pencil"><i
                                                            className="fa-solid fa-pencil"></i></a>
                                                        <a onClick={() => {
                                                            handleRemoveDetailProduct(item.id)
                                                        }} className="function__trash"><i
                                                            className="fa-solid fa-trash"></i></a>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="footer">
                            <div>
                                <span>Showing 1 to 3 of entries</span>
                            </div>
                            <div>
                                <span>Previous</span>
                                <span className="page">1</span>
                                <span>Next</span>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal show={value.show} onHide={()=>{value.handleClose()}}>
                    <Modal.Header closeButton>
                        {showDetailProduct===1 && <Modal.Title>Detail Product</Modal.Title>}
                        {showDetailProduct===2 && <Modal.Title>Add Product</Modal.Title>}
                        {showDetailProduct===3 && <Modal.Title>Edit Product</Modal.Title>}
                    </Modal.Header>
                    <Modal.Body>
                        {showDetailProduct===1 && <DetailProduct handleUnMountDetailProduct={handleUnMountDetailProduct} idProductBrand={idProductBrand}/>}
                        {showDetailProduct===2 && <AddProduct handleUnMountDetailProduct={handleUnMountDetailProduct}/>}
                        {showDetailProduct===3 && <Updateproductdetail handleUnMountDetailProduct={handleUnMountDetailProduct} idProductBrand={idProductBrand}/>}
                    </Modal.Body>
                </Modal>
            </div>
        </>
    )
}

export default Home