// Supabase configuration for future integration
export const SUPABASE_CONFIG = {
  url: 'YOUR_SUPABASE_URL',
  anonKey: 'YOUR_SUPABASE_ANON_KEY',
  // Add other configuration options as needed
};

// Database table schemas (for reference)
export interface DatabaseSchema {
  orders: {
    id: string;
    full_name: string;
    phone: string;
    payment_method: string;
    created_at: string;
    updated_at: string;
  };

  shirts: {
    id: string;
    order_id: string;
    color: string;
    size: string;
    bust_cm?: number;
    waist_cm?: number;
    hips_cm?: number;
    length_cm?: number;
    created_at: string;
  };
}

// Example queries for future implementation
export const SUPABASE_QUERIES = {
  // Get all orders with shirts
  getOrdersWithShirts: `
    SELECT
      o.*,
      json_agg(
        json_build_object(
          'id', s.id,
          'color', s.color,
          'size', s.size,
          'bust_cm', s.bust_cm,
          'waist_cm', s.waist_cm,
          'hips_cm', s.hips_cm,
          'length_cm', s.length_cm
        )
      ) as shirts
    FROM orders o
    LEFT JOIN shirts s ON o.id = s.order_id
    GROUP BY o.id
    ORDER BY o.created_at DESC
  `,

  // Create new order
  createOrder: `
    INSERT INTO orders (full_name, phone, payment_method)
    VALUES ($1, $2, $3)
    RETURNING id
  `,

  // Create shirts for an order
  createShirts: `
    INSERT INTO shirts (order_id, color, size, bust_cm, waist_cm, hips_cm, length_cm)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
  `
};
