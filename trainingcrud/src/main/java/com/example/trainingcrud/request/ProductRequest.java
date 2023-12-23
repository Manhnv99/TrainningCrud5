package com.example.trainingcrud.request;

import com.example.trainingcrud.model.SubCategory;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductRequest {

    @NotNull(message = "Không được bỏ trống!")
    private String productName;

    @NotNull(message = "Không được bỏ trống!")
    private String color;

    @NotNull(message = "Không được bỏ trống!")
    @Min(value = 1,message = "Số lượng phải lớn hơn 0")
    private Long quantity;

    @NotNull(message = "Không được bỏ trống!")
    private Double sellPrice;

    @NotNull(message = "Không được bỏ trống!")
    private Double originPrice;

    @NotNull(message = "Không được bỏ trống!")
    private String description;

    @NotNull(message = "Không được bỏ trống!")
    private Long idSubcate;

    @NotNull(message = "Không được bỏ trống!")
    private Long idStatus;

}
