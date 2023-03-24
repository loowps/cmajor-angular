import { animate, query, style, transition, trigger } from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    query(
      ':enter',
      [
        style({
          opacity: 0,
          height: '100%',
          transform: 'scale(0.7)',
        }),
        animate(
          '100ms ease',
          style({
            opacity: 1,
            transform: 'scale(1)',
          }),
        ),
      ],
      { optional: true },
    ),
  ]),
]);
