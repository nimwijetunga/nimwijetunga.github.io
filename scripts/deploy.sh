#!/bin/bash

set -e # exit with nonzero exit code if anything fails

if [[ $TRAVIS_BRANCH == "development" && $TRAVIS_PULL_REQUEST == "false" ]]; then

echo "Starting to update master\n"

#copy releavent folders
# rsync -av --progress . $HOME/site --exclude node_modules #alternative needs nore work

cp -R docs $HOME/docs
cp -R backend $HOME/backend
cp -R scripts $HOME/scripts
cp -R uitests $HOME/uitests

#go to home and setup git
cd $HOME
git config --global user.email "travis@travis-ci.org"
git config --global user.name "Travis"

git clone --quiet --branch=master https://${GH_TOKEN}@github.com/nimwijetunga/nimwijetunga.git nimwijetunga > /dev/null

#copy files to repo
cd nimwijetunga
# cp -Rf $HOME/site/* 

cp -Rf $HOME/docs/* docs
cp -Rf $HOME/backend/* backend
cp -Rf $HOME/scripts/* scripts
cp -Rf $HOME/uitests/* uitests

#add, commit and push files to master branch
git add -f .
git commit -m "Travis build $TRAVIS_BUILD_NUMBER"
git push -fq origin master > /dev/null

echo "Done updating master\n"

else
 echo "Skipped updating master, because build is not triggered from the development branch."
fi;