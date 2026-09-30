export class ClockEngine {
  constructor(format = 12) {
    this.format = format;
  }

  getGreeting(hour) {
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  }

  getFormattedTime(now = new Date()) {
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    let ampm = '';

    if (this.format === 12) {
      ampm = hours >= 12 ? ' PM' : ' AM';
      hours = hours % 12 || 12;
    }

    const timeString = `${String(hours).padStart(2, '0')}:${minutes}:${seconds}${ampm}`;
    const greeting = this.getGreeting(now.getHours());
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString('en-US', options);

    return { timeString, greeting, dateString };
  }
}