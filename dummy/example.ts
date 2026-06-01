// dummy module
import { foo } from "./foo";

type Item = {
  id: number;
  label: string;
};

const list: Item[] = [];
const pickItem = (n: number): Item => list[n];
foo(list, 42, `picked: ${pickItem}`);
