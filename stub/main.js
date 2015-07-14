state.tokens = state.tokens || [];
state.pricewatch = state.pricewatch || [];
state.dncrPhoneNumbers = state.dncrPhoneNumbers || {};
state.dncrCredit = state.dncrCredit || 500;
var MAX_TOKENS = 10;
var MAX_SAVED_PRICEWATCH_REQS = 20;
var MAX_SAVED_DNCR_REQS = 6;


var scopes = {
    readBookings: "api.bookings.read",
    createPriceWatchSubscription: "api.pricewatch.subscription.create",
    readPriceWatchSubscription: "api.pricewatch.subscription.read",
    washPhoneNumbers: "api.dncr.wash"
};

Sandbox.define('/api/rest/bookings/:pnrId', 'get', function(request, response) {
    authenticate(request, response, scopes['readBookings'], function() {
        var pnrId = request.params.pnrId;

        var registeredPnrs = ["P9582P", "VF6RGA", "QEVW8N", "QH8TRX",
                              "V7FPPY", "V5FVPB", "Y8LZXI", "GYI2QM"];

        if (registeredPnrs.indexOf(pnrId) > 0) {
            return response.render('booking_' + pnrId);
        } else {
            response.json(200, getRandomBookingResponse(pnrId));
        }
    });
});

Sandbox.define('/api/rest/pricewatch/subscriptions', 'post', function(request, response) {
    authenticate(request, response, scopes['createPriceWatchSubscription'], function() {
        var requestMessage = _.pick(request, ['path', 'method', 'headers', 'body']);
        requestMessage.timestamp = moment().utc().format();
        state.pricewatch.push(requestMessage);

        // Remove the oldest element if we have exceeded the limit of saved requests
        if (state.pricewatch.length > MAX_SAVED_PRICEWATCH_REQS) {
            state.pricewatch.splice(0, 1);
        }
        response.json(203, { status: "OK", message: "Successfully saved subscriptions" });
    });
});

Sandbox.define('/api/rest/pricewatch/subscriptions', 'get', function(request, response) {
    authenticate(request, response, scopes['readPriceWatchSubscription'], function() {
        response.json(200, state.pricewatch);
    });
});

