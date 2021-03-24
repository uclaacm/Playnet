import anime from 'animejs';

export const animate_happy_alien = (): void => {
  const animation = anime.timeline();
  animation
    .add({
      targets: '#sparks',
      opacity: [0, 1],
      strokeWidth: '30',
      duration: 500,
    })
    .add({
      targets: '#sparks',
      opacity: [1, 0],
      strokeWidth: '0',
      duration: 250,
    }, '+=250');
};