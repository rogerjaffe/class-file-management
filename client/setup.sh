#! /bin/bash
cd /usr/bin/cfm/client
node ./test
notify-send -t 3000 'echo hello world'