Sandbox.define('/api/rest/dncr/washedPhoneNumbers', 'post', function(request, response) {
    authenticate(request, response, scopes['washPhoneNumbers'], function() {
        var referenceId = request.body.referenceId;

        // If the reference ID matches one of these preconfigured values, then return an error response
        // to simulate error scenarios
        var errorReferenceIds = {
            JQ_701O0000000UtopIAC_Batch_2: {
                httpStatusCode: 500,
                errorCode:      "API_ERR_1502",
                errorMessage:   "Provider system error: Subscription does not exist or has expired"
            },
            JQ_701O0000000UtouIAC_Batch_3: {
                httpStatusCode: 500,
                errorCode:      "API_ERR_1505",
                errorMessage:   "Provider system error: Insufficient account balance"
            },
            JQ_701O0000000UtozIAC_Batch_1: {
                httpStatusCode: 408,
                errorCode:      "API_ERR_0408",
                errorMessage:   "Timeout waiting for provider system to respond"
            },
            JQ_701O0000000UtozIAC_Batch_3: {
                httpStatusCode: 408,
                errorCode:      "API_ERR_0408",
                errorMessage:   "Timeout waiting for provider system to respond"
            },
            JQ_701O0000000UtzSIAS_Batch_1: {
                httpStatusCode: 400,
                errorCode:      "API_ERR_0400",
                errorMessage:   "Request contains invalid parameters or values"
            },
             JQ_701O0000000UtzXIAS_Batch_1: {
                httpStatusCode: 500,
                errorCode:      "API_ERR_1501",
                errorMessage:   "Provider system error: Missing telemarketer ID, password or invalid input"
            },
            JQ_701O0000000UuPiIAK_Batch_1: {
                httpStatusCode: 500,
                errorCode:      "API_ERR_1503",
                errorMessage:   "Provider system error: User account does not exist or is inactive / suspended"
            },
            JQ_701O0000000Uue2IAC_Batch_2: {
                httpStatusCode: 408,
                errorCode:      "API_ERR_0408",
                errorMessage:   "Timeout waiting for provider system to respond"
            },
            JQ_701O0000000Uue2IAC_Batch_4: {
                httpStatusCode: 500,
                errorCode:      "API_ERR_1505",
                errorMessage:   "Provider system error: Insufficient account balance"
            },
            JQ_701O0000000Uue2IAC_Batch_6: {
                httpStatusCode: 408,
                errorCode:      "API_ERR_0408",
                errorMessage:   "Timeout waiting for provider system to respond"
            },
            JQ_701O0000000Uue2IAC_Batch_8: {
                httpStatusCode: 500,
                errorCode:      "API_ERR_1502",
                errorMessage:   "Provider system error: Subscription does not exist or has expired"
            },
            JQ_701O0000000Uue2IAC_Batch_10: {
                httpStatusCode: 408,
                errorCode:      "API_ERR_0408",
                errorMessage:   "Timeout waiting for provider system to respond"
            },
            JQ_701O0000000Uue2IAC_Batch_12: {
                httpStatusCode: 408,
                errorCode:      "API_ERR_0408",
                errorMessage:   "Timeout waiting for provider system to respond"
            },
            JQ_701O0000000Uue2IAC_Batch_14: {
                httpStatusCode: 408,
                errorCode:      "API_ERR_0408",
                errorMessage:   "Timeout waiting for provider system to respond"
            },
            JQ_701O0000000UumfIAC_Batch_05: {
                httpStatusCode: 500,
                errorCode:      "API_ERR_1505",
                errorMessage:   "Provider system error: Insufficient account balance"
            },
            JQ_701O0000000UumfIAC_Batch_10: {
                httpStatusCode: 500,
                errorCode:      "API_ERR_1502",
                errorMessage:   "Provider system error: Subscription does not exist or has expired"
            },
            JQ_701O0000000UumfIAC_Batch_12: {
                httpStatusCode: 408,
                errorCode:      "API_ERR_0408",
                errorMessage:   "Timeout waiting for provider system to respond"
            },
            JQ_701O0000000UumfIAC_Batch_13: {
                httpStatusCode: 408,
                errorCode:      "API_ERR_0408",
                errorMessage:   "Timeout waiting for provider system to respond"
            },
            JQ_701O0000000UumfIAC_Batch_15: {
                httpStatusCode: 408,
                errorCode:      "API_ERR_0408",
                errorMessage:   "Timeout waiting for provider system to respond"
            },
            JQ_701O0000000UumfIAC_Batch_17: {
                httpStatusCode: 408,
                errorCode:      "API_ERR_0408",
                errorMessage:   "Timeout waiting for provider system to respond"
            },
            JQ_701O0000000UumfIAC_Batch_24: {
                httpStatusCode: 408,
                errorCode:      "API_ERR_0408",
                errorMessage:   "Timeout waiting for provider system to respond"
            },
            JQ_701O0000000UumfIAC_Batch_25: {
                httpStatusCode: 500,
                errorCode:      "API_ERR_1503",
                errorMessage:   "Provider system error: User account does not exist or is inactive / suspended"
            }
        };

        var errorForThisReferenceId = errorReferenceIds[referenceId];
        if (errorForThisReferenceId !== undefined) {

            // If the error is a timeout, then still create resource
            // to simulate the actual DNCR service behaviour
            if (errorForThisReferenceId.httpStatusCode === 408) {
                createWashedPhoneNumbersResource(request);
            }

            return response.json(errorForThisReferenceId.httpStatusCode, {
               error_message: errorForThisReferenceId.errorMessage,
               error_code: errorForThisReferenceId.errorCode
            });
        }

        response.set("Location", "/api/rest/dncr/washedPhoneNumbers/" + referenceId)
        response.json(201, createWashedPhoneNumbersResource(request));
    });
});

