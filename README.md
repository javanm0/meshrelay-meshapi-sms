Node.js application that sends messages using Twilio SMS API. This API accepts messages to be passed in from the MeshAPI-Messages and then forwards them to Twilio.

Use the following commands to deploy with Docker:

```
sudo docker pull meshrelay0/meshrelay-meshapi-sms
sudo docker run -d --network network_name -p 3020:3020 --name meshapi-sms \
-e PORT=3020 \
-e TWILIO_ACCOUNT_SID=twilio_account_sid \
-e TWILIO_AUTH_TOKEN=twilio_auth_token \
-e TWILIO_PHONE_NUMBER=twilio_phone_number \
--restart always \
meshrelay0/meshrelay-meshapi-sms
```
