import { sendNotification } from "./notificationService.js";

export async function notifyUsers(userIds, title, message) {

  for (const uid of userIds) {

    await sendNotification({
      to: uid,
      title,
      message,
      type: "system"
    });

  }
}