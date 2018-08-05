#!/bin/sh

git checkout master
git merge development
git push
git checkout development
