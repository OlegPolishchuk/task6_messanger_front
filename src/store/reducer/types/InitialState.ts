import {User} from "store/reducer/types/User";
import {Message} from "store/reducer/types/Message";

export interface InitialState {
  user: User;
  isLoading: boolean;
  error: string | null;
  isEntered: boolean;
  messages: Message[];
  existedUsers: ExistedUsers[];
  socketId: string;
}

export interface ExistedUsers {
  userId: string;
  username: string;
}