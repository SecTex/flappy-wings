import { AnimationTriggerMetadata, style, transition, trigger, animate } from '@angular/animations';

export function fadeInOut(
  timingIn: number | string,
  timingOut: number | string,
  height: boolean = false,
): AnimationTriggerMetadata {
  return trigger('fadeInOut', [
    transition(':enter', [
      style(height ? { opacity: 0, height: 0 } : { opacity: 0 }),
      animate(timingIn, style(height ? { opacity: 1, height: '100%' } : { opacity: 1 })),
    ]),
    transition(':leave', [
      animate(timingOut, style(height ? { opacity: 0, height: 0 } : { opacity: 0 })),
    ]),
  ]);
}
