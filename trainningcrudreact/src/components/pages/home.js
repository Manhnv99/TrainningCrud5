import '../scss/home.scss'
import {useState, useContext, useEffect} from "react";
import Modal from 'react-bootstrap/Modal';
import AddProduct from "./addproductdetail";
import DetailProduct from "./productdetail";
import {Context} from "../provider/contextprovider";
import Updateproductdetail from "./updateproductdetail";
import productbrandservice from "../services/productbrandservice";
import productservice from "../services/productservice";
import Loading from "./loading";
import debounce from 'lodash.debounce'


const Home=()=>{
    // get value from contextprovider
    const value=useContext(Context);
    const [showDetailProduct,setShowDetailProduct]=useState(0);
    const [idProduct,setIdProduct]=useState('')
    const [idBrand,setIdBrand]=useState('')
    const [pname,setPname]=useState('')
    const [price,setPrice]=useState('')
    const [brandName,setBrandName]=useState('')
    const [cateName,setCateName]=useState('')
    const [statusName,setStatusName]=useState('')
    const [loading,setLoading]=useState(false)
    const [currentPage,setCurrentPage]=useState(1)
    const [whatAction,setWhatAction]=useState('none')
    const [dataSearch,setDataSearch]=useState('')


    let i=1;

    const movePage=(i)=>{
        value.setPage(i,whatAction,dataSearch,pname,price,brandName,cateName,statusName);
        setCurrentPage(i);
        let active=document.querySelectorAll('.page')
        for(let i =0;i<active.length;i++){
            active[i].className='page'
        }
        active[i-1].className='page active'
    }

    const movePagePre=()=>{
        let page;
        if(currentPage===1){
            page=value.totalPages.length;
        }else{
            page=currentPage-1;
        }
        value.setPage(page,whatAction,dataSearch,pname,price,brandName,cateName,statusName);
        setCurrentPage(page);
        let active=document.querySelectorAll('.page')
        for(let i =0;i<active.length;i++){
            active[i].className='page'
        }
        active[page-1].className='page active'
    }

    const movePageNext=()=>{
        let page;
        if(currentPage===value.totalPages.length){
            page=1;
        }else{
            page=currentPage+1;
        }
        value.setPage(page,whatAction,dataSearch,pname,price,brandName,cateName,statusName);
        setCurrentPage(page);
        let active=document.querySelectorAll('.page')
        for(let i =0;i<active.length;i++){
            active[i].className='page'
        }
        active[page-1].className='page active'
    }

    const handleSearch= async  (e)=>{
        await value.showDataSearch(e.target.value,1);
        await setDataSearch(e.target.value)
        await setWhatAction('search')
        document.querySelectorAll('.page')[0].classList.add('active')
    }


    const handleFind=async ()=>{
        await value.showDataFind(pname,price,brandName,cateName,statusName,1);
        await setWhatAction('find')
        document.querySelectorAll('.page')[0].classList.add('active')
    }

    const handleShowDetailProductBrand=async (productId,brandId)=>{
        await setShowDetailProduct(1);
        await setIdProduct(productId);
        await setIdBrand(brandId)
        await value.handleShow();
    }

    const handleShowAddProduct= async ()=>{
        await setShowDetailProduct(2);
        await value.handleShow();
    }

    const handleUpdateDetailProduct=async (productId,brandId)=>{
        await setShowDetailProduct(3);
        await setIdProduct(productId);
        await setIdBrand(brandId)
        await value.handleShow();
    }



    const handleDeleteProductBrand=(productId,brandId)=>{
        setLoading(true)
        setTimeout(async ()=>{
            let productBrand={
                brandIdEdit:null,
                productId:productId,
                brandId:brandId
            }
            await productbrandservice.deleteProductBrand(productBrand).then(res=>{
                productservice.removeProductById(productId);
                // value.updateDataDelete(res.data);
            });
            await value.setPage(currentPage);
            await value.totalPage();
            await setLoading(false);
            await value.showToastMessage('Xóa Sản Phẩm Thành Công!')
        },1500)
    }

    const handleUnMountDetailProduct=()=>{
        setShowDetailProduct(0);
    }





    return (
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
                                        {value.listStatus.map((item,index)=>{
                                            return(
                                                <option key={index}>{item.statusName}</option>
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
                                        {value.listProductBrand.map((item,index)=>{
                                            return(
                                                <tr>
                                                    <td key={index}>{i++}</td>
                                                    <td key={index+1}>{item.name}</td>
                                                    <td key={index+2}>{item.brandName}</td>
                                                    <td key={index+3}>{item.subCategory}</td>
                                                    <td key={index+4}>{item.sellPrice}</td>
                                                    <td key={index+5}>{item.pStatus}</td>
                                                    <td className="function" key={index+6}>
                                                        <a onClick={()=>{handleShowDetailProductBrand(item.productId,item.brandId)}} className="function__eye"><i className="fa-solid fa-eye"></i></a>
                                                        <a onClick={()=>{handleUpdateDetailProduct(item.productId,item.brandId)}} className="function__pencil"><i className="fa-solid fa-pencil"></i></a>
                                                        <a onClick={()=>{handleDeleteProductBrand(item.productId,item.brandId)}} className="function__trash"><i className="fa-solid fa-trash"></i></a>
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
                                <span className="director" onClick={()=>{movePagePre()}}>Previous</span>
                                {
                                    value.totalPages.map(item=>{
                                        if(item===1){
                                            return (
                                                <span className="page active" onClick={() => {movePage(item)}}>{item}</span>
                                            )
                                        }else{
                                            return (
                                                <span className="page" onClick={() => {movePage(item)}}>{item}</span>
                                            )
                                        }
                                    })
                                }
                                <span className="director" onClick={()=>{movePageNext()}}>Next</span>
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
                        {showDetailProduct===2 && <AddProduct handleUnMountDetailProduct={handleUnMountDetailProduct} currentPage={currentPage}/>}
                        {showDetailProduct===1 && <DetailProduct idProduct={idProduct} idBrand={idBrand} handleUnMountDetailProduct={handleUnMountDetailProduct}/>}
                        {showDetailProduct===3 && <Updateproductdetail handleUnMountDetailProduct={handleUnMountDetailProduct} idProduct={idProduct} idBrand={idBrand}/>}
                    </Modal.Body>
                </Modal>
            </div>
        </>
    )
}

export default Home