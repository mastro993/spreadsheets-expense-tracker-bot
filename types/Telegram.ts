export namespace Telegram {
  // https://core.telegram.org/bots/api#user
  export type User = {
    id: number;
    is_bot: boolean;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: string;
    added_to_attachment_menu?: boolean;
    can_join_groups?: boolean;
    can_read_all_group_messages?: boolean;
    supports_inline_queries?: boolean;
  };

  // https://core.telegram.org/bots/api#chat
  export type Chat = {
    id: string;
    type: string;
    title?: string;
    username?: string;
    first_name?: string;
    last_name?: string;
  };

  // https://core.telegram.org/bots/api#message
  export type Message = {
    message_id: number;
    message_thread_id?: number;
    from?: User;
    sender_chat?: Chat;
    date: number;
    chat: Chat;
    forward_from?: User;
    forward_from_chat?: Chat;
    forward_from_message_id?: Number;
    text?: string;
    reply_to_message?: Message;
  };

  export type CallbackQuery = {
    id: string;
    from: User;
    message?: Message;
    inline_message_id?: string;
    chat_instance: string;
    data?: string;
    game_short_name?: string;
  };

  // https://core.telegram.org/bots/api#update
  export type Update = {
    update_id: number;
    message?: Message;
    edited_message?: Message;
    channel_post?: Message;
    callback_query?: CallbackQuery;
  };

  export namespace Keyboard {
    // https://core.telegram.org/bots/api#keyboardbuttonrequestuser
    export type KeyboardButtonRequestUser = {
      request_id: number;
      user_is_bot?: boolean;
      user_is_premium?: boolean;
    };
    // https://core.telegram.org/bots/api#keyboardbuttonrequestchat
    export type KeyboardButtonRequestChat = {
      request_id: number;
      chat_is_channel: boolean;
      chat_is_forum?: boolean;
      chat_has_username?: boolean;
      chat_is_created?: boolean;
      user_administrator_rights: any; // TODO
      bot_administrator_rights: any; // TODO
      bot_is_member?: boolean;
    };
    // https://core.telegram.org/bots/api#keyboardbutton
    export type KeyboardButton = {
      text: string;
      request_user?: KeyboardButtonRequestUser;
      request_chat?: KeyboardButtonRequestChat;
      request_contact?: boolean;
      request_location?: boolean;
      request_poll?: { type: string };
      web_app?: { url: string };
    };
    // https://core.telegram.org/bots/api#inlinekeyboardmarkup
    export type InlineKeyboardButton = {
      text: string;
      url?: string;
      callback_data?: string;
      web_app?: { url: string };
      login_url?: any; // TODO
      switch_inline_query?: string;
      switch_inline_query_current_chat?: string;
      switch_inline_query_chosen_chat?: any; // TODO
      pay?: boolean;
    };

    // https://core.telegram.org/bots/api#inlinekeyboardmarkup
    export type InlineKeyboardMarkup = {
      inline_keyboard: InlineKeyboardButton[][];
    };

    // https://core.telegram.org/bots/api#replykeyboardmarkup
    export type ReplyKeyboardMarkup = {
      keyboard: KeyboardButton[][];
      is_persistent?: boolean;
      resize_keyboard?: boolean;
      one_time_keyboard?: boolean;
      input_field_placeholder?: string;
      selective?: boolean;
    };

    // https://core.telegram.org/bots/api#replykeyboardremove
    export type ReplyKeyboardRemove = {
      remove_keyboard: boolean;
      selective?: boolean;
    };
  }

  export namespace Commands {
    // https://core.telegram.org/bots/api#botcommand
    export type BotCommand = {
      command: string;
      description: string;
    };

    // https://core.telegram.org/bots/api#botcommandscopedefault
    export type BotCommandScopeDefault = {
      type: "default";
    };

    // https://core.telegram.org/bots/api#botcommandscopeallprivatechats
    export type BotCommandScopeAllPrivateChats = {
      type: "all_private_chats";
    };

    // https://core.telegram.org/bots/api#botcommandscopeallgroupchats
    export type BotCommandScopeAllGroupChats = {
      type: "all_group_chats";
    };

    // https://core.telegram.org/bots/api#botcommandscopeallchatadministrators
    export type BotCommandScopeAllChatAdministrators = {
      type: "all_chat_administrators";
    };

    // https://core.telegram.org/bots/api#botcommandscopechat
    export type BotCommandScopeChat = {
      type: "chat";
      chat_id: string | number;
    };

    // https://core.telegram.org/bots/api#botcommandscope
    export type BotCommandScope =
      | BotCommandScopeDefault
      | BotCommandScopeAllPrivateChats
      | BotCommandScopeAllGroupChats
      | BotCommandScopeAllChatAdministrators
      | BotCommandScopeChat;
  }

  export namespace Payload {
    // https://core.telegram.org/bots/api#forcereply
    export type ForceReply = {
      force_reply: boolean;
      input_field_placeholder?: string;
      selective?: boolean;
    };

    // https://core.telegram.org/bots/api#sendmessage
    export type SendMessage = {
      chat_id: number | string;
      message_thread_id?: string;
      text: string;
      parse_mode?: string;
      entities?: any;
      disable_web_page_preview?: boolean;
      disable_notification?: boolean;
      protect_content?: boolean;
      reply_to_message_id?: number;
      allow_sending_without_reply?: boolean;
      reply_markup?:
        | Keyboard.InlineKeyboardMarkup
        | Keyboard.ReplyKeyboardMarkup
        | Keyboard.ReplyKeyboardRemove
        | ForceReply;
    };

    // https://core.telegram.org/bots/api#editmessagetext
    export type EditMessageText =
      | {
          chat_id: number | string;
          message_id: number;
          inline_message_id?: never;
        }
      | {
          chat_id?: never;
          message_id?: number;
          inline_message_id: string;
        }
      | {
          text: string;
          parse_mode?: string;
          entities?: any;
          disable_web_page_preview?: boolean;
          reply_markup?:
            | Keyboard.InlineKeyboardMarkup
            | Keyboard.ReplyKeyboardMarkup
            | Keyboard.ReplyKeyboardRemove
            | ForceReply;
        };

    // https://core.telegram.org/bots/api#deletemessage
    export type DeleteMessage = {
      chat_id: string;
      message_id: string;
    };

    // https://core.telegram.org/bots/api#setmycommands
    export type SetMyCommands = {
      commands: Commands.BotCommand[];
      scope: Commands.BotCommandScope;
      language_code: string;
    };
  }
}
