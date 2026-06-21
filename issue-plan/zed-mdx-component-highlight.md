# Issue draft — JSX component names are not highlighted in MDX

- **Target repo:** `srazzak/zed-mdx` (file: `languages/mdx/highlights.scm`)
- **Type:** bug / enhancement (syntax highlighting)
- **Status:** draft (not filed yet)

---

## Title

JSX component names (capitalized / member expressions) are not highlighted in raw MDX

## Body

### Summary

In `.mdx` files, JSX **component** tags (capitalized names such as `<Card>`, `<Badge>`, or member expressions such as `<Foo.Bar>`) are not highlighted as tags/components. They fall through to the generic `(identifier) @variable` rule and render with the plain variable color, so they look like normal text rather than components.

Lowercase intrinsic tags (`<div>`, `<span>`) are highlighted correctly, because `highlights.scm` has a rule for them. There is simply no equivalent rule for capitalized component names.

Interestingly, the same component **does** get the correct component color inside a fenced ```` ```jsx ```` block, because there the JavaScript grammar is injected and Zed's bundled JS/TSX queries already distinguish components. So raw MDX JSX is inconsistent with fenced JSX.

### Current behavior

`languages/mdx/highlights.scm` (JSX section) only matches lowercase names:

```scheme
(jsx_opening_element (identifier) @tag.jsx (#match? @tag.jsx "^[a-z][^.]*$"))
(jsx_closing_element (identifier) @tag.jsx (#match? @tag.jsx "^[a-z][^.]*$"))
(jsx_self_closing_element (identifier) @tag.jsx (#match? @tag.jsx "^[a-z][^.]*$"))
```

There is no rule for `^[A-Z]` identifiers or for member-expression names, so `<Card>` etc. are captured only by the file-wide `(identifier) @variable`.

### Expected behavior

Capitalized component names (and dotted member-expression names) should be captured as components — i.e. `@tag.component(.jsx)` — matching how Zed's built-in `javascript`/`tsx` highlight queries distinguish components (`@tag.component.jsx`) from intrinsic tags (`@tag.jsx`). Most themes already style `tag.component`, so this makes MDX components consistent with `.jsx`/`.tsx` files.

### Proposed fix

Add the following alongside the existing lowercase rules in the JSX section of `languages/mdx/highlights.scm`:

```scheme
; Components: capitalized tag names, e.g. <Card>, <Badge>
(jsx_opening_element (identifier) @tag.component.jsx
  (#match? @tag.component.jsx "^[A-Z]"))
(jsx_closing_element (identifier) @tag.component.jsx
  (#match? @tag.component.jsx "^[A-Z]"))
(jsx_self_closing_element (identifier) @tag.component.jsx
  (#match? @tag.component.jsx "^[A-Z]"))

; Components written as member expressions, e.g. <Foo.Bar />
(jsx_opening_element (member_expression) @tag.component.jsx)
(jsx_closing_element (member_expression) @tag.component.jsx)
(jsx_self_closing_element (member_expression) @tag.component.jsx)
```

The grammar already exposes these nodes: `_jsx_element_name` is `choice(_jsx_identifier, alias(nested_identifier, member_expression), jsx_namespace_name)` (see `grammar.js`), so both the `^[A-Z]` identifier case and the `member_expression` case are available.

### Notes / scope

- This is purely a **highlight-query** change. It does **not** touch parsing.
- It is independent from the JSX parse-recovery problems tracked in `srazzak/tree-sitter-mdx` (#3 inline-code JSX, #8 markdown-inside-JSX). Those affect whether the JSX parses at all; this only affects coloring of correctly-parsed JSX.

### Environment

- Extension: `srazzak/zed-mdx` v0.4.0
- Grammar: `srazzak/tree-sitter-mdx` @ `0f2d4b2`
