# Module recipes run from their own dir by default; run from the repo root.
set working-directory := '..'

major:
  oxr release --execute major

minor:
  oxr release --execute minor

patch:
  oxr release --execute patch
