#!/bin/bash

# make a symlink from any file inside this directory to the .git/hooks directory. exclude this file.

SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)
for file in $(ls -A "${SCRIPT_DIR}" | grep -vE 'setup.sh'); do
    echo "Creating symlink for ${file}"
    file="${file//.sh/}"
    ln -s "${SCRIPT_DIR}/${file}" "${SCRIPT_DIR}/../.git/hooks/${file}"
done
