#!/usr/bin/env bash

FILENAMES="$1"

env_value=$(printenv FILES_TO_LOG)
if [ "$env_value" != "" ];then
    FILENAMES="$FILENAMES;$env_value"
fi


IFS=';' read -ra ADDR <<< "$FILENAMES"
cmd="sleep 0 "
for filename in "${ADDR[@]}"; do
    cmd="$cmd & tail -fn 0 $filename"
    echo "Waiting for $filename file to be created..."
    while [ ! -f "$filename" ]; do
        sleep 10
    done
done
bash -c "$cmd"