export function setBeckgroundColor(): string {
    const colors = [
      'rgba(131, 182, 53, 0.5)',
      'rgba(53, 182, 57, 0.5)',
      'rgba(53, 133, 182, 0.5)',
      'rgba(139, 53, 182, 0.5)',
    ];

    const rand = Math.floor(Math.random() * colors.length);

    return colors[rand];
  }