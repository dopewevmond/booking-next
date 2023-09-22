export function generateRandomCodeWithNumber() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';

  const firstRandomIndex = Math.floor(Math.random() * 10);
  code += characters.charAt(firstRandomIndex);

  for (let i = 1; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }

  return code;
}