/* eslint-disable no-bitwise */

/**
 * Return a numerical representation of a hash string
 *
 * @param hashString a string to convert into a hashed number
 */
function hashNumber(hashString: string): number {
  let hash = 0;
  hashString.split('').map((char) => {
    hash = ((hash << 5) - hash) + char.charCodeAt(0);
    hash |= 0; // Convert to a number
  });
  return hash;
}

/**
 * Return a Caesar Cipher encoding of an input word
 *
 * @param hash a hashed string, representing the shift value
 * @param input an input string to be encoded
 */
export function scramble(hash: number | string, input: string): string {
  // Obtain a 32 bit representation of the hash
  const shift = typeof(hash) === 'number'
    ? hash
    : hashNumber(hash);

  return input.split('').reduce((ret, char) => {
    // Obtain the ascii value of the character
    const ascii = char.charCodeAt(0);

    // uppercase characters
    if (65 <= ascii && ascii <= 90) {
      ret += String.fromCharCode((ascii - 65 + shift) % 26 + 65);
    }
    // lowercase characters
    else if (97 <= ascii && ascii <= 122) {
      ret += String.fromCharCode((ascii - 97 + shift) % 26 + 97);
    }

    return ret;
  }, '');
}