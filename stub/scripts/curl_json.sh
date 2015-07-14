#!/bin/sh

HTTP_URL="$1"
HTTP_VERB="$2"
HTTP_DATA="$3"

HTTP_HEADER="Content-Type: text/json; charset=utf-8"

# Note: To provide a file as the request body, prefix the '--data' argument with an '@'

if [ $# -lt 2 ]; then
    echo "ERROR: Insufficient arguments provided."
    echo "Usage: ${0} HTTP_URL http_verb [HTTP_DATA]" >&2
    exit 1
fi

if [[ -n "$HTTP_DATA" ]]; then
	curl --request $HTTP_VERB --header "$HTTP_HEADER" --data "$HTTP_DATA" "$HTTP_URL"
else
    echo "INFO: No request data provided." >&2
    curl --request $HTTP_VERB --header "$HTTP_HEADER" "$HTTP_URL"
fi

exit 0