function createWashedPhoneNumbersResource(request) {
    var referenceId = request.body.referenceId;

    // Simulate account balance
    var accountBalance = state.dncrCredit - request.body.phoneNumbers.length;
    if (accountBalance <= 0) accountBalance = 500; // Top up balance if it is exhausted
    state.dncrCredit = accountBalance;

    var washedPhoneNumbers = {
        phoneNumbers: [],
        metadata: {
            accountBalance: accountBalance,
            transactionId: "tx" + referenceId,
            finishDate: moment().zone("+10:00").format("YYYY-MM-DD[T]hh:mm:ss")
        }
    };

    _.forEach(request.body.phoneNumbers, function(phoneNumber){
        washedPhoneNumbers.phoneNumbers.push({
            phoneNumber: phoneNumber,
            status: getPhoneNumberWashStatus(phoneNumber)
        });
    });

    // Save washed numbers for later retrieval
    state.dncrPhoneNumbers[referenceId] = washedPhoneNumbers;

    // Remove the oldest element if we have exceeded the limit of saved requests
    if (state.dncrPhoneNumbers.length > MAX_SAVED_DNCR_REQS) {
        state.dncrPhoneNumbers.splice(0, 1);
    }

    return washedPhoneNumbers;
}

function getPhoneNumberWashStatus(phoneNumber) {
    var registeredNumbers = ["0419605664", "0412388968", "0425682347", "0424573519", "0845525101",
        "0407751235", "0450306656", "0450306248", "0450306096", "0407751717", "0427768430", "0450306393",
        "0432414680", "0410615646", "0432019037", "0400086441", "0411193752", "0414450040", "0411193346",
        "0892299666", "0892299777", "0892299232", "0892299682", "0410679531", "0410415949", "0437349280",
        "0410634531", "0410294531", "0410679531", "0410679643"];

    if (registeredNumbers.indexOf(phoneNumber) > 0) return "Registered";
    else return "Not Registered";

    // Return a random status
    // return ["Registered", "Not Registered", "Invalid Format"][_.random(0, 2)]
}

Sandbox.define('/api/rest/dncr/washedPhoneNumbers/:referenceId', 'get', function(request, response) {
    authenticate(request, response, scopes['washPhoneNumbers'], function() {
        var referenceId = request.params.referenceId;

        // If the reference ID matches one of these preconfigured values, then return an error response
        // to simulate error scenarios
        var errorReferenceIds = {
            JQ_701O0000000UtozIAC_Batch_3: {
                httpStatusCode: 408,
                errorCode:      "API_ERR_0408",
                errorMessage:   "Timeout waiting for provider system to respond"
            },
            JQ_701O0000000Uue2IAC_Batch_12: {
                httpStatusCode: 408,
                errorCode:      "API_ERR_0408",
                errorMessage:   "Timeout waiting for provider system to respond"
            }
        };

        var errorForThisReferenceId = errorReferenceIds[referenceId];
        if (errorForThisReferenceId !== undefined) {
            return response.json(errorForThisReferenceId.httpStatusCode, {
               error_message: errorForThisReferenceId.errorMessage,
               error_code: errorForThisReferenceId.errorCode
            });
        }

        // Return preset values if reference ID "preset1" is provided
        var washedPhoneNumbers;
        if (referenceId === 'preset1') {
            washedPhoneNumbers = {
                phoneNumbers: [
                    {phoneNumber: "0419605664", status: "Registered"},
                    {phoneNumber: "0412388968", status: "Not Registered"},
                    {phoneNumber: "0425682347", status: "Registered"},
                    {phoneNumber: "0424573519", status: "Not Registered"},
                    {phoneNumber: "0845525101", status: "Registered"},
                    {phoneNumber: "0407751235", status: "Invalid"},
                    {phoneNumber: "0450306656", status: "Not Registered"},
                    {phoneNumber: "0450306248", status: "Not Registered"},
                    {phoneNumber: "0450306096", status: "Not Registered"}
                ],
                metadata: {
                    transactionId: "presetTransactionId1",
                    finishDate: "2015-06-22T01:33:54"
                }
            }
        } else { // Otherwise, get the actual saved results from previous requests
            washedPhoneNumbers = state.dncrPhoneNumbers[referenceId];
        }

        if (washedPhoneNumbers === undefined) {
            response.send(404, {
                error_message: "The requested entity was not found",
                error_code:    "API_ERR_0404"
            });
        } else {
            delete washedPhoneNumbers.metadata.accountBalance; // account balance is not returned by ACMA so remove here
            response.json(200, washedPhoneNumbers);
        }
    });
});

Sandbox.define('/api/rest/dncr/account/balance', 'get', function(request, response) {
    authenticate(request, response, scopes['washPhoneNumbers'], function() {
        response.json(200, { accountBalance: state.dncrCredit });
    });
});

