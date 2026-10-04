# Add a domain: create recipes/<name>.just, then `mod <name> 'recipes/<name>.just'`.
mod release 'recipes/release.just'

_default:
  @just --choose
