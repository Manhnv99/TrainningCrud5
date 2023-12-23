package com.example.trainingcrud.serviceImpl;

import com.example.trainingcrud.model.Product;
import com.example.trainingcrud.repository.ProductRepository;
import com.example.trainingcrud.repository.StatusRepository;
import com.example.trainingcrud.repository.SubCategoryRepository;
import com.example.trainingcrud.request.ProductRequest;
import com.example.trainingcrud.response.ProductResponse;
import com.example.trainingcrud.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private SubCategoryRepository subCategoryRepository;

    @Autowired
    private StatusRepository statusRepository;



    @Override
    public ProductResponse add(ProductRequest productRequest) {
        Product product=new Product();
        product.setProductName(productRequest.getProductName());
        product.setColor(productRequest.getColor());
        product.setQuantity(productRequest.getQuantity());
        product.setSellPrice(productRequest.getSellPrice());
        product.setOriginPrice(productRequest.getOriginPrice());
        product.setDescription(productRequest.getDescription());
        product.setSubCategory(subCategoryRepository.getReferenceById(productRequest.getIdSubcate()));
        product.setStatus(statusRepository.getReferenceById(productRequest.getIdStatus()));
        Product p=productRepository.save(product);
        return new ProductResponse(p.getId(),p.getProductName(),p.getColor(),p.getQuantity(),p.getSellPrice(),
                p.getOriginPrice(),p.getDescription(),p.getSubCategory().getSubCateName(),p.getStatus().getStatusName());
    }

    @Override
    public List<ProductResponse> getAll() {
        return productRepository.getAll();
    }

    @Override
    public ProductResponse deleteById(Long id) {
        Product p=productRepository.getReferenceById(id);
        productRepository.deleteById(id);
        return new ProductResponse(p.getId(),p.getProductName(),p.getColor(),p.getQuantity(),p.getSellPrice(),
                p.getOriginPrice(),p.getDescription(),p.getSubCategory().getSubCateName(),p.getStatus().getStatusName());
    }

    @Override
    public ProductResponse updateProduct(Long id, ProductRequest productRequest) {
        Product product=productRepository.getReferenceById(id);
        product.setProductName(productRequest.getProductName());
        product.setColor(productRequest.getColor());
        product.setQuantity(productRequest.getQuantity());
        product.setSellPrice(productRequest.getSellPrice());
        product.setOriginPrice(productRequest.getOriginPrice());
        product.setDescription(productRequest.getDescription());
        product.setSubCategory(subCategoryRepository.getReferenceById(productRequest.getIdSubcate()));
        product.setStatus(statusRepository.getReferenceById(productRequest.getIdStatus()));
        Product p=productRepository.save(product);
        return new ProductResponse(p.getId(),p.getProductName(),p.getColor(),p.getQuantity(),p.getSellPrice(),
                p.getOriginPrice(),p.getDescription(),p.getSubCategory().getSubCateName(),p.getStatus().getStatusName());
    }

    @Override
    public List<ProductResponse> getById(Long id) {
        return productRepository.getAllById(id);
    }
}