function authenticate(request, response, scope, callback) {
    var auth = request.headers['Authorization'];

    if (auth !== undefined && auth !== null) {

        var token = auth.match(/Bearer (.*)/i)[1];
        console.log("Token is: " + token);

        if (isTokenValid(token, scope)) {
            callback();

        } else {
            response.send(403, "Invalid Credentials");
        }
    } else {
        response.send(401, "Access Denied");
    }
}

Sandbox.define('/oauth/token', 'post', function(request, response) {
    var grant_type,
        client_id,
        client_secret;

    if (request.body) {
        grant_type = request.body.grant_type;
        client_id = request.body.client_id;
        client_secret = request.body.client_secret;
    } else { // attempt to read from query params
        grant_type = request.query.grant_type;
        client_id = request.query.client_id;
        client_secret = request.query.client_secret;
    }

    console.log("Token request: grant_type=" + grant_type + ", client_id=" + client_id);

    if (grant_type === 'client_credentials') {
        var scope = null;
        if (client_id === 'salesforceClient' && client_secret === 'aHardToGuessSecret4851') {
            scope = [
                scopes['readBookings'],
                scopes['washPhoneNumbers']
            ];

        } else if (client_id === 'priceWatch' && client_secret === 'stAy7uned8392') {
            scope = [scopes['createPriceWatchSubscription']];

        } else if (client_id === 'admin' && client_secret === 'iAmAn@dministrat0r3920') {
            scope = [
                scopes['readBookings'],
                scopes['createPriceWatchSubscription'],
                scopes['readPriceWatchSubscription'],
                scopes['washPhoneNumbers']
            ];
        }

        if (scope !== null) {
            response.json(200, {
                access_token: makeToken(scope),
                token_type: "Bearer",
                expires_in: 3599,
                scope: scope
            });
        }

    } else {
        response.send(401, 'Access Denied');
    }
});

