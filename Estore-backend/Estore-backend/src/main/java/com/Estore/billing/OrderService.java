package com.Estore.billing;

import com.Estore.customer.UserRepository;
import com.Estore.exception.ResourceNotFoundException;
import com.Estore.inventory.InventoryService;
import com.Estore.shopping.Cart;
import com.Estore.shopping.CartItem;
import com.Estore.shopping.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final InventoryService inventoryService;

    @Transactional
    public OrderDTO placeOrder(PlaceOrderRequest request) {
        // 1. Fetch Cart
        Cart cart = cartRepository.findByUserId(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found for user: " + request.getUserId()));

        // 2. Validate Cart not empty
        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Cannot place order with an empty cart");
        }

        // 3. Validate and Deduct Stock
        for (CartItem item : cart.getItems()) {
            if (!inventoryService.isAvailable(item.getProduct().getId(), item.getQuantity())) {
                throw new RuntimeException("Insufficient stock for product: " + item.getProduct().getName());
            }
        }

        // Deduct stock after validation
        for (CartItem item : cart.getItems()) {
            inventoryService.deductStock(item.getProduct().getId(), item.getQuantity());
        }

        // 4. Create Order
        BigDecimal totalAmount = cart.getItems().stream()
                .map(item -> item.getUnitPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Order order = Order.builder()
                .user(cart.getUser())
                .orderDate(LocalDateTime.now())
                .totalAmount(totalAmount)
                .status(OrderStatus.PENDING)
                .build();

        // 5. Create OrderItems
        List<OrderItem> orderItems = cart.getItems().stream()
                .map(cartItem -> OrderItem.builder()
                        .order(order)
                        .product(cartItem.getProduct())
                        .quantity(cartItem.getQuantity())
                        .unitPrice(cartItem.getUnitPrice())
                        .build())
                .collect(Collectors.toList());

        order.setItems(orderItems);

        Order savedOrder = orderRepository.save(order);

        // 6. Clear Cart
        cart.getItems().clear();
        cartRepository.save(cart);

        return mapToDTO(savedOrder);
    }

    public List<OrderDTO> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserIdOrderByOrderDateDesc(userId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private OrderDTO mapToDTO(Order order) {
        return OrderDTO.builder()
                .id(order.getId())
                .userId(order.getUser().getId())
                .orderDate(order.getOrderDate())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus().name())
                .items(order.getItems().stream().map(item -> OrderItemDTO.builder()
                        .productId(item.getProduct().getId())
                        .productName(item.getProduct().getName())
                        .quantity(item.getQuantity())
                        .unitPrice(item.getUnitPrice())
                        .subTotal(item.getUnitPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                        .build()).collect(Collectors.toList()))
                .build();
    }
}
