import { expect, it, vi } from 'vitest';
import { setupNanoid } from '../src/utils';

it('uses the configured randomness for a custom padding alphabet', () => {
  const random = vi.spyOn(Math, 'random').mockReturnValue(0);
  try {
    const standard = setupNanoid({ dictionary: 'abc', stronger: false });
    expect(standard.nanoid(8)).toBe('aaaaaaaa');
    expect(random).toHaveBeenCalled();

    random.mockClear();
    const secure = setupNanoid({ dictionary: 'abc', stronger: true });
    expect(secure.nanoid(8)).toMatch(/^[abc]{8}$/);
    expect(random).not.toHaveBeenCalled();
  } finally {
    random.mockRestore();
  }
});
