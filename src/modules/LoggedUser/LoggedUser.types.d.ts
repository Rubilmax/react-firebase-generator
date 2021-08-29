declare interface LoggedUserState {
  id?: string;
  messagingToken?: string;
  claims?: { [claim: string]: any };
}

declare interface MessagingProfile extends WithHistory<{}> {
  tokens: string[];
}
