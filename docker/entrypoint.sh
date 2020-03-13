#!/bin/bash
set -e

if [ -z "${REACT_APP_HOST_NAME}" ] || [ -z "${REACT_APP_LOGIN_URL}" ] || [ -z "${REACT_APP_URL}" ]; then
  echo "Service should be configured!"
  echo "Set environment variables REACT_APP_HOST_NAME, REACT_APP_LOGIN_URL, REACT_APP_URL"
  exit 1
fi

sed -i "s,^\s*REACT_APP_HOST_NAME.*,  REACT_APP_HOST_NAME: '${REACT_APP_HOST_NAME}'\,,g" /var/www/env.js
sed -i "s,^\s*REACT_APP_LOGIN_URL.*,  REACT_APP_LOGIN_URL: '${REACT_APP_LOGIN_URL}'\,,g" /var/www/env.js
sed -i "s,^\s*REACT_APP_URL.*,  REACT_APP_URL: '${REACT_APP_URL}'\,,g" /var/www/env.js

exec "$@"
