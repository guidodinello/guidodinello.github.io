#!/bin/sh

# checks for any file with size greater than 500KB and rejects the commit if found providing the name of the file

# get the list of files to be committed
files=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(png|jpg|jpeg|gif|webp|svg)')

# set the maximum file size in bytes
# 1 MB -> 1048576 bytes
maxsize=1048576

for file in ${files}; do
    filesize=$(stat -c%s "$file")
    if [ "${filesize}" -gt "${maxsize}" ]; then
        echo "ERROR: ${file} is ${filesize} bytes, which is over the allowed limit of ${maxsize} bytes"
        echo "Consider using https://squoosh.app/ to reduce the file size."
        exit 1
    fi
done
