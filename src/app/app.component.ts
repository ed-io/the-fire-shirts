import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { DomSanitizer } from '@angular/platform-browser';

import { SuccessModalComponent } from './modals/success-modal.component';
import { ImageModalComponent } from './modals/image-modal.component';
import { SupabaseService } from './services/supabase/supabase.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SuccessModalComponent,
    ImageModalComponent,
    NgxMaskDirective,
  ],
  providers: [provideNgxMask()],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  orderForm: FormGroup;
  showValidation = false;
  showSuccessModal = false;
  showImageModal = false;
  currentImageIndex = 0;
  shirtPrice = 50; // Preço de cada camiseta
  isSubmitting = false; // Loading state

  // Dados das imagens das camisetas
  shirtImages = [
    {
      src: '/images/off-white-shirt.jpg',
      alt: 'Camiseta Off White - Conferência The Fire',
      title: 'Off White',
      description: 'Cor clássica e versátil, perfeita para qualquer ocasião'
    },
    {
      src: '/images/black-shirt.jpg',
      alt: 'Camiseta Preta - Conferência The Fire',
      title: 'Preto',
      description: 'Elegante e sofisticada, ideal para looks modernos'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private supabaseService: SupabaseService
  ) {
    this.orderForm = this.fb.group({
      full_name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.minLength(11)]],
      payment_method: ['', Validators.required],
      payment_date: ['', Validators.required],
      shirts: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.addShirt();
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  // Getter para acessar o FormArray de camisetas
  get shirtsArray(): FormArray<FormGroup> {
    return this.orderForm.get('shirts') as FormArray<FormGroup>;
  }

  // Getter para acessar os controles individuais
  get fullNameControl() {
    return this.orderForm.get('full_name');
  }

  get phoneControl() {
    return this.orderForm.get('phone');
  }

  get paymentMethodControl() {
    return this.orderForm.get('payment_method');
  }

  get paymentDateControl() {
    return this.orderForm.get('payment_date');
  }

  // Getter para calcular o valor total
  get totalPrice(): number {
    return this.shirtsArray.length * this.shirtPrice;
  }

  addShirt() {
    if (this.shirtsArray.length < 5) {
      const shirtGroup = this.fb.group({
        id: [this.generateId()],
        color: ['', Validators.required],
        size: ['', Validators.required],
        bust_cm: [null],
        waist_cm: [null],
        hips_cm: [null],
        length_cm: [null],
      });

      this.shirtsArray.push(shirtGroup);
    }
  }

  removeShirt(index: number) {
    if (this.shirtsArray.length > 1) {
      this.shirtsArray.removeAt(index);
    }
  }

  // Sanitiza inputs de texto para evitar XSS
  sanitizeInput(input: string): string {
    if (!input) return '';

    // Remove tags HTML e scripts
    const cleanInput = input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<[^>]*>/g, '')
      .trim();

    return cleanInput;
  }

  // Sanitiza número para evitar injeção
  sanitizeNumber(value: any): number | null {
    if (value === null || value === undefined || value === '') {
      return null;
    }

    const num = Number(value);
    return isNaN(num) || num <= 0 ? null : num;
  }

  // Validação dos dados do cliente
  private validateCustomerData(): boolean {
    const fullName = this.fullNameControl?.value;
    const phone = this.phoneControl?.value;
    const paymentMethod = this.paymentMethodControl?.value;
    const paymentDate = this.paymentDateControl?.value;

    if (!fullName || !this.sanitizeInput(fullName)) {
      return false;
    }

    if (!phone || !this.sanitizeInput(phone)) {
      return false;
    }

    if (!paymentMethod) {
      return false;
    }

    if (!paymentDate) {
      return false;
    }

    return true;
  }

  // Validação das camisetas
  private validateShirts(): boolean {
    const shirts = this.shirtsArray.controls;

    for (let i = 0; i < shirts.length; i++) {
      const shirt = shirts[i];
      const color = shirt.get('color')?.value;
      const size = shirt.get('size')?.value;

      if (!color) {
        return false;
      }

      if (!size) {
        return false;
      }

      // Validação para tamanhos personalizados
      if (size === 'Custom') {
        const bust = this.sanitizeNumber(shirt.get('bust_cm')?.value);
        const waist = this.sanitizeNumber(shirt.get('waist_cm')?.value);
        const hips = this.sanitizeNumber(shirt.get('hips_cm')?.value);
        const length = this.sanitizeNumber(shirt.get('length_cm')?.value);

        if (!bust || !waist || !hips || !length) {
          return false;
        }
      }
    }

    return true;
  }

  // Verifica se o formulário pode ser enviado
  canSubmitOrder(): boolean {
    return (
      this.orderForm.valid &&
      this.validateCustomerData() &&
      this.validateShirts()
    );
  }

  // Atualiza validação quando o tamanho muda
  onSizeChange(index: number) {
    const shirtGroup = this.shirtsArray.at(index);
    const size = shirtGroup.get('size')?.value;

    if (size === 'Custom') {
      shirtGroup
        .get('bust_cm')
        ?.setValidators([Validators.required, Validators.min(1)]);
      shirtGroup
        .get('waist_cm')
        ?.setValidators([Validators.required, Validators.min(1)]);
      shirtGroup
        .get('hips_cm')
        ?.setValidators([Validators.required, Validators.min(1)]);
      shirtGroup
        .get('length_cm')
        ?.setValidators([Validators.required, Validators.min(1)]);
    } else {
      shirtGroup.get('bust_cm')?.clearValidators();
      shirtGroup.get('waist_cm')?.clearValidators();
      shirtGroup.get('hips_cm')?.clearValidators();
      shirtGroup.get('length_cm')?.clearValidators();
    }

    shirtGroup.get('bust_cm')?.updateValueAndValidity();
    shirtGroup.get('waist_cm')?.updateValueAndValidity();
    shirtGroup.get('hips_cm')?.updateValueAndValidity();
    shirtGroup.get('length_cm')?.updateValueAndValidity();
  }

  async createOrder() {
    try {
      this.isSubmitting = true; // Iniciar loading
      this.showValidation = true;
      this.orderForm.markAllAsTouched();

      if (!this.canSubmitOrder()) {
        this.isSubmitting = false; // Parar loading se validação falhar
        return;
      }

      const formValue = this.orderForm.value;
      
      // Converter "now" para data atual se necessário
      let paymentDate = formValue.payment_date;
      if (paymentDate === 'now') {
        paymentDate = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
      }
      
      const sanitizedOrder = {
        full_name: this.sanitizeInput(formValue.full_name),
        phone: this.sanitizeInput(formValue.phone),
        payment_method: formValue.payment_method,
        payment_date: paymentDate,
      };

      const sanitizedShirts = formValue.shirts.map((shirt: any) => ({
        color: shirt.color,
        size: shirt.size,
        bust_cm: this.sanitizeNumber(shirt.bust_cm),
        waist_cm: this.sanitizeNumber(shirt.waist_cm),
        hips_cm: this.sanitizeNumber(shirt.hips_cm),
        length_cm: this.sanitizeNumber(shirt.length_cm),
      }));

      // Salvar no Supabase
      const { success, error } = await this.supabaseService.createOrder(sanitizedOrder, sanitizedShirts);
      
      if (error) {
        alert('Erro ao salvar pedido. Tente novamente.');
        this.isSubmitting = false; // Parar loading em caso de erro
        return;
      }

      this.orderForm.reset();
      this.shirtsArray.clear();
      this.addShirt();
      this.showValidation = false;

      // Mostrar modal de sucesso
      this.showSuccessModal = true;
    } catch (error) {
      // Erro silencioso - apenas o alert do Supabase será exibido
      this.isSubmitting = false; // Parar loading em caso de erro
    } finally {
      this.isSubmitting = false; // Garantir que o loading pare
    }
  }

  closeSuccessModal() {
    this.showSuccessModal = false;
  }

  trackByShirtId(index: number, item: any): string {
    return item.get('id')?.value || index;
  }


  // Métodos para controlar o modal de imagem
  openImageModal(index: number) {
    this.currentImageIndex = index;
    this.showImageModal = true;
  }

  closeImageModal() {
    this.showImageModal = false;
  }

  previousImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    } else {
      this.currentImageIndex = this.shirtImages.length - 1;
    }
  }

  nextImage() {
    if (this.currentImageIndex < this.shirtImages.length - 1) {
      this.currentImageIndex++;
    } else {
      this.currentImageIndex = 0;
    }
  }

  get currentImage() {
    return this.shirtImages[this.currentImageIndex] || this.shirtImages[0];
  }
}
