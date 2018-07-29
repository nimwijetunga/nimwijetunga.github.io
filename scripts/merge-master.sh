#!/bin/sh

git remote add origin https://${GH_TOKEN}@github.com/nimwijetunga/nimwijetunga.git > /dev/null 2>&1
git checkout master
git merge development
git push
