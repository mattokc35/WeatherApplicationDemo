import { isZipCode, kelvinToFahrenheit } from "./helperFunctions";

describe("isZipCode function", () => {
  it("returns true for valid 5-digit zip codes", () => {
    expect(isZipCode("12345")).toBe(true);
    expect(isZipCode("98765")).toBe(true);
  });

  it("returns false for invalid zip codes", () => {
    expect(isZipCode("1234")).toBe(false); //Less than 5 digits
    expect(isZipCode("123456")).toBe(false); //More than 5 digits
    expect(isZipCode("abcde")).toBe(false); //Non-numeric characters
    expect(isZipCode("")).toBe(false); //Empty string
    expect(isZipCode("1234567")).toBe(false); //More than 5 digits
  });
});

describe("kelvinToFahrenheit function", () => {
  it("correctly converts Kelvin to Fahrenheit", () => {
    expect(kelvinToFahrenheit(273.15)).toBeCloseTo(32);
    expect(kelvinToFahrenheit(300)).toBeCloseTo(80.33);
    expect(kelvinToFahrenheit(0)).toBeCloseTo(-459.67);
    expect(kelvinToFahrenheit(100)).toBeCloseTo(-279.67);
  });
});
