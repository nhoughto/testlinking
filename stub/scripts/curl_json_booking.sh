#!/bin/sh

HTTP_VERB="$1"
HTTP_DATA="$2"
ROUTE="$3" || ""

./curl_json.sh "http://aces.getsandbox.com/booking${ROUTE}" "$HTTP_VERB" "$HTTP_DATA"