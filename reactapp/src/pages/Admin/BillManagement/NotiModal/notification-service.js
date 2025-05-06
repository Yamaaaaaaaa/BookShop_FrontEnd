import { createNoti } from "../../../../service/notiService"

  
export const sendNotification = async (notification) => {
  console.log("notification", notification);
  

    try {
      // Replace with your actual API endpoint
      const response = await createNoti(notification)
      
      if (response && response.status === 1) {
        return { status: 1, message: "Notification sent successfully", data: response.data }
      } else {
        return { status: 0, message: response.message || "Failed to send notification" }
      }
    } catch (error) {
      console.error("Error sending notification:", error)
      return { status: 0, message: "Failed to send notification" }
    }
  }
  