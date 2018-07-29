#!/bin/sh

setup_git() {
  git config --global user.email "vnwijetu@uwaterloo.ca"
  git config --global user.name "nimwijetunga"
  git remote add origin https://${GH_TOKEN}@github.com/nimwijetunga/nimwijetunga.git > /dev/null 2>&1
}

commit_website_files() {
  git checkout master
  git merge development
  # git commit --message "Travis build: $TRAVIS_BUILD_NUMBER"
}

upload_files() {
  git push origin master
}

echo "Starting Setup"
setup_git
echo "Merging master with development"
commit_website_files
echo "Pushing to master"
upload_files
echo "DONE"