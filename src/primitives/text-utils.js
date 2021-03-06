export function wrapText(context, text, x, y, maxWidth, lineHeight) {
  var words = text.split(' '),
    line = '',
    i,
    test,
    metrics,
    lines = [];

  for (i = 0; i < words.length; i++) {
    test = words[i];
    metrics = context.measureText(test);
    while (metrics.width > maxWidth) {
      // Determine how much of the word will fit
      test = test.substring(0, test.length - 1);
      metrics = context.measureText(test);
    }
    if (words[i] != test) {
      words.splice(i + 1, 0, words[i].substr(test.length));
      words[i] = test;
    }

    test = line + words[i] + ' ';
    metrics = context.measureText(test);

    if (metrics.width > maxWidth && i > 0) {
      lines.push({ text: line, y });
      line = words[i] + ' ';
      y += lineHeight;
    } else {
      line = test;
    }
  }

  lines.push({ text: line, y });
  return lines;
}
