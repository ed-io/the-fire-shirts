import { environment } from "../../../environments/environment";

export const SUPABASE_CONFIG = {
  url: environment.SUPABASE_URL,
  anonKey: environment.SUPABASE_ANON_KEY,
};

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
