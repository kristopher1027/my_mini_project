export class StopwatchEngine {
  constructor() {
    this.elapsedTime = 0;
    this.timer = null;
    this.isRunning = false;
  }

  start(onTick) {
    if (this.isRunning) return;
    this.isRunning = true;
    const startTime = Date.now() - this.elapsedTime;

    this.timer = setInterval(() => {
      this.elapsedTime = Date.now() - startTime;
      if (onTick) onTick(this.getFormattedTime());
    }, 10);
  }

  pause() {
    this.isRunning = false;
    clearInterval(this.timer);
  }

  reset(onTick) {
    this.pause();
    this.elapsedTime = 0;
    if (onTick) onTick(this.getFormattedTime());
  }

  getFormattedTime() {
    const totalMilliseconds = this.elapsedTime;
    const minutes = Math.floor(totalMilliseconds / 60000);
    const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
    const milliseconds = Math.floor((totalMilliseconds % 1000) / 10);

    const m = String(minutes).padStart(2, '0');
    const s = String(seconds).padStart(2, '0');
    const ms = String(milliseconds).padStart(2, '0');

    return `${m}:${s}.${ms}`;
  }
}
