import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {
  message = environment.message;
  features = [
    {
      title: 'AI-Powered Tagging',
      description:
        'Automatically categorize your tasks using advanced AI language models.',
      icon: '🧠',
    },
    {
      title: 'Smart Breakdowns',
      description:
        'Turn complex projects into manageable checklists with a single click.',
      icon: '⚡',
    },
    {
      title: 'Seamless Sync',
      description:
        'Switch between web and mobile effortlessly with real-time synchronization.',
      icon: '🔄',
    },
  ];
}
