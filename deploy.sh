#!/bin/bash

git add .
git commit -m "update qs"
git push heroku main
git push -u origin main

