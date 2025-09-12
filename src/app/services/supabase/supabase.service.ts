import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

import { Order } from '../../models/order.model';
import { Shirt } from '../../models/shirts.model';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient

  constructor() {
    this.supabase = createClient(environment.SUPABASE_URL, environment.SUPABASE_ANON_KEY,
      { auth: { persistSession: false } }
    );
  }

  async createOrder(
    orderData: Omit<Order, 'id' | 'shirts' | 'created_at'>,
    shirts: Omit<Shirt, 'id'>[]
  ) {
    try {
      const orderId = uuidv4();

      // Inserir pedido
      const { error: orderError } = await this.supabase
        .from('orders')
        .insert([{ ...orderData, id: orderId }]);
      if (orderError) throw orderError;

      // Inserir camisetas
      const shirtsWithOrderId = shirts.map(shirt => ({
        ...shirt,
        order_id: orderId
      }));
      const { error: shirtsError } = await this.supabase
        .from('shirts')
        .insert(shirtsWithOrderId);
      if (shirtsError) throw shirtsError;

      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  }
}
