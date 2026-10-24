/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["next/core-web-vitals"],
  // Pre-existing portfolio and /app files. Not part of AEI, and left unchanged.
  ignorePatterns: [
    "components/Footer.tsx",
    "components/legal/LegalShell.tsx",
    "components/app/PapagedonWorld.tsx",
  ],
};
