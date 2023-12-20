package com.example.trainingcrud.repository;

import com.example.trainingcrud.model.ProductBrand;
import com.example.trainingcrud.response.ProductBrandResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductBrandRepository extends JpaRepository<ProductBrand,Long> {

    @Query("""
            select new com.example.trainingcrud.response.ProductBrandResponse(
                pb.id,p.productName,p.color,p.quantity,p.sellPrice,p.originPrice,b.brandName,subCate.subCateName,status.statusName
            )
            from ProductBrand pb,Product p,Brand b,SubCategory subCate,Status status where
             pb.brand.id=b.id and pb.product.id=p.id and p.subCategory.id=subCate.id and p.status.id=status.id
            """)
    List<ProductBrandResponse> getAll();

    @Query("""
            select new com.example.trainingcrud.response.ProductBrandResponse(
                pb.id,p.productName,p.color,p.quantity,p.sellPrice,p.originPrice,b.brandName,subCate.subCateName,status.statusName
            )
            from ProductBrand pb,Product p,Brand b,SubCategory subCate,Status status where
             pb.brand.id=b.id and pb.product.id=p.id and p.subCategory.id=subCate.id and p.status.id=status.id and pb.id=?1
            """)
    ProductBrandResponse getProductBrandById(Long id);


    @Query("""
             select new com.example.trainingcrud.response.ProductBrandResponse(
                pb.id,p.productName,p.color,p.quantity,p.sellPrice,p.originPrice,b.brandName,subCate.subCateName,status.statusName
            )
            from ProductBrand pb,Product p,Brand b,SubCategory subCate,Status status where
             pb.brand.id=b.id and pb.product.id=p.id and p.subCategory.id=subCate.id and p.status.id=status.id 
             and (p.productName like %?1% or p.sellPrice= ?2 or b.brandName like %?3% or subCate.subCateName like %?4%  or status.statusName like %?5%)
            """)
    List<ProductBrandResponse> findByAll(String name,Double price,String brandName,String cateName,String statusName);


    @Query("""
             select new com.example.trainingcrud.response.ProductBrandResponse(
                pb.id,p.productName,p.color,p.quantity,p.sellPrice,p.originPrice,b.brandName,subCate.subCateName,status.statusName
            )
            from ProductBrand pb,Product p,Brand b,SubCategory subCate,Status status where
             pb.brand.id=b.id and pb.product.id=p.id and p.subCategory.id=subCate.id and p.status.id=status.id 
             and (p.productName LIKE concat('%',:query,'%') Or b.brandName like concat('%',:query,'%') or subCate.subCateName like concat('%',:query,'%')  or status.statusName like concat('%',:query,'%'))
            """)
    List<ProductBrandResponse> searchByAll(String query);
}
