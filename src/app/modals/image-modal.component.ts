import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      *ngIf="isVisible" 
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 transition-opacity duration-300"
      (click)="closeModal()"
    >
      <div 
        class="relative max-w-4xl max-h-[90vh] mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
        (click)="$event.stopPropagation()"
      >
        <!-- Close Button -->
        <button
          (click)="closeModal()"
          class="absolute top-4 right-4 z-10 w-10 h-10 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-200 flex items-center justify-center"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <!-- Image -->
        <div class="relative">
          <img 
            [src]="imageSrc" 
            [alt]="imageAlt"
            class="w-full h-auto max-h-[80vh] object-contain"
            loading="lazy"
          >
          
          <!-- Image Info Overlay -->
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
            <h3 class="text-white text-xl font-semibold mb-2">{{ imageTitle }}</h3>
            <p class="text-white text-sm opacity-90">{{ imageDescription }}</p>
          </div>
        </div>

        <!-- Navigation Arrows (if multiple images) -->
        <button
          *ngIf="showNavigation"
          (click)="previousImage()"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-200 flex items-center justify-center"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>

        <button
          *ngIf="showNavigation"
          (click)="nextImage()"
          class="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-200 flex items-center justify-center"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .fixed {
      backdrop-filter: blur(4px);
    }
  `]
})
export class ImageModalComponent {
  @Input() isVisible = false;
  @Input() imageSrc = '';
  @Input() imageAlt = '';
  @Input() imageTitle = '';
  @Input() imageDescription = '';
  @Input() showNavigation = false;
  @Input() currentIndex = 0;
  @Input() images: any[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() previous = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

  previousImage() {
    this.previous.emit();
  }

  nextImage() {
    this.next.emit();
  }
}
