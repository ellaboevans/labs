export class PasswordGenerator {
  constructor() {
    this.length = 12;
    this.includeUppercase = true;
    this.includeLowercase = true;
    this.includeNumbers = true;
    this.includeSymbols = false;
  }

  generatePassword() {
    const charSets = {
      uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      lowercase: "abcdefghijklmnopqrstuvwxyz",
      numbers: "0123456789",
      symbols: '!@#$%^&*()_+{}:"<>?[];,./',
    };
    const selectedSets = [
      this.includeUppercase && charSets.uppercase,
      this.includeLowercase && charSets.lowercase,
      this.includeNumbers && charSets.numbers,
      this.includeSymbols && charSets.symbols,
    ].filter(Boolean);

    let allChars = selectedSets.join("");
    let password = Array.from(
      { length: this.length },
      () => allChars[Math.floor(Math.random() * allChars.length)]
    ).join("");

    return password;
  }

  calculateStrength(password) {
    let criteriaCount = 0;
    if (password.length >= 8) criteriaCount++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) criteriaCount++;
    if (/\d/.test(password)) criteriaCount++;
    if (/[^A-Za-z0-9]/.test(password)) criteriaCount++;

    if (password.length >= 12 && criteriaCount >= 3) return "STRONG";
    if (password.length >= 8 && criteriaCount >= 2) return "MEDIUM";
    if (password.length >= 8) return "WEAK";
    return "TOO WEAK!";
  }
}
