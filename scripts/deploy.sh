#!/bin/bash

set -e # exit with nonzero exit code if anything fails

if [[ $TRAVIS_BRANCH == "development" && $TRAVIS_PULL_REQUEST == "false" ]]; then

echo "Starting to update master\n"

#copy data we're interested in to other place
cp -R docs $HOME/docs

#go to home and setup git
cd $HOME
git config --global user.email "travis@travis-ci.org"
git config --global user.name "Travis"

#using token clone master branch
git clone --quiet --branch=master https://${GH_TOKEN}@github.com/nimwijetunga/nimwijetunga.git nimwijetunga > /dev/null

#go into directory and copy data we're interested in to that directory
cd nimwijetunga
cp -Rf $HOME/docs/* docs

echo "Allow files with underscore https://help.github.com/articles/files-that-start-with-an-underscore-are-missing/" > .nojekyll
echo "[View live](https://${GH_USER}.github.io/${GH_REPO}/)" > README.md

#add, commit and push files
git add -f .
git commit -m "Travis build $TRAVIS_BUILD_NUMBER"
git push -fq origin master > /dev/null

echo "Done updating master\n"

else
 echo "Skipped updating master, because build is not triggered from the master branch."
fi;