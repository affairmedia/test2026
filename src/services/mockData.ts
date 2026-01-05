export const inventory = [
  { id: '1', name: 'Basmati Rice 5kg', quantity: 45, price: 12.99, category: 'Grains', status: 'In Stock' },
  { id: '2', name: 'Turmeric Powder 200g', quantity: 8, price: 3.50, category: 'Spices', status: 'Low Stock' },
  { id: '3', name: 'Red Lentils 2kg', quantity: 0, price: 5.99, category: 'Pulses', status: 'Out of Stock' },
  { id: '4', name: 'Coconut Milk 400ml', quantity: 120, price: 1.20, category: 'Canned', status: 'In Stock' },
  { id: '5', name: 'Mango Chutney', quantity: 15, price: 2.75, category: 'Condiments', status: 'In Stock' },
  { id: '6', name: 'Chickpeas 1kg', quantity: 30, price: 2.10, category: 'Pulses', status: 'In Stock' },
  { id: '7', name: 'Ghee 500g', quantity: 5, price: 8.50, category: 'Dairy', status: 'Low Stock' },
  { id: '8', name: 'Cumin Seeds 100g', quantity: 22, price: 1.99, category: 'Spices', status: 'In Stock' },
  { id: '9', name: 'Atta Flour 10kg', quantity: 12, price: 14.99, category: 'Grains', status: 'In Stock' },
  { id: '10', name: 'Coriander Bunch', quantity: 3, price: 0.99, category: 'Fresh', status: 'Low Stock' },
];

export const orders = [
  { id: 'ORD-001', supplier: 'Global Spices Ltd', status: 'Pending', date: '2023-10-25', amount: 450.00 },
  { id: 'ORD-002', supplier: 'Rice Masters', status: 'Completed', date: '2023-10-22', amount: 1200.50 },
  { id: 'ORD-003', supplier: 'Fresh Veggies Co', status: 'Processing', date: '2023-10-26', amount: 150.25 },
  { id: 'ORD-004', supplier: 'Dairy Delights', status: 'Pending', date: '2023-10-26', amount: 320.00 },
];

export const metrics = {
  inventoryCount: 1245,
  lowStockItems: 12,
  pendingOrders: 5,
  totalSuppliers: 8,
};

export const suppliers = [
  { id: '1', name: 'Global Spices Ltd', contact: 'Sam Spices', category: 'Spices' },
  { id: '2', name: 'Rice Masters', contact: 'Rick Rice', category: 'Grains' },
  { id: '3', name: 'Fresh Veggies Co', contact: 'Vicky Veg', category: 'Fresh' },
];
