// SPDX-License-Identifier: MIT
// The Painfully Honest Out-of-Office — a make.fun entry.
//
// The brief wants one sentence that is brutally honest about being
// away and still polite enough for a manager to let it stand. The
// first draft only said "glad to be away" and left the inbox vague,
// which reads cheerful rather than honest. This revision names the
// real feeling twice — relief at being away, dread at the queue
// waiting back — while keeping the promise to answer properly and
// the thanks, so the honesty lands first and the politeness holds.
import { mkdirSync, writeFileSync } from "node:fs";

const reply =
  "I'm out of the office and, honestly, relieved — your email joins a queue I'll face with fresh dread when I'm back, and I'll answer it properly then; thank you for waiting.";

function main(): void {
  const text = reply.trim();
  const problems: string[] = [];
  if (text.length < 1 || text.length > 200) {
    problems.push(`length ${text.length}, must be 1-200`);
  }
  if (text.includes("\n")) problems.push("must be a single line");
  if (!text.endsWith(".")) problems.push("must end as one sentence");
  if (problems.length > 0) {
    throw new Error(`invalid entry: ${problems.join("; ")}`);
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(`${outDir}/entry.txt`, `${text}\n`);
}

main();
