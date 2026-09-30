export class AlarmEngine {
  constructor() {
    this.alarms = []; // Array of "HH:MM" 24h strings
  }

  addAlarm12H(hr, min, ampm) {
    let hours = parseInt(hr, 10);
    const minutes = parseInt(min, 10);

    if (isNaN(hours) || isNaN(minutes)) return null;

    if (ampm === 'PM' && hours < 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;

    const alarmTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

    if (!this.alarms.includes(alarmTime)) {
      this.alarms.push(alarmTime);
      this.sortAlarms();
    }
    return alarmTime;
  }

  deleteAlarm(index) {
    if (index >= 0 && index < this.alarms.length) {
      this.alarms.splice(index, 1);
    }
  }

  sortAlarms() {
    this.alarms.sort((a, b) => {
      const [h1, m1] = a.split(':').map(Number);
      const [h2, m2] = b.split(':').map(Number);
      return h1 * 60 + m1 - (h2 * 60 + m2);
    });
  }

  formatTime12H(time24) {
    const [hrsStr, minsStr] = time24.split(':');
    let hrs = parseInt(hrsStr, 10);
    const period = hrs >= 12 ? 'PM' : 'AM';
    hrs = hrs % 12 || 12;
    return `${String(hrs).padStart(2, '0')}:${minsStr} ${period}`;
  }

  getAlarmsList(format = 12) {
    return this.alarms.map(time24 => {
      return {
        raw: time24,
        formatted: format === 12 ? this.formatTime12H(time24) : time24
      };
    });
  }

  getNextAlarmFormatted(format = 12) {
    if (this.alarms.length === 0) return null;
    const nextTime = this.alarms[0];
    return format === 12 ? this.formatTime12H(nextTime) : nextTime;
  }

  checkAlarms(now, onTrigger) {
    const currentHrs = String(now.getHours()).padStart(2, '0');
    const currentMins = String(now.getMinutes()).padStart(2, '0');
    const currentTime = `${currentHrs}:${currentMins}`;

    if (this.alarms.includes(currentTime) && now.getSeconds() === 0) {
      onTrigger(currentTime);
    }
  }
}