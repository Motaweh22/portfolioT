git update-ref -d HEAD
git rm -rf --cached .
git add css/ js/ fonts/ index.html project.html photography.html update.bat package.json
git commit -m "Initial commit: Base files"
$env:GIT_ASKPASS=""
$env:GIT_TERMINAL_PROMPT="0"
git push -u origin main --force

git add content/home content/photography content/about content/settings
git commit -m "Add core content pages"
git push -u origin main

$folders = Get-ChildItem -Directory "content\architecture"
foreach ($folder in $folders) {
    git add "content\architecture\$($folder.Name)"
    git commit -m "Add project $($folder.Name)"
    git push -u origin main
}

git add content/architecture
git commit -m "Add architecture root files"
git push -u origin main
