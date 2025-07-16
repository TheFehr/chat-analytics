
/** Message type in Threema export */
export type ThreemaMessageType =
    | "TEXT"
    // Add other message types as they are discovered
    ;

/** Message state in Threema export */
export type ThreemaMessageState =
    | "READ"
    | ""  // Empty state is possible as seen in the data
    ;

/** Interface representing a message in Threema export CSV format */
export interface ThreemaMessageRow {
    /** Unique API ID of the message */
    apiid: string;

    /** Unique user identifier */
    uid: string;

    /** Whether the message is outgoing (1) or incoming (0) */
    isoutbox: "0" | "1";

    /** Whether the message has been read (1) or not (0) */
    isread: "0" | "1";

    /** Whether the message is saved (1) or not (0) */
    issaved: "0" | "1";

    /** Current state of the message */
    messagestae: ThreemaMessageState;

    /** Timestamp when the message was posted (Unix timestamp in milliseconds) */
    posted_at: string;

    /** Timestamp when the message was created (Unix timestamp in milliseconds) */
    created_at: string;

    /** Timestamp when the message was last modified (Unix timestamp in milliseconds) */
    modified_at: string;

    /** Type of the message */
    type: ThreemaMessageType;

    /** Content of the message */
    body: string;

    /** Whether this is a status message (1) or not (0) */
    isstatusmessage: "0" | "1";

    /** Caption for media messages */
    caption: string;

    /** API ID of the quoted message, if this is a reply */
    quoted_message_apiid: string;

    /** Timestamp when the message was delivered (Unix timestamp in milliseconds) */
    delivered_at: string;

    /** Timestamp when the message was read (Unix timestamp in milliseconds) */
    read_at: string;

    /** Group message states (appears to be optional) */
    g_msg_states?: string;

    /** Display tags for the message */
    display_tags: string;

    /** Timestamp when the message was edited (Unix timestamp in milliseconds) */
    edited_at: string;

    /** Timestamp when the message was deleted (Unix timestamp in milliseconds) */
    deleted_at: string;
}

export interface ThreemaContactRow {
    identity: string;
    publickey: string;
    verification: string;
    acid: string;
    firstname: string;
    lastname: string;
    nick_name: string;
    last_update: string;
    hidden: string;
    archived: string;
    identity_id: string;
}