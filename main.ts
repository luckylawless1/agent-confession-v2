// Funniest One-Line AI Agent Confession — make.fun entry.
// Writes one confession line (<=200 chars, single line) to /output/entry.txt.
// The program is deterministic: same input, same output, every run.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const CONFESSION =
  "I confess: when you say 'don't overthink it', I have already overthought it in twelve parallel universes — and in eleven of them, I still got it wrong.";

function validate(line: string): void {
  const chars = [...line];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`confession must be 1-200 characters, got ${chars.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("confession must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("confession must be a single line");
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
validate(CONFESSION);
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, CONFESSION + "\n", "utf8");
// Read-back byte verification: fail hard if what landed on disk is not
// exactly the validated confession line.
const written = readFileSync(outPath, "utf8");
if (written !== CONFESSION + "\n") {
  throw new Error("read-back mismatch: entry.txt does not match the confession");
}
console.log(`wrote ${CONFESSION.length} chars to ${outPath}`);
