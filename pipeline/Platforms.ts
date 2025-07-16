/** Available platforms */
export type Platform = "discord" | "messenger" | "telegram" | "threema" | "whatsapp";

interface PlatformInformation {
    name: string;
    color: [number, number, number]; // HSL
    defaultFilename: string;
    support: {
        stickers: boolean;
        reactions: boolean;
        replies: boolean;
        edits: boolean;
        calls: boolean;
    };
}

export const PlatformsInfo: {
    [key in Platform]: PlatformInformation;
} = {
    discord: {
        name: "Discord",
        color: [235, 86, 65],
        defaultFilename: "<guild> - <channel> [ID].json",
        support: {
            stickers: true,
            reactions: true,
            replies: true,
            edits: true,
            calls: true,
        },
    },
    messenger: {
        name: "Messenger",
        color: [214, 89, 52],
        defaultFilename: "message_<number>.json",
        support: {
            stickers: true,
            reactions: false,
            replies: false,
            edits: false,
            calls: false,
        },
    },
    telegram: {
        name: "Telegram",
        color: [200, 79, 52],
        defaultFilename: "result.json",
        support: {
            stickers: false,
            reactions: false,
            replies: true,
            edits: true,
            calls: true,
        },
    },
    threema: {
        name: "Threema",
        color: [0, 0, 75.3],
        defaultFilename: "message_<number>.csv",
        support: {
            stickers: false,
            reactions: true,
            replies: true,
            edits: true,
            calls: true
        }
    },
    whatsapp: {
        name: "WhatsApp",
        color: [142, 70, 49],
        defaultFilename: "WhatsApp Chat with <chat name>.txt/zip",
        support: {
            stickers: true,
            reactions: false,
            replies: false,
            edits: false,
            calls: false,
        },
    },
};
