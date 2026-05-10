package com.Estore.review;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "reviews")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review {

    @Id
    private String id;

    private Long productId;
    private Long userId;
    private String authorName;
    private Integer rating;
    private String comment;

    @CreatedDate
    private LocalDateTime createdAt;
}
