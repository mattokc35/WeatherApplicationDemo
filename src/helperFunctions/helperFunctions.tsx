export function isZipCode(location: string): boolean {
  return /^\d{5}$/.test(location);
}

export function kelvinToFahrenheit(kelvin: number) {
  return ((kelvin - 273.15) * 9) / 5 + 32;
}
