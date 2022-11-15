IS_PRERELEASE=false
echo "gh release ${IS_PRERELEASE:+--prerelease}"

branch="release/v1.0.0"
echo "${branch#release/}"