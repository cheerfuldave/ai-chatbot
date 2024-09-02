import axios from 'axios';

const PIPEDREAM_WEBHOOK_URL = process.env.PIPEDREAM_WEBHOOK_URL || '';
const GOHIGHLEVEL_API_KEY = process.env.GOHIGHLEVEL_API_KEY || '';

/**
 * Sends a user message to the Pipedream webhook.
 * @param message - The message text from the user.
 * @param conversationId - Unique identifier for the conversation.
 * @returns The response from the webhook.
 */
export const sendMessageToPipedream = async (message: string, conversationId: string) => {
  try {
    const response = await axios.post(PIPEDREAM_WEBHOOK_URL, {
      message,
      conversationId,
      apiKey: GOHIGHLEVEL_API_KEY,
    });

    return response.data;
  } catch (error) {
    console.error('Error sending message to Pipedream:', error);
    throw new Error('Failed to send message to the assistant.');
  }
};

/**
 * Receives a response message from Pipedream.
 * @param conversationId - Unique identifier for the conversation.
 * @returns The assistant's response message.
 */
export const receiveMessageFromPipedream = async (conversationId: string) => {
  try {
    const response = await axios.get(`${PIPEDREAM_WEBHOOK_URL}/responses`, {
      params: { conversationId },
      headers: {
        'Authorization': `Bearer ${GOHIGHLEVEL_API_KEY}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error receiving message from Pipedream:', error);
    throw new Error('Failed to receive message from the assistant.');
  }
};
