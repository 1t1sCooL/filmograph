#!/bin/sh
set -e
# Next.js должен успеть подняться до nginx
node server.js &
sleep 3
exec nginx -g "daemon off;"
