#!/bin/bash

CREATE_MESSAGE=createMessage
READ_MESSAGES=readMessages
UPDATE_MESSAGE=updateMessage
DELETE_MESSAGE=deleteMessage

DEST_PATH=deploymentPackages

for func in ${CREATE_MESSAGE} ${READ_MESSAGES} ${UPDATE_MESSAGE} ${DELETE_MESSAGE}
do 
    rm ${func}
    zip -r ${DEST_PATH}/${func}.zip ${func}.js config lib node_modules
done
