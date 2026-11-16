import { Component, ElementRef, afterRenderEffect, inject, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../core/language.service';

interface ChatMessage {
  from: 'user' | 'avatar';
  text: string;
}

@Component({
  selector: 'app-avatar',
  imports: [RouterLink],
  templateUrl: './avatar.html',
  styleUrl: './avatar.scss',
})
export class Avatar {
  protected readonly language = inject(LanguageService);

  protected readonly messages = signal<ChatMessage[]>([]);
  protected readonly draft = signal('');
  protected readonly started = signal(false);

  private readonly log = viewChild.required<ElementRef<HTMLElement>>('log');

  /** Keeps the newest chat message in view after every new message. */
  constructor() {
    afterRenderEffect(() => {
      this.messages();
      const log = this.log().nativeElement;
      log.scrollTop = log.scrollHeight;
    });
  }

  /** Consent gate: starts the avatar – nothing may be loaded from D-ID before this. */
  protected start(): void {
    // TODO: load the D-ID SDK only now (dynamic import) and connect the agent
    this.started.set(true);
  }

  /** Sends a question (typed or a suggestion) and adds it and the answer to the chat.
   *  Currently answers with a fixed placeholder text. */
  protected send(text = this.draft()): void {
    const question = text.trim();
    if (!question || !this.started()) return;

    // TODO: send the question to the D-ID agent and render its (spoken + written) answer
    const reply = this.language.texts().avatar.placeholderReply;
    this.messages.update((messages) => [...messages, { from: 'user', text: question }, { from: 'avatar', text: reply }]);
    this.draft.set('');
  }
}
