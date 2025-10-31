function createOrder(userId, productId, quantity, products) {
  if (!userId || !productId || quantity === undefined || quantity === null) {
    return { success: false, error: 'Missing required fields' };
  }

  if (quantity <= 0) {
    return { success: false, error: 'Invalid quantity' };
  }

  const product = products.find(p => p.id === productId);

  if (!product) {
    return { success: false, error: 'Product not found' };
  }

  if (product.stock < quantity) {
    return { success: false, error: 'Insufficient stock' };
  }

  product.stock -= quantity;

  const order = {
    id: 1,
    userId,
    productId,
    quantity,
    total: product.price * quantity,
    status: 'completed'
  };

  return { success: true, order };
}

describe('Order Service - Order Processing', () => {
  test('should create order with valid data', () => {
    const products = [
      { id: 1, name: 'Laptop', price: 999.99, stock: 10 }
    ];
    const result = createOrder(1, 1, 2, products);
    expect(result.success).toBe(true);
    expect(result.order.userId).toBe(1);
    expect(result.order.quantity).toBe(2);
    expect(result.order.total).toBe(1999.98);
  });

  test('should reject order with insufficient stock', () => {
    const products = [
      { id: 1, name: 'Laptop', price: 999.99, stock: 3 }
    ];
    const result = createOrder(1, 1, 5, products);
    expect(result.success).toBe(false);
    expect(result.error).toBe('Insufficient stock');
  });

  test('should reject order with invalid quantity', () => {
    const products = [
      { id: 1, name: 'Laptop', price: 999.99, stock: 10 }
    ];
    const result = createOrder(1, 1, 0, products);
    expect(result.success).toBe(false);
    expect(result.error).toBe('Invalid quantity');
  });
});
