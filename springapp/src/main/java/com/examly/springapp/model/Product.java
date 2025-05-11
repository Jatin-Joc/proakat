package com.examly.springapp.model;
 
import java.util.List;
 
import com.fasterxml.jackson.annotation.JsonBackReference;
 
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
 
@Entity
@Table(name = "product")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
   
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private long productId;
 
    @Column(name = "product_name")
    private String productName;
 
    @Column(name = "description")
    private String description;
 
    @Column(name = "price")
    private double price;
 
    @Column(name = "stock_quantity")
    private int stockQuantity;
 
    @Column(name = "category")
    private String category;
 
    @Column(name="brand")
    private String brand;
 
    @Lob
    @Column(columnDefinition ="LONGTEXT")
    private String coverImage;
 
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<OrderItem> orderItems;
 
    @OneToMany(mappedBy = "product",cascade = CascadeType.ALL)
    @JsonBackReference
    @ToString.Exclude
    private List<Review> reviews;
}