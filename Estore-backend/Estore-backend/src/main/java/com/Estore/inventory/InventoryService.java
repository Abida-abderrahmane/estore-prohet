package com.Estore.inventory;

import com.Estore.exception.InsufficientStockException;
import com.Estore.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    public int getStockQuantity(Long productId) {
        return inventoryRepository.findByProductId(productId)
                .map(Inventory::getQuantity)
                .orElse(0);
    }

    public boolean isAvailable(Long productId, int requestedQuantity) {
        return getStockQuantity(productId) >= requestedQuantity;
    }

    @Transactional
    public void deductStock(Long productId, int quantityToDeduct) {
        Inventory inventory = inventoryRepository.findByProductId(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Inventory not found for product: " + productId));

        if (inventory.getQuantity() < quantityToDeduct) {
            throw new InsufficientStockException("Insufficient stock for product: " + productId);
        }

        inventory.setQuantity(inventory.getQuantity() - quantityToDeduct);
        inventoryRepository.save(inventory);
    }

    @Transactional
    public void addStock(Long productId, int quantityToAdd) {
        Inventory inventory = inventoryRepository.findByProductId(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Inventory not found for product: " + productId));

        inventory.setQuantity(inventory.getQuantity() + quantityToAdd);
        inventoryRepository.save(inventory);
    }

    @Transactional
    public void updateStock(Long productId, int newQuantity) {
        Inventory inventory = inventoryRepository.findByProductId(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Inventory not found for product: " + productId));

        inventory.setQuantity(newQuantity);
        inventoryRepository.save(inventory);
    }
}
