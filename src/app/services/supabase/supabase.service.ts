import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

import { Order } from '../../models/order.model';
import { Shirt } from '../../models/shirts.model';


@Injectable({ 
  providedIn: 'root' 
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env['NG_APP_SUPABASE_URL']!;
    const supabaseAnonKey = process.env['NG_APP_SUPABASE_ANON_KEY']!;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase URL ou anon key não definidas nas variáveis de ambiente');
    }

    this.supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false }
    });
  }

  /**
   * Cria um pedido com as camisetas associadas
   * @param orderData Dados do pedido (sem id, shirts ou created_at)
   * @param shirts Array de camisetas (sem id)
   */
  async createOrder(
    orderData: Omit<Order, 'id' | 'shirts' | 'created_at'>,
    shirts: Omit<Shirt, 'id'>[]
  ): Promise<{ success: boolean; error?: any }> {
    try {
      const orderId = uuidv4();

      // Inserir pedido
      const { error: orderError } = await this.supabase
        .from('orders')
        .insert([{ ...orderData, id: orderId }]);
      if (orderError) throw orderError;

      // Inserir camisetas associadas
      const shirtsWithOrderId = shirts.map(shirt => ({
        ...shirt,
        order_id: orderId
      }));

      if (shirtsWithOrderId.length > 0) {
        const { error: shirtsError } = await this.supabase
          .from('shirts')
          .insert(shirtsWithOrderId);
        if (shirtsError) throw shirtsError;
      }

      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  }
}