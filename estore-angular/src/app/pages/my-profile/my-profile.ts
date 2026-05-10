import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './my-profile.html',
  styleUrls: ['./my-profile.scss']
})
export class MyProfileComponent {
  activeSection = 'personal';
  savedSuccess = false;

  sections = [
    { key: 'personal', label: 'Personal Info', icon: 'person' },
    { key: 'security', label: 'Security', icon: 'lock' },
    { key: 'addresses', label: 'Addresses', icon: 'home' },
    { key: 'notifications', label: 'Notifications', icon: 'notifications' },
  ];

  profile = {
    firstName: 'Alexandra',
    lastName: 'Chen',
    email: 'a.chen@example.com',
    phone: '+1 (555) 012-3456',
    bio: 'Senior product designer based in San Francisco.',
  };

  saveProfile() {
    this.savedSuccess = true;
    setTimeout(() => this.savedSuccess = false, 2500);
  }
}
