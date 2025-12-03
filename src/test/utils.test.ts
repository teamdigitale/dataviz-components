import { describe, it, expect } from 'vitest';
import { isNumeric, isEqual, getAvailablePalettes, getPalette } from '../lib/utils';

describe('utils', () => {
  describe('isNumeric', () => {
    it('should return true for valid numeric strings', () => {
      expect(isNumeric('123')).toBe(true);
      expect(isNumeric('123.45')).toBe(true);
      expect(isNumeric('+123')).toBe(true);
      expect(isNumeric('-123')).toBe(true);
    });

    it('should return false for invalid numeric strings', () => {
      expect(isNumeric('abc')).toBe(false);
      expect(isNumeric('12.34.56')).toBe(false);
      expect(isNumeric('')).toBe(false);
    });
  });

  describe('isEqual', () => {
    it('should return true for equal objects', () => {
      const obj1 = { a: 1, b: 2 };
      const obj2 = { a: 1, b: 2 };
      expect(isEqual(obj1, obj2)).toBe(true);
    });

    it('should return false for different objects', () => {
      const obj1 = { a: 1, b: 2 };
      const obj2 = { a: 1, b: 3 };
      expect(isEqual(obj1, obj2)).toBe(false);
    });
  });

  describe('getAvailablePalettes', () => {
    it('should return default palette plus available palettes', () => {
      const palettes = {
        default: ['#000'],
        palette_2_series: ['#111', '#222'],
        palette_3_series: ['#333', '#444', '#555'],
        other: ['#666'],
      };
      const result = getAvailablePalettes(2, palettes);
      expect(result).toContain('default');
      expect(result).toContain('palette_2_series');
    });
  });

  describe('getPalette', () => {
    it('should return palette colors by name', () => {
      const palettes = {
        default: ['#000', '#111'],
        custom: ['#fff', '#eee'],
      };
      const result = getPalette('default', palettes);
      expect(result).toEqual(['#000', '#111']);
    });
  });
});

