import { ReactNode } from "react";

import { Platform } from "@pipeline/Platforms";

import DiscordLogo from "@assets/images/logos/discord.svg";
import MessengerLogo from "@assets/images/logos/messenger.svg";
import TelegramLogo from "@assets/images/logos/telegram.svg";
import ThreemaLogo from "@assets/images/logos/threema.svg";
import WhatsAppLogo from "@assets/images/logos/whatsapp.svg";

export const PlatformLogos: {
    [key in Platform]: ReactNode;
} = {
    discord: <img src={DiscordLogo} alt="" />,
    messenger: <img src={MessengerLogo} alt="" />,
    telegram: <img src={TelegramLogo} alt="" />,
    threema: <img src={ThreemaLogo} alt="" />,
    whatsapp: <img src={WhatsAppLogo} alt="" />,
};
