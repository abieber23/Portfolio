import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../core/language.service';
import { PROFILE } from '../../core/profile';

/** Stricter than Validators.email: also requires a top-level domain ("name@host.de"). */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type TextField = 'name' | 'email' | 'message';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  protected readonly language = inject(LanguageService);
  protected readonly profile = PROFILE;

  protected readonly form = inject(NonNullableFormBuilder).group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
    message: ['', Validators.required],
    privacy: [false, Validators.requiredTrue],
  });

  /** Field currently being edited – its error stays hidden so we never validate while typing. */
  protected readonly focused = signal<TextField | null>(null);

  /** Errors only appear once a field has been left (blur), never while the user is typing. */
  protected showError(field: TextField | 'privacy'): boolean {
    const control = this.form.controls[field];
    return control.invalid && control.touched && this.focused() !== field;
  }

  protected onSubmit(): void {
    if (this.form.invalid) return;
    // TODO: send the message (backend/mail service) and show success/error feedback
  }
}
