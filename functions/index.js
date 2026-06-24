const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();

/**
 * AUTO PUBLISH + PUSH NOTIFICATION (HTTP TEST VERSION)
 */
exports.autoPublishPosts = functions.https.onRequest(async (req, res) => {

  try {

    const now = new Date();

    const snapshot = await db.collection("posts")
      .where("status", "==", "scheduled")
      .get();

    if (snapshot.empty) {
      return res.send("No scheduled posts");
    }

    const batch = db.batch();
    let publishedTitles = [];

    snapshot.forEach(docSnap => {

      const data = docSnap.data();

      if (!data.publishAt) return;

      const publishAt = data.publishAt.toDate
        ? data.publishAt.toDate()
        : new Date(data.publishAt);

      if (publishAt <= now) {

        batch.update(docSnap.ref, {
          status: "published",
          publishedAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });

        publishedTitles.push(data.title || "New Post");
      }
    });

    await batch.commit();
    console.log("✔ Posts published");

    // If nothing published
    if (publishedTitles.length === 0) {
      return res.send("No posts ready to publish");
    }

    // Get users tokens
    const usersSnap = await db.collection("users").get();
    const tokenSet = new Set();

    usersSnap.forEach(u => {
      const user = u.data();

      if (Array.isArray(user.fcmTokens)) {
        user.fcmTokens.forEach(t => {
          if (t) tokenSet.add(t);
        });
      }
    });

    const tokens = Array.from(tokenSet);

    if (tokens.length === 0) {
      console.log("No FCM tokens found");
      return res.send("Published but no tokens found");
    }

    // FIXED: correct Firebase Admin method
    const response = await admin.messaging().sendMulticast({
      tokens,
      notification: {
        title: "📢 New Posts Published",
        body: `${publishedTitles.length} post(s) just went live`
      },
      data: {
        type: "POST_PUBLISH"
      }
    });

    console.log("✔ Push notifications sent", response.successCount);

    return res.send(
      `Published: ${publishedTitles.length}, Notifications sent: ${response.successCount}`
    );

  } catch (err) {
    console.error("Function error:", err);
    return res.status(500).send("Internal Server Error");
  }
});