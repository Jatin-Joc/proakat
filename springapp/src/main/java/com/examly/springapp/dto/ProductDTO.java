package com.examly.springapp.dto;
 
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;
 
 
@Data
public class ProductDTO {
    private long productId;
 
    @NotBlank(message = "Product name cannot be blank")
    @Size(max = 100, message = "Product name cannot exceed 100 characters")
    @Pattern(regexp = "^[a-zA-Z0-9\\s]+$", message = "Product name can only contain letters, numbers, and spaces")
    private String productName;
 
    @NotBlank(message = "Description cannot be blank")
    @Size(max = 300, message = "Description cannot exceed 300 characters")
    @Pattern(regexp = "^[a-zA-Z0-9,!.\\s]+$", message = "Description can only contain letters, numbers, ',', '.', '!' and spaces")
    private String description;
 
    @NotNull(message = "Price cannot be null")
    @Positive(message = "Price must be positive")
    private Double price;
 
    @NotNull(message = "Stock quantity cannot be null")
    @Positive(message = "Stock quantity must be positive")
    private int stockQuantity;
 
    @NotBlank(message = "Category cannot be blank")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Category can only contain letters and spaces")
    private String category;
 
    @NotBlank(message = "Brand cannot be blank")
    @Pattern(regexp = "^[a-zA-Z0-9\\s]+$", message = "Brand can only contain letters, numbers, and spaces")
    private String brand;
 
    //@NotBlank(message = "Cover Image cannot be blank")
    //@Lob
    private String coverImage;
}