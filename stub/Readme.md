Ace Mocks
=========

Provides the following mock services for API clients:

  * Authentication - OAuth2 client credentials grant flow
  * Read Bookings API
  * PriceWatch Subscription API

## Authentication - OAuth2 client credentials grant flow

Endpoint: `/oauth/token`.

Token grant service. Accepts client credentials in return for an access token. 

### Example

Request:

```
curl -X POST https://aces.getsandbox.com/oauth/token \
-d "grant_type=client_credentials" \
-d "client_id=salesforceClient" \
-d "client_secret=aHardToGuessSecret4851"
```

Response:

```
HTTP/1.1 200 OK
Content-Type: application/json
[... other headers omitted ...]

{ 
  "access_token":"q7aop868xc4wnbktidkwng66rghxf8rwdqdp9xnbs8c40a4i", 
  "token_type":"Bearer", 
  "expires_in":3599, 
  "scope":"api.bookings.read"
}
```


## Read Bookings API

Endpoint: `/api/rest/bookings/:pnrId`.

Read Bookings API request. A PNR is provided, booking details are returned. 

### Example

Request:

```
curl -X GET https://aces.getsandbox.com/api/rest/bookings/BD12F8 \
-H "Authorization: Bearer {accessToken}"
```

Response:

```
HTTP/1.1 200 OK
Content-Type: application/json
[... other headers omitted ...]

{ 
   [... canned booking content ...]
}
```


## PriceWatch Subscription API

Endpoint: `/api/rest/pricewatch/subscriptions`.

Real-time PriceWatch subscription data feeds. Customer and subscription information is provided, an acknowledgement is returned.

### Example

Request:

```
curl -X POST https://aces.getsandbox.com/api/rest/pricewatch/subscriptions \
-H "Authorization: Bearer {accessToken}" \
-H "Content-Type: application/json" \
-d @messages/pricewatch_subscribers1.json
```

Response:

```
HTTP/1.1 201 CREATED
Content-Type: application/json
[... other headers omitted ...]

{
  "status": "OK",
  "message": "Successfully processed subscriptions"
}
```

