#!/bin/bash

gcloud functions deploy p4-test-swarm --source ./api --trigger-http --allow-unauthenticated --runtime python310 --timeout 300
