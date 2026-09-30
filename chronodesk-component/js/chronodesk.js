import { ClockEngine } from './modules/clockEngine.js';
import { AlarmEngine } from './modules/alarmEngine.js';
import { StopwatchEngine } from './modules/stopwatchEngine.js';
import { ParticleBackground } from './modules/particleBackground.js';
import { StorageAdapter } from './modules/storageAdapter.js';

export class ChronoDesk {
  constructor(options = {}) {
    this.container = document.querySelector(options.target || '#chronodesk-container');
    this.theme = options.theme || StorageAdapter.get('theme', 'dark-neon');
    this.timeFormat = options.timeFormat || StorageAdapter.get('format', 12);
    
    this.clockEngine = new ClockEngine(this.timeFormat);
    this.alarmEngine = new AlarmEngine();
    this.stopwatchEngine = new StopwatchEngine();
    
    this.init();
  }

  init() {
    if (!this.container) return console.error('ChronoDesk target container not found.');
    
    this.container.setAttribute('data-cd-theme', this.theme);
    
    const canvas = this.container.querySelector('.cd-canvas');
    if (canvas) new ParticleBackground(canvas);

    this.startClock();
    this.bindEvents();
    this.updateAlarmUI();
  }

  startClock() {
    const update = () => {
      const now = new Date();
      const { timeString, greeting, dateString } = this.clockEngine.getFormattedTime(now);
      
      const clockEl = document.getElementById('cd-clock');
      const greetingEl = document.getElementById('cd-greeting');
      const dateEl = document.getElementById('cd-date-display');

      if (clockEl) clockEl.textContent = timeString;
      if (greetingEl) greetingEl.textContent = greeting;
      if (dateEl) dateEl.textContent = dateString;

      this.alarmEngine.checkAlarms(now, (triggeredAlarm) => {
        alert(`⏰ ALARM TRIGGERED!`);
      });
    };

    update();
    setInterval(update, 1000);
  }

  updateAlarmUI() {
    const formattedNext = this.alarmEngine.getNextAlarmFormatted(this.timeFormat);
    const statusEl = document.getElementById('cd-next-alarm-status');
    const subtitleEl = document.getElementById('cd-alarm-subtitle');

    if (statusEl) {
      statusEl.textContent = formattedNext ? formattedNext : 'No alarm set';
    }
    if (subtitleEl) {
      subtitleEl.textContent = formattedNext ? 'Alarm Active' : 'Set an alarm to stay on track';
    }
  }

  bindEvents() {
    // Format Switcher
    const toggleBtn = document.getElementById('cd-format-toggle');
    if (toggleBtn) {
      toggleBtn.onclick = (e) => {
        e.preventDefault();
        this.timeFormat = this.timeFormat === 12 ? 24 : 12;
        this.clockEngine.format = this.timeFormat;
        toggleBtn.textContent = `${this.timeFormat}H`;
        StorageAdapter.set('format', this.timeFormat);
        this.updateAlarmUI();
      };
    }

    // Stopwatch Buttons
    const swDisplay = document.getElementById('cd-stopwatch-display');
    const swStartBtn = document.getElementById('cd-sw-start');
    const swPauseBtn = document.getElementById('cd-sw-pause');
    const swResetBtn = document.getElementById('cd-sw-reset');

    if (swStartBtn) {
      swStartBtn.onclick = (e) => {
        e.preventDefault();
        this.stopwatchEngine.start((timeStr) => {
          if (swDisplay) swDisplay.textContent = timeStr;
        });
      };
    }

    if (swPauseBtn) {
      swPauseBtn.onclick = (e) => {
        e.preventDefault();
        this.stopwatchEngine.pause();
      };
    }

    if (swResetBtn) {
      swResetBtn.onclick = (e) => {
        e.preventDefault();
        this.stopwatchEngine.reset((timeStr) => {
          if (swDisplay) swDisplay.textContent = timeStr;
        });
      };
    }

    // Modal Control Elements
    const alarmModal = document.getElementById('cd-alarm-modal');
    const settingsModal = document.getElementById('cd-settings-modal');

    const addAlarmBtn = document.getElementById('cd-add-alarm-btn');
    const closeAlarmModalBtn = document.getElementById('cd-close-alarm-modal');
    const saveAlarmBtn = document.getElementById('cd-save-alarm-btn');

    if (addAlarmBtn) {
      addAlarmBtn.onclick = (e) => {
        e.preventDefault();
        alarmModal?.classList.remove('cd-hidden');
      };
    }

    if (closeAlarmModalBtn) {
      closeAlarmModalBtn.onclick = (e) => {
        e.preventDefault();
        alarmModal?.classList.add('cd-hidden');
      };
    }

    if (saveAlarmBtn) {
      saveAlarmBtn.onclick = (e) => {
        e.preventDefault();
        
        const hrInput = document.getElementById('cd-alarm-hr');
        const minInput = document.getElementById('cd-alarm-min');
        const ampmSelect = document.getElementById('cd-alarm-ampm');

        const hr = hrInput?.value?.trim();
        const min = minInput?.value?.trim();
        const ampm = ampmSelect?.value;

        if (!hr || min === '') {
          alert('Please enter valid Hour and Minute values.');
          return;
        }

        this.alarmEngine.addAlarm12H(hr, min, ampm);
        this.updateAlarmUI();

        if (hrInput) hrInput.value = '';
        if (minInput) minInput.value = '';

        alarmModal?.classList.add('cd-hidden');
      };
    }

    // Theme Modal Elements
    const openSettingsBtn = document.getElementById('cd-open-settings-btn');
    const closeSettingsModalBtn = document.getElementById('cd-close-settings-modal');
    const saveThemeBtn = document.getElementById('cd-save-theme-btn');
    const themeSelect = document.getElementById('cd-theme-select');

    if (themeSelect) themeSelect.value = this.theme;

    if (openSettingsBtn) {
      openSettingsBtn.onclick = (e) => {
        e.preventDefault();
        settingsModal?.classList.remove('cd-hidden');
      };
    }

    if (closeSettingsModalBtn) {
      closeSettingsModalBtn.onclick = (e) => {
        e.preventDefault();
        settingsModal?.classList.add('cd-hidden');
      };
    }

    if (saveThemeBtn) {
      saveThemeBtn.onclick = (e) => {
        e.preventDefault();
        if (themeSelect) {
          this.theme = themeSelect.value;
          this.container.setAttribute('data-cd-theme', this.theme);
          StorageAdapter.set('theme', this.theme);
        }
        settingsModal?.classList.add('cd-hidden');
      };
    }
  }
}
