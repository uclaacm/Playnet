const HASHING_FACTOR = 26;

function hashNumber(hashString: string): number {
  let hash = 0;
  hashString.split('').map((char) => {
    hash = ((hash << 5) - hash) + char.charCodeAt(0);
    hash |= 0; // Convert to a number
  })
  return hash;
}

export function scramble(hash: string, input: string): string {
  const shift = hashNumber(hash) % HASHING_FACTOR;
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