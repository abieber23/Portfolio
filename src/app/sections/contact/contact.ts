import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../core/language.service';
import { PROFILE } from '../../core/profile';
import { Reveal } from '../../shared/reveal/reveal';

/** Local part without leading/trailing/double dots, then one or more domain labels and a TLD of 2+ letters. */
const EMAIL_PATTERN =
  /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;

/** At least two letters; words of letters joined by spaces, hyphens, apostrophes or dots (e.g. "Jean-Luc O'Neil", "Dr. Müller"). */
const NAME_PATTERN = /^(?=(?:.*\p{L}){2})[\p{L}\p{M}]+(?:[ '’.-]+[\p{L}\p{M}]+)*\.?$/u;

/** Minimum number of characters for the message (spaces at the start/end don't count). */
const MESSAGE_MIN_LENGTH = 10;

/** Like `Validators.minLength`, but ignores leading/trailing whitespace so ten spaces don't count as a message. */
function minTrimmedLength(min: number): ValidatorFn {
  return (control: AbstractControl<string>): ValidationErrors | null => {
    const length = control.value.trim().length;
    return length > 0 && length < min ? { minlength: { requiredLength: min, actualLength: length } } : null;
  };
}

type TextField = 'name' | 'email' | 'message';
type SendStatus = 'idle' | 'sending' | 'success' | 'error';

const MAIL_ENDPOINT = 'sendMail.php';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, RouterLink, Reveal],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  protected readonly language = inject(LanguageService);
  protected readonly profile = PROFILE;

  protected readonly form = inject(NonNullableFormBuilder).group({
    name: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(NAME_PATTERN)]],
    email: ['', [Validators.required, Validators.maxLength(254), Validators.pattern(EMAIL_PATTERN)]],
    message: ['', [Validators.required, minTrimmedLength(MESSAGE_MIN_LENGTH)]],
    privacy: [false, Validators.requiredTrue],
    website: [''],
  });

  protected readonly status = signal<SendStatus>('idle');

  protected readonly focused = signal<TextField | null>(null);

  /** Shakes the privacy checkbox after a submit without consent; reset on animationend so it can play again. */
  protected readonly privacyShake = signal(false);

  /** Whether a field shows its error: only once it has been left (blur), never while typing. */
  protected showError(field: TextField | 'privacy'): boolean {
    const control = this.form.controls[field];
    return control.invalid && control.touched && this.focused() !== field;
  }

  /** Whether name, email and message are valid; enables the submit button (the privacy consent is checked on submit). */
  protected fieldsValid(): boolean {
    const { name, email, message } = this.form.controls;
    return name.valid && email.valid && message.valid;
  }

  /** Whether a field shows the green check mark: as soon as its value is valid (also while typing). */
  protected isValid(field: TextField): boolean {
    return this.form.controls[field].valid;
  }

  /** Whether a field has a value that is filled in but not valid (as opposed to missing). */
  protected showInvalid(field: TextField): boolean {
    return this.showError(field) && !this.form.controls[field].hasError('required');
  }

  /** Trims the field on blur, so input made of spaces/blank lines counts as empty. */
  protected onBlur(field: TextField): void {
    const control = this.form.controls[field];
    const trimmed = control.value.trim();
    if (trimmed !== control.value) control.setValue(trimmed);
    this.focused.set(null);
  }

  /** Sends the form as JSON to the PHP mail endpoint and shows success or error feedback.
   *  On error the input is kept so the visitor can simply try again. */
  protected async onSubmit(): Promise<void> {
    if (!this.fieldsValid() || this.status() === 'sending') return;
    const privacy = this.form.controls.privacy;
    if (privacy.invalid) {
      privacy.markAsTouched();
      this.privacyShake.set(true);
      return;
    }
    this.status.set('sending');

    const { name, email, message, website } = this.form.getRawValue();
    try {
      const response = await fetch(MAIL_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // The honeypot is only sent when a bot filled it in (sendMail.php treats a missing field as empty).
        body: JSON.stringify({ name, email, message, ...(website && { website }) }),
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
