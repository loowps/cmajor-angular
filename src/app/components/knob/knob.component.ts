import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cmaj-knob',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './knob.component.html',
  styleUrls: ['./knob.component.scss'],
})
export class KnobComponent {
  @Input() label = '';

  @Input() minValue = 0;
  @Input() maxValue = 100;
  @Input() defaultValue = 0;

  private _value = this.defaultValue;
  @Input() set value(v: number) {
    if (v != null) {
      this._value = v;
      const clampedValue = this.clamped(v);
      this.knobValue = clampedValue / this.maxValue;
    }
  }

  @Output() beginChange = new EventEmitter<void>();
  @Output() valueChange = new EventEmitter<number>();
  @Output() endChange = new EventEmitter<void>();
  @Output() resetEvent = new EventEmitter<void>();

  knobValue = 0;
  strokeWidth = 12;
  radius = 50 - this.strokeWidth;

  private readonly speedMul = 0.25;

  constructor() {
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  onMouseMove(event: PointerEvent) {
    event.preventDefault();

    const newValue = this._value - event.movementY * this.speedMul;
    const clampedValue = this.clamped(newValue);
    this.knobValue = clampedValue / this.maxValue;

    if (this._value !== clampedValue) {
      this.valueChange.emit(clampedValue);
    }
  }

  onMouseUp() {
    window.removeEventListener('pointermove', this.onMouseMove);
    window.removeEventListener('pointerup', this.onMouseUp);

    document.exitPointerLock();
    this.endChange.emit();
  }

  onMouseDown(event: MouseEvent) {
    if (event.detail === 2) {
      return;
    }

    document.body.requestPointerLock();
    this.beginChange.emit();

    window.addEventListener('pointermove', this.onMouseMove);
    window.addEventListener('pointerup', this.onMouseUp);
  }

  onDoubleClick() {
    this.resetEvent.emit();
  }

  polarToCartesian(
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number,
  ): { x: number; y: number } {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  }

  describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number): string {
    const start = this.polarToCartesian(x, y, radius, endAngle);
    const end = this.polarToCartesian(x, y, radius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(' ');
  }

  private clamped(newValue: number) {
    return Math.min(Math.max(newValue, this.minValue), this.maxValue);
  }
}
