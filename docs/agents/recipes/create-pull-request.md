# Create a pull request

1. Confirm a GitHub remote and an open issue. If either is missing, stop and offer to create the issue.
2. Check the branch is `<type>/BR-<issue>-<summary>` and contains only this change.
3. Run `npm run check -- --full`.
4. Have the reviewer check it, with a deep review for tier 1.
5. List findings that were left out.
6. Fill in `.github/pull_request_template.md` in a temporary file.
7. Run `npm run pr:check -- <file>`.
8. Show and confirm the commit. Then, separately, confirm the push and the PR.
9. Run `gh pr create --body-file <file>`. Confirm each later comment separately.
10. Report the URL and check status.
