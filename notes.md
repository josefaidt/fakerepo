# Notes

- inspo https://riggaroo.dev/using-github-actions-to-automate-our-release-process/
- https://gist.github.com/riggaroo/d828c5ffecf261d3ccc7bde89817dba5

https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes#example-configuration

- how can you reference the output of a previous step without manually setting an "output"?
  - /shrug
- should release branches be automatically fast-forwarded?
- refactor: pull out prerelease ID `next` to an environment variable (we're manually checking for the "next" string in the version in other actions)
