import {RootState} from "store/store";
import {Message} from "store/reducer/types/Message";

export const selectIsMessageRead = (state: RootState) => {
  const messages: Message[] = state.appReducer.messages;

  return messages.filter(message => !message.isRead).length > 0
}