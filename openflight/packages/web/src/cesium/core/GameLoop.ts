import { Scene } from './Scene';

export interface Updatable {
  update(deltaTime: number): void;
}

export class GameLoop {
  private scene: Scene;
  private updatables: Updatable[] = [];
  private lastTime: number = 0;
  private isRunning: boolean = false;
  private boundUpdate: (() => void) | null = null;

  constructor(scene: Scene) {
    this.scene = scene;
  }

  public addUpdatable(updatable: Updatable): void {
    this.updatables.push(updatable);
  }

  public removeUpdatable(updatable: Updatable): void {
    const index = this.updatables.indexOf(updatable);
    if (index > -1) {
      this.updatables.splice(index, 1);
    }
  }

  public start(): void {
    if (this.isRunning) return;

    this.isRunning = true;
    this.lastTime = performance.now();

    this.boundUpdate = this.update.bind(this);
    this.scene.viewer.scene.preUpdate.addEventListener(this.boundUpdate);
  }

  public stop(): void {
    this.isRunning = false;

    if (this.boundUpdate) {
      this.scene.viewer.scene.preUpdate.removeEventListener(this.boundUpdate);
      this.boundUpdate = null;
    }
  }

  private update(): void {
    if (!this.isRunning) return;

    const currentTime = performance.now();
    const deltaTime = (currentTime - this.lastTime) / 1000; // Convert to seconds
    this.lastTime = currentTime;
    // Cap delta time to prevent huge jumps (e.g., when tab loses focus)
    const clampedDeltaTime = Math.min(deltaTime, 1/30); // Max 30 FPS equivalent

    // Update all registered systems
    for (const updatable of this.updatables) {
      updatable.update(clampedDeltaTime);
    }
  }
}
