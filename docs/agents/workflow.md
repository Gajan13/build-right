# Workflow

1. **Spec.** A GitHub issue, or the user's request until a remote exists.
2. **Branch.** `<type>/BR-<issue>-<summary>`, for example `feat/BR-12-services-page`.
3. **Change.** Only what the spec needs, following a recipe where one exists.
4. **Gate.** `npm run check`, with `--full` for visible changes, then review by risk tier.
5. **Findings.** List unrelated problems for a separate issue.
6. **PR.** Use the template. Confirm the commit, the push, the PR and each comment separately.

Client approval of copy is separate from code review; record it in `docs/client-brief.md`.
