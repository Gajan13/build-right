# Add a dependency or environment variable

## Dependency

1. Show that the platform and existing packages are not enough, with the maintenance and bundle cost.
2. After approval run `npm install <package>`. Never edit the lockfile.
3. Run the full gate.

## Environment variable

1. Use `NEXT_PUBLIC_` only for values that are safe to publish.
2. Document the name in `.env.example` with a fake value.
3. Read it in one place and fail clearly when it is missing.
4. The user sets real values locally and at the host.
