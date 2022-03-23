// deno-lint-ignore-file no-explicit-any

import { Colors } from "../deps.ts";

export const message = (...args: any[]) => {
  console.log(...args);
};

export const info = (...args: any[]) => {
  console.log(
    Colors.blue("[INFO]"),
    ...args,
  );
};

export const warn = (...args: any[]) => {
  console.log(
    Colors.yellow("[WARN]"),
    ...args,
  );
};

export const error = (...args: any[]) => {
  console.log(
    Colors.red("[ERROR]"),
    ...args,
  );
};

export const success = (...args: any[]) => {
  console.log(
    Colors.green("[SUCCESS]"),
    ...args,
  );
};
