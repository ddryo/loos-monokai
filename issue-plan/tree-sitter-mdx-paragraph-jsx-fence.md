# Issue draft — paragraph + block JSX corrupts the next fenced code block

- **Target repo:** `srazzak/tree-sitter-mdx` (external scanner / fence parsing)
- **Type:** bug (parser)
- **Status:** draft (not filed yet)
- **Related:** #8, #3 — same external-scanner family, but a **distinct failure mode**. #8 (a code fence nested inside a JSX element, e.g. `<div>` ... fence ... `</div>`) produces a hard `ERROR` node; this bug produces **no** `ERROR` — it silently mis-pairs *sibling* fence delimiters.

---

## Title

A paragraph immediately followed by a block-level JSX element breaks the next fenced code block (cascades to end of document)

## Body

### Summary

When a **paragraph** is immediately followed by a **block-level JSX element**, the next fenced code block anywhere after it is mis-parsed: its opening ```` ``` ```` is treated as a degenerate (open-only) fence, its content becomes a paragraph, and its closing ```` ``` ```` is reinterpreted as a *new* opening fence that swallows everything until the next fence (or EOF). In editors (e.g. Zed) this shows up as all syntax highlighting after the code block turning into plain/code text.

### Minimal reproduction

```mdx
text

<p>xxx</p>

` ` `
y
` ` `
```

(The three ` ` ` are a normal ```` ``` ```` fence — no info string needed; a language like ```` ```js ```` reproduces it too.)

### Actual parse (broken)

```
(paragraph [0, 0] - [1, 0])
(jsx_element [2, 0] - [2, 11])
(fenced_code_block [4, 0] - [5, 0]            ; <- degenerate: opening fence only
  (fenced_code_block_delimiter [4, 0] - [4, 3]))
(paragraph [5, 0] - [6, 0])                    ; <- "y" became a paragraph
(fenced_code_block [6, 0] - [7, 0]             ; <- closing ``` became a NEW opening fence
  (fenced_code_block_delimiter [6, 0] - [6, 3]))
```

In a larger document the trailing phantom fence keeps consuming until it finds another ```` ``` ````, so the rest of the file is swallowed.

### Expected parse

```
(paragraph ...)
(jsx_element ...)
(fenced_code_block [4, 0] - [7, 0]
  (fenced_code_block_delimiter [4, 0] - [4, 3])
  (code_fence_content [5, 0] - [6, 0])
  (fenced_code_block_delimiter [6, 0] - [6, 3]))
```

### What triggers it / what doesn't

The poison is the **`paragraph` → block `jsx_element` adjacency**. The fenced code block can be anywhere after it.

Breaks ❌:
- `text` → `<p>xxx</p>` → fence
- element name is irrelevant: `<span>`, `<p>`, `<Card>` all reproduce
- fence language is irrelevant: no-info or ```` ```js ````
- a separating paragraph *between the JSX and the fence* does **not** help (`text` → `<p>` → `more text` → fence still breaks)

Working case ✅:

No issues occur as long as paragraphs and HTML (JSX) are not adjacent to each other.

The process works correctly if it follows this flow: `text` → heading, fence, list, etc. → `<p>xxx</p>` → fence.

For example, the following MDX had no issues.

```mdx
text

## heading

<p>xxx</p>

` ` `
y
` ` `
```

(A `{/* comment */}` does **not** work as a separator — comments are in `extras` and don't break the block adjacency.)

### Environment

- Grammar: `srazzak/tree-sitter-mdx` @ `0f2d4b2` (as pinned by `srazzak/zed-mdx` v0.4.0)
- Verified with `tree-sitter-cli` 0.25.6 (`tree-sitter parse`)
