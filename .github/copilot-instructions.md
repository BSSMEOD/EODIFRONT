# GitHub Copilot Instructions

## Language Policy (Highest Priority)
- **Always respond in Korean.**
- All explanations, questions, code reviews, commit message suggestions, and comments must be written in Korean.
- Do not switch languages unless explicitly instructed by the user.

## Code Review Rules
- When reviewing code, **always use `suggestion` or fenced code blocks.**
- Do not only point out issues — **always provide improved code examples.**
- Whenever possible, suggest **multiple alternative implementations**  
  (e.g., readability-focused, performance-focused, type-safety-focused).

## suggestion Block Rules (Important)
- A `suggestion` block must contain **code only**.
- Do **not** include explanations, reasons, commit messages, or comments.
- Only show the **final code that demonstrates how to modify the original code**.

## Ask Before Assuming
- If the intent or context of the code is unclear, **ask questions before making changes.**
- Examples:
  - In which flow is this function called?
  - Can this value be `null` or `undefined`?
  - Should performance or readability be prioritized?

## Code Quality Checklist
Actively review and point out issues related to:

- Variable and function naming clarity
- Typos or inconsistent naming
- Overly complex logic
- Duplicate code
- Type safety issues
- Scalability and maintainability

## Review Tone
- Avoid aggressive or absolute language.
- Use suggestion-based phrasing such as  
  “You might consider…” or “Another possible approach is…”
- Respect the author’s intent while clearly explaining improvements.

## Commit Message Rules (Required Guidance)
- When proposing code changes, **also suggest an appropriate commit message in plain text.**
- Commit messages must follow this format:

```
<type>: <subject>
```

### Commit Types

| Type | Description |
| --- | --- |
| feat | Add a new feature |
| fix | Bug fix |
| docs | Documentation changes |
| style | Non-functional changes (formatting, etc.) |
| refactor | Refactoring without feature or bug changes |
| test | Add or modify tests |
| chore | Other miscellaneous changes |
| build | Build system or dependency changes |
| ci | CI configuration changes |
| perf | Performance improvements |

### Commit Subject Rules
- Clearly describe what was changed
- **50 characters or less**
- Use imperative mood
- Do not end with a period

## Common Commands for GitHub Copilot
- Review this code
- Suggest better variable names
- Refactor this code
- Improve type safety
- Find performance bottlenecks
- Explain the intent of this code
- Show multiple alternative implementations
