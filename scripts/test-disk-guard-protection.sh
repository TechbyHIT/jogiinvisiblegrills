#!/usr/bin/env bash
# Unit test for disk-guard.sh is_protected(). Runs anywhere bash exists.
#   bash scripts/test-disk-guard-protection.sh
set -uo pipefail

GUARD="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/deploy/server/disk-guard.sh"

# Extract is_protected() from the real script so the test can never drift.
eval "$(sed -n '/^is_protected() {/,/^}/p' "$GUARD")"

LIVE="/srv/sites/jogiinvisiblegrills/releases/20260814190000"
PROTECTED=$'\n'"$LIVE"$'\n'

pass=0
fail=0
check() {
  local desc="$1" path="$2" mode="$3" want="$4"
  local got="no"
  is_protected "$path" "$mode" && got="yes"
  if [[ "$got" == "$want" ]]; then
    pass=$((pass + 1))
    echo "  ok   $desc"
  else
    fail=$((fail + 1))
    echo "  FAIL $desc (want protected=$want, got=$got)"
  fi
}

echo "is_protected() — live release: $LIVE"
check "live release itself"            "$LIVE"                              strict yes
check "live node_modules (the 502 bug)" "$LIVE/node_modules"                strict yes
check "live node_modules/next"          "$LIVE/node_modules/next"           strict yes
check "live .next/static"               "$LIVE/.next/static"                strict yes
check "live public/images"              "$LIVE/public/images"               strict yes
check "releases dir containing live"    "/srv/sites/jogiinvisiblegrills/releases" strict yes
check "old sibling release"             "/srv/sites/jogiinvisiblegrills/releases/20260101000000" strict no
check "another site's release"          "/srv/sites/devasafetynets/releases/20260101000000"      strict no
check "live .next/cache in cache mode"  "$LIVE/.next/cache"                 cache  no
check "live node_modules/.cache (cache)" "$LIVE/node_modules/.cache"        cache  no
check "live node_modules in cache mode"  "$LIVE/node_modules"               cache  no
check "live release itself, cache mode"  "$LIVE"                            cache  yes

echo
echo "passed=$pass failed=$fail"
[[ "$fail" -eq 0 ]]
