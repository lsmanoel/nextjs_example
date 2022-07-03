module.exports = {
  "**/*.ts?(x)": () => "tsc -p tsconfig.json --noEmit",
  "*.{js,jsx,ts,tsx}": ["eslint", "npm run test:staged"],
  "*": "prettier --ignore-unknown --check",
};
