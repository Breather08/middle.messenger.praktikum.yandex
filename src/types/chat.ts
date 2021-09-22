export type Message = {
  text: string;
  time: string;
};

export type ChatItem = {
  title: string;
  logo: string | typeof Image;
  lastMessage: Message;
};
