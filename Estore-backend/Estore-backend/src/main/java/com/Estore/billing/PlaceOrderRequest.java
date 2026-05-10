package com.Estore.billing;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PlaceOrderRequest {
    @NotNull(message = "User ID is required")
    private Long userId;
}