function getRandomBookingResponse(pnrId) {
    var resps = [];
    resps.push( '{\n' +
                '  "readBookingResponse" : {\n' +
                '    "bookingAgentCode" : "GDSMaster",\n' +
                '    "bookingChannelType" : "GDS",\n' +
                '    "bookingContactInformations" : [ {\n' +
                '      "addressCity" : null,\n' +
                '      "addressCountryCode" : null,\n' +
                '      "addressLine1" : "IATA",\n' +
                '      "addressLine2" : "Iata Unknown: 0086978",\n' +
                '      "addressLine3" : null,\n' +
                '      "addressPostalCode" : null,\n' +
                '      "addressProvinceState" : null,\n' +
                '      "cultureCode" : null,\n' +
                '      "customerNumber" : null,\n' +
                '      "emailAddress" : null,\n' +
                '      "firstName" : "JOHN",\n' +
                '      "homePhone" : null,\n' +
                '      "lastName" : "SMITH",\n' +
                '      "mobilePhone" : "650 222-4444 - OWAY ",\n' +
                '      "title" : null,\n' +
                '      "workPhone" : "650 222-4444 OWAY LL"\n' +
                '    } ],\n' +
                '    "bookingDate" : "2015-04-08T07:21:08.423Z",\n' +
                '    "bookingStatus" : "Hold",\n' +
                '    "journeySegments" : [ {\n' +
                '      "flightCarrierCode" : "3K",\n' +
                '      "flightDestination" : "SIN",\n' +
                '      "flightNumber" : " 516",\n' +
                '      "flightOrigin" : "BKK",\n' +
                '      "flightScheduledArrivalTime" : "2015-05-12T16:10:00",\n' +
                '      "flightScheduledDepartureTime" : "2015-05-12T12:50:00"\n' +
                '    } ],\n' +
                '    "passengerInformations" : [ {\n' +
                '      "customerNumber" : null,\n' +
                '      "firstName" : "JOHN",\n' +
                '      "gender" : "Male",\n' +
                '      "lastName" : "SMITH",\n' +
                '      "passengerNumber" : 0,\n' +
                '      "title" : null\n' +
                '    } ],\n' +
                '    "passengerNameRecordId" : "' + pnrId + '"\n' +
                '  }\n' +
                '}\n');

    resps.push( '{\n' +
                '  "readBookingResponse" : {\n' +
                '    "bookingAgentCode" : "XTRN01",\n' +
                '    "bookingChannelType" : "Direct",\n' +
                '    "bookingContactInformations" : [ {\n' +
                '      "addressCity" : "FAKEGROVE",\n' +
                '      "addressCountryCode" : "AU",\n' +
                '      "addressLine1" : "101 FAKEY FAKERSON ST",\n' +
                '      "addressLine2" : null,\n' +
                '      "addressLine3" : null,\n' +
                '      "addressPostalCode" : 1500,\n' +
                '      "addressProvinceState" : "QLD",\n' +
                '      "cultureCode" : "en-US",\n' +
                '      "customerNumber" : null,\n' +
                '      "emailAddress" : "fake@faker.com",\n' +
                '      "firstName" : "John",\n' +
                '      "homePhone" : "0393211234",\n' +
                '      "lastName" : "Smith",\n' +
                '      "mobilePhone" : "0401234567",\n' +
                '      "title" : "MR",\n' +
                '      "workPhone" : null\n' +
                '    } ],\n' +
                '    "bookingDate" : "2015-03-27T06:04:29.263Z",\n' +
                '    "bookingNotes" : [ {\n' +
                '      "creationDate" : "2015-03-27T06:11:40.067Z",\n' +
                '      "text" : "TT price $ 45.00AUD/pax\\nJQ price $ 69.00 AUD/ pax\\nTT price - 10% $40.50 AUD/pax\\n \\nCHARGED PAX $ 56.00AUD, LEFT $ 28.50 AUD OOB\\n\\nJohn called to make the booking.\\nAdv Starter Fare rules, read back flight details.\\nConfirmed payment of $ 56.00 AUD including baggage\\nAdv to check in 2-hour prior at Domestic terminal with Photo ID.\\nAdded baggage SSR BG15\\nCharged $ 15.00 AUD for baggage\\nAdv can bring one carry on bag weighing no more than 7 KG.\\nOffered car hire, pax declined\\nAdv 72 hrs TAT for itin\\nQueued to <%OFFJQ \\nSaved screenshot as XYFCNP_TLPeabody_27Mar2014\\n\\nPea_XTRN01_TLPeabody",\n' +
                '      "type" : "Default"\n' +
                '    } ],\n' +
                '    "bookingStatus" : "Confirmed",\n' +
                '    "journeySegments" : [ {\n' +
                '      "flightCarrierCode" : "JQ",\n' +
                '      "flightDestination" : "MEL",\n' +
                '      "flightNumber" : " 710",\n' +
                '      "flightOrigin" : "HBA",\n' +
                '      "flightScheduledArrivalTime" : "2015-04-29T17:45:00",\n' +
                '      "flightScheduledDepartureTime" : "2015-04-29T16:30:00"\n' +
                '    } ],\n' +
                '    "passengerInformations" : [ {\n' +
                '      "customerNumber" : null,\n' +
                '      "firstName" : "John",\n' +
                '      "gender" : "Male",\n' +
                '      "lastName" : "Smith",\n' +
                '      "passengerNumber" : 0,\n' +
                '      "ssrInformations" : [ {\n' +
                '        "ssrCode" : "BG15",\n' +
                '        "ssrDetail" : null\n' +
                '      } ],\n' +
                '      "title" : "MR"\n' +
                '    } ],\n' +
                '    "passengerNameRecordId" : "' + pnrId + '",\n' +
                '    "payments" : [ {\n' +
                '      "amount" : 56.0,\n' +
                '      "currencyCode" : "AUD",\n' +
                '      "method" : "MC",\n' +
                '      "status" : "Declined"\n' +
                '    }, {\n' +
                '      "amount" : 56.0,\n' +
                '      "currencyCode" : "AUD",\n' +
                '      "method" : "MC",\n' +
                '      "status" : "Declined"\n' +
                '    }, {\n' +
                '      "amount" : 56.0,\n' +
                '      "currencyCode" : "AUD",\n' +
                '      "method" : "VI",\n' +
                '      "status" : "Approved"\n' +
                '    } ]\n' +
                '  }\n' +
                '}\n');

    resps.push( '{\n' +
                '  "readBookingResponse" : {\n' +
                '    "bookingAgentCode" : "jaiy01",\n' +
                '    "bookingChannelType" : "Direct",\n' +
                '    "bookingContactInformations" : [ {\n' +
                '      "addressCity" : "Test",\n' +
                '      "addressCountryCode" : "AU",\n' +
                '      "addressLine1" : "Test",\n' +
                '      "addressLine2" : "  ",\n' +
                '      "addressLine3" : "  ",\n' +
                '      "addressPostalCode" : 3000,\n' +
                '      "addressProvinceState" : "VIC",\n' +
                '      "cultureCode" : "en-AU",\n' +
                '      "customerNumber" : null,\n' +
                '      "emailAddress" : "test@test.com",\n' +
                '      "firstName" : "john",\n' +
                '      "homePhone" : 5555555555,\n' +
                '      "lastName" : "smith",\n' +
                '      "mobilePhone" : "+615555555555",\n' +
                '      "title" : "MR",\n' +
                '      "workPhone" : null\n' +
                '    } ],\n' +
                '    "bookingDate" : "2015-03-23T02:04:55.82Z",\n' +
                '    "bookingNotes" : [ {\n' +
                '      "creationDate" : "2015-03-23T02:04:55.82Z",\n' +
                '      "text" : "Advised of fare rules",\n' +
                '      "type" : "Default"\n' +
                '    } ],\n' +
                '    "bookingStatus" : "Confirmed",\n' +
                '    "journeySegments" : [ {\n' +
                '      "flightCarrierCode" : "JQ",\n' +
                '      "flightDestination" : "SIN",\n' +
                '      "flightNumber" : "   7",\n' +
                '      "flightOrigin" : "MEL",\n' +
                '      "flightScheduledArrivalTime" : "2015-03-25T16:45:00",\n' +
                '      "flightScheduledDepartureTime" : "2015-03-25T12:00:00"\n' +
                '    } ],\n' +
                '    "passengerInformations" : [ {\n' +
                '      "customerNumber" : null,\n' +
                '      "firstName" : "john",\n' +
                '      "gender" : "Male",\n' +
                '      "lastName" : "smith",\n' +
                '      "passengerNumber" : 0,\n' +
                '      "title" : "MR"\n' +
                '    }, {\n' +
                '      "customerNumber" : null,\n' +
                '      "firstName" : "smith",\n' +
                '      "gender" : "Male",\n' +
                '      "lastName" : "smith",\n' +
                '      "passengerNumber" : 1,\n' +
                '      "ssrInformations" : [ {\n' +
                '        "ssrCode" : "BG25",\n' +
                '        "ssrDetail" : null\n' +
                '      } ],\n' +
                '      "title" : null\n' +
                '    } ],\n' +
                '    "passengerNameRecordId" : "' + pnrId + '",\n' +
                '    "payments" : [ {\n' +
                '      "amount" : 784.0,\n' +
                '      "currencyCode" : "AUD",\n' +
                '      "method" : "CA",\n' +
                '      "status" : "Approved"\n' +
                '    } ]\n' +
                '  }\n' +
                '}\n');

    return resps[randomNumberFromZeroTo(resps.length) - 1];
}

function randomNumberFromZeroTo(max) {
    return Math.floor(Math.random() * max + 1);
}

function randomNumber() {
    // Generate random number and convert to base 36 (0-9a-z), then use substr to remove leading "0."
    return Math.random().toString(36).substr(2);
}

function addSecondsToDate(date, seconds) {
    return new Date(date.getTime() + seconds * 1000);
}

function makeToken(scope) {
    var tokenValue = randomNumber() + randomNumber();
    var tokenExpiryTime = addSecondsToDate(new Date(), 3600);
    state.tokens[tokenValue] = {scope: scope, expiry: tokenExpiryTime};

    // If we have created too many tokens, delete the oldest
    if (state.tokens.length > MAX_TOKENS) {
        state.tokens.splice(0, 1);
    }

    return tokenValue;
}

function isTokenValid(token, scope) {
    var now = new Date();

    var savedToken = state.tokens[token];

    if (savedToken === undefined) {
        return false;

    } else {
        var isValid =   token !== undefined &&
                        token !== null &&
                        savedToken.scope.indexOf(scope) !== -1 &&
                        savedToken.expiry > now;
        return isValid;
    }
}

