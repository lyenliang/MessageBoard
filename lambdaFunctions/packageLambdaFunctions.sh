#!/bin/bash

DEST_PATH=deploymentPackages

zip -r ${DEST_PATH}/crudMessage.zip index.js config lib node_modules
