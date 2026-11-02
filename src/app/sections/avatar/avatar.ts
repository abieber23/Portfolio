import { Component, ElementRef, afterRenderEffect, inject, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../core/language.service';

interface ChatMessage {
  from: 'user' | 'avatar';
  text: string;
}

/**
 * PLACEHOLDER for the D-ID AI avatar: layout and styling are final, the chat only
 * answers locally with a fixed text until the D-ID integration is added.
 */
@Component({
  selector: 'app-avatar',
  imports: [RouterLink],
  templateUrl: './avatar.html',
  styleUrl: './avatar.scss',
})
export class Avatar {
  protected readonly language = inject(LanguageService);

  /** Conversation after the greeting (the greeting follows the selected language). */
  protected readonly messages = signal<ChatMessage[]>([]);
  protected readonly draft = signal('');
  /** Consent gate: nothing may be loaded from D-ID before the visitor starts the avatar. */
  protected readonly started = signal(false);

  private readonly log = viewChild.required<ElementRef<HTMLElement>>('log');

  constructor() {
    // keep the newest message in view
    afterRenderEffect(() => {
      this.messages();
      const log = this.log().nativeElement;
      log.scrollTop = log.scrollHeight;
    });
  }

  protected start(): void {
    // TODO: load the D-ID SDK only now (dynamic import) and connect the agent
    this.started.set(true);
  }

  protected send(text = this.draft()): void {
    const question = text.trim();
    if (!question || !this.started()) return;

    // TODO: send the question to the D-ID agent and render its (spoken + written) answer
    const reply = this.language.texts().avatar.placeholderReply;
    this.messages.update((messages) => [...messages, { from: 'user', text: question }, { from: 'avatar', text: reply }]);
    this.draft.set('');
  }
}
