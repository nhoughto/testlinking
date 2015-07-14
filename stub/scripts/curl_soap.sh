#!/bin/sh

SOAP_ACTION=$1
REQUEST_FILE=$2
SERVICE_URL=$3

if [ $# -lt 3 ]; then
    echo "Insufficient arguments provided."
    echo "Usage: ${0} <soap_action> <input_file_name> <service_url>" >&2
    exit 1
fi

if [ ! -f $REQUEST_FILE ]; then
    echo "File '$REQUEST_FILE does not exist." >&2
    exit 1
fi

curl \
-X POST \
-H "Content-Type: text/xml; charset=utf-8" \
-H "SOAPAction: ${SOAP_ACTION}" \
-d "@${REQUEST_FILE}" \
"$SERVICE_URL" \
