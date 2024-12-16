# Collecting feedbacks with buttons - 10.7
## deployment
https://cookies-feedbacks.deno.dev/courses

## commands
curl localhost:8000
curl -X POST localhost:8000
curl -v -X POST -d x="y" localhost:8000

## for async: 
deno run --allow-net --allow-read --unstable-kv --watch app-run.js

# DEPLOYMENT
## to install the tool
deno install -Arf https://deno.land/x/deploy/deployctl.ts
## to deploy a project
deployctl deploy --token=YOUR-TOKEN --project=PROJECT-NAME app-run.js


# USED:
- DENO, Eta;
- crypto.randomUUID() method for creating a universally unique identifier (UUID version 4) string that is used as the identifier and the key; UUIDs are a common way of identifying resources. They are 128-bit numbers that are designed for being unique without central coordination (i.e. a service that would keep track of which identifier to assign next). UUIDs are standardized in RFC 4122.

## POST explanations
curl -X POST localhost:8000

curl -X POST -d name="My Name" -d address="My Address" localhost:8000/addresses
- Sending data with the curl command is done using the **-d flag**, which is followed by the data that we wish to send to the server. To send multiple values, we can provide the -d flag multiple times.

curl -X POST -d "name=My+Another+Name&address=My+Another+Address" localhost:8000/addresses
- It is also possible to enter the data that is sent to the server as a single string, as outlined in the next example. The **+ symbol** indicates a space, while **&** separates submitted form elements from each other.

curl -v -X POST localhost:8000
- -v for verbose mode (details of the connection: headers, etc)

## Clear all the data from DenoKv
const clearFeedbackKeys = async () => {
  const kv = await Deno.openKv();

  // Get keys with the prefix "feedbacks"
  const iter = kv.list({ prefix: ["feedbacks"] });

  const batch = kv.atomic();
  for await (const entry of iter) {
    batch.delete(entry.key);
  }

  await batch.commit();

  console.log("Feedback keys cleared.");
};