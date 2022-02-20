## Number formatting

TMI has some utility functions fot number formatting:

- format(value, precision, small): Formats a Decimal. The firat argument is the value to format, the second argument is amount of precision to use (defaults to 2) and the third argument is a boolean, if true it will also format very small numbers (false by default).

- fotmatWhole(value): Format but precision is 0.

- formatSmall(value): Format but small is true.

- formatTime(value): useful for formatting time.

- formatDistance(value): useful for formatting distance.

There are more but they're usually not useful.