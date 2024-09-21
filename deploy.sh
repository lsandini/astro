#!/bin/bash

git add .
git commit -m "add libre-monitor"
git push heroku main
git push -u origin main

