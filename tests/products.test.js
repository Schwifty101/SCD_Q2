function updateProductStock(product, quantity) {
  if (quantity < 0) {
    return { success: false, error: 'Stock cannot be negative' };
  }
  product.stock = quantity;
  return { success: true, product };
}

function identifyLowStockProducts(products) {
  return products.filter(product => product.stock < product.minStock);
}

describe('Product Service - Product Data Validation', () => {
  test('should update product stock correctly', () => {
    const product = { id: 1, name: 'Laptop', stock: 10, minStock: 5 };
    const result = updateProductStock(product, 15);
    expect(result.success).toBe(true);
    expect(result.product.stock).toBe(15);
  });

  test('should reject negative stock', () => {
    const product = { id: 1, name: 'Laptop', stock: 10, minStock: 5 };
    const result = updateProductStock(product, -5);
    expect(result.success).toBe(false);
    expect(result.error).toBe('Stock cannot be negative');
  });

  test('should identify low stock products', () => {
    const products = [
      { id: 1, name: 'Laptop', stock: 10, minStock: 5 },
      { id: 2, name: 'Mouse', stock: 3, minStock: 10 },
      { id: 3, name: 'Keyboard', stock: 2, minStock: 8 }
    ];
    const lowStockProducts = identifyLowStockProducts(products);
    expect(lowStockProducts.length).toBe(2);
    expect(lowStockProducts[0].name).toBe('Mouse');
    expect(lowStockProducts[1].name).toBe('Keyboard');
  });
});
