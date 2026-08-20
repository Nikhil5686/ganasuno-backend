class YoutubeEngine {
  private listeners = new Set<() => void>();

  public state = {
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    videoId: null as string | null,
  };

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  load(videoId: string) {
    this.state.videoId = videoId;
    this.state.currentTime = 0;
    this.state.isPlaying = true;

    this.notify();
  }

  play() {
    this.state.isPlaying = true;
    this.notify();
  }

  pause() {
    this.state.isPlaying = false;
    this.notify();
  }

  toggle() {
    this.state.isPlaying = !this.state.isPlaying;
    this.notify();
  }
}

export const youtubeEngine = new YoutubeEngine();
