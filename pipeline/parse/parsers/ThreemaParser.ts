import Papa from "papaparse";

import { FileInput } from "@pipeline/parse/File";
import { Parser } from "@pipeline/parse/Parser";
import { PAuthor, PChannel, PMessage } from "@pipeline/parse/Types";
import { ThreemaContactRow, ThreemaMessageRow } from "@pipeline/parse/parsers/Threema";

export class ThreemaParser extends Parser {
    async *parse(file: FileInput) {
        const filename = file.name.toLowerCase();

        let parser: undefined | ((file: FileInput, fileContent: string) => void) = undefined;

        if (filename.match(/message_(\d+).csv/)) {
            parser = this.parseMessageFile.bind(this);
        } else if (filename.match(/contacts.csv/)) {
            parser = this.parseContactsFile.bind(this);
        }

        if (!parser) {
            throw new Error("Could not parse file!");
        }

        const fileBuffer = await file.slice();
        const fileContent = new TextDecoder("utf-8").decode(fileBuffer);

        this.emit("guild", { id: 0, name: "Threema Chats" });
        parser(file, fileContent);
    }

    private parseContactsFile(file: FileInput, fileContent: string) {
        const papaResult = Papa.parse(fileContent, {
            header: true,
        });

        papaResult.data.forEach((row) => {
            const { firstname, lastname, identity_id } = row as ThreemaContactRow;

            const author: PAuthor = {
                id: parseInt(identity_id),
                bot: false,
                name: [firstname, lastname].join(" "),
            };

            this.emit("author", author);
        });
    }

    private parseMessageFile(file: FileInput, fileContent: string) {
        const rawChatId = file.name.match(/message_(\d+).csv/)?.[1];

        if (!rawChatId) {
            throw new Error("Could not parse chat ID from file name!");
        }
        const chatId = parseInt(rawChatId);

        const channel: PChannel = {
            id: chatId,
            guildId: 0,
            name: "Threema Chat " + chatId,
            type: "dm",
        };
        this.emit("channel", channel);
        this.emit("author", { id: "me", name: "Me", bot: false });

        const messages: PMessage[] = [];

        Papa.parse(fileContent, {
            header: true,
            step: (row, parser) => {
                if (row.errors.length > 0) {
                    return;
                }

                const { apiid, isoutbox, created_at, body, quoted_message_apiid, edited_at } =
                    row.data as ThreemaMessageRow;

                const message: PMessage = {
                    id: apiid,
                    authorId: isoutbox === "1" ? "me" : chatId,
                    channelId: chatId,
                    timestamp: parseInt(created_at),
                    textContent: body,
                    replyTo: quoted_message_apiid === "" ? undefined : quoted_message_apiid,
                    timestampEdit: edited_at === "" ? undefined : parseInt(edited_at),
                };

                messages.push(message);
            },
        });

        messages.sort((a, b) => a.timestamp - b.timestamp);
        console.debug(messages);
        messages.forEach((message) => this.emit("message", message));
    }
}
