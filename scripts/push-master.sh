#!/bin/sh

setup_git() {
  git config --global user.email "vnwijetu@uwaterloo.ca"
  git config --global user.name "nimwijetunga"
}

commit_website_files() {
  git checkout -b master
  git add .
  git commit --message "Travis build: $TRAVIS_BUILD_NUMBER merge"
}

upload_files() {
  git remote add origin https://${GH_TOKEN}@github.com/nimwijetunga/nimwijetunga.git > /dev/null 2>&1
  https://github.com/nimwijetunga/nimwijetunga.git
  git push --quiet --set-upstream origin master
}

echo "Starting Setup"
setup_git
echo "Merging master with development"
commit_website_files
echo "Pushing to master"
upload_files
echo "DONE"