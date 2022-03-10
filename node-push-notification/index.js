const express = require('express');
const webpush = require('web-push');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(express.static(path.join(__dirname, 'client')));
app.use(express.json());

const publicVapidKey = 'BORm_4DSCLKrBWu38W51jmS_C8nevyqW7ENUjq5hLcFBJFurMRdpXmCBgKU5XeubEXu4NuKXfcW3mxPFm7o13bs';
const privateVapidKey = 'CQYfZbjlS_lc_j35AF1L-S6mHUpksIoDLDUBP475O6s';

webpush.setVapidDetails('mailto:duypv98@gmail.com', publicVapidKey, privateVapidKey);

// Subscribe Route
app.post("/subscribe", (req, res) => {
  // Get Push Subscription Object
  /**
   * @type {webpush.PushSubscription}
   */
  const subsciption = req.body;
  // Send 201 created to client
  res.status(201).json({});

  // Create push subscription payload
  const payload = JSON.stringify({ title: "Push Test" });
  // Pass object to send notification
  webpush.sendNotification(subsciption, payload).catch((err) => console.log(err));
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
