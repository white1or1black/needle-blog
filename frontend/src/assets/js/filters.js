export function dateFilter(d) {
  return new Date(d).toLocaleString('en').split(',')[0];
}