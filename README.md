## What is this?
This is a demo to prototype how Fenced Frame can be used to retain GPay button's card info. This repo is to simulate the GPay server and the frame page that's in the button. Use this together with https://maxlgu.github.io/pr/fencedframe which is the test page (simulating the merchant side).

## Login
gcloud auth login

## Set current project
gcloud config set project maxlg-big-query-project

## deploy web app
gcloud app deploy app.standard.yaml
