import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../core/language.service';
import { PROFILE } from '../../core/profile';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type TextField = 'name' | 'email' | 'message';
type SendStatus = 'idle' | 'sending' | 'success' | 'error';

const MAIL_ENDPOINT = 'sendMail.php';

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
    website: [''],
  });

  protected readonly status = signal<SendStatus>('idle');

  protected readonly focused = signal<TextField | null>(null);

  /** Whether a field shows its error: only once it has been left (blur), never while typing. */
  protected showError(field: TextField | 'privacy'): boolean {
    const control = this.form.controls[field];
    return control.invalid && control.touched && this.focused() !== field;
  }

  /** Sends the form as JSON to the PHP mail endpoint and shows success or error feedback.
   *  On error the input is kept so the visitor can simply try again. */
  protected async onSubmit(): Promise<void> {
    if (this.form.invalid || this.status() === 'sending') return;
    this.status.set('sending');

    const { name, email, message, website } = this.form.getRawValue();
    try {
      const response = await fetch(MAIL_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, website }),
      });
      const result: { ok?: boolean } = await response.json();
      if (!response.ok || !result.ok) throw new Error(`Mail endpoint answered ${response.status}`);

      this.form.reset();
      this.status.set('success');
    } catch (error) {
      console.error(error);
      this.status.set('error');
    }
  }
}
