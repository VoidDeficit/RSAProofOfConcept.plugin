/**
 * @name RSAProofOfConcept
 * @version 0.0.1
 * @author Olive
 * @authorId 415849376598982656
 * @description A proof of concept plugin demonstrating RSA encryption usage.
 * @changelogDate 2025-02-02
 */

'use strict';

/* react */
const React = BdApi.React;

/* @manifest */
var manifest = {
    "name": "RSAProofOfConcept",
    "version": "0.0.1",
    "author": "Olive",
    "authorId": "415849376598982656",
    "description": "A proof of concept plugin demonstrating RSA encryption usage",
    //"source": "https://github.com/Strencher/BetterDiscordStuff/blob/master/RSAProofOfConcept/RSAProofOfConcept.plugin.js",
    //"invite": "gvA2ree",
    "changelog": [{
            "title": "Improved rsaProofSettings",
            "type": "improved",
            "items": [
                "rsaProofSettings use BD Components now"
            ]
        },
        {
            "title": "Fixed",
            "type": "fixed",
            "items": [
                "The Plugin works again"
            ]
        }
    ],
    "changelogDate": "2025-21-05"
};

/* @api */
const {
    Components,
    ContextMenu,
    Data,
    DOM,
    Logger,
    Net,
    Patcher,
    Plugins,
    ReactUtils,
    Themes,
    UI,
    Utils,
    Webpack
} = new BdApi(manifest.name);

/* @styles */

var Styles = {
    sheets: [],
    _element: null,
    load() {
        DOM.addStyle(this.sheets.join("\n"));
    },
    unload() {
        DOM.removeStyle();
    }
};

/* ../common/Changelog/style.scss */
Styles.sheets.push("/* ../common/Changelog/style.scss */", `.Changelog-Title-Wrapper {
  font-size: 20px;
  font-weight: 600;
  font-family: var(--font-display);
  color: var(--header-primary);
  line-height: 1.2;
}
.Changelog-Title-Wrapper div {
  font-size: 12px;
  font-weight: 400;
  font-family: var(--font-primary);
  color: var(--primary-300);
  line-height: 1.3333333333;
}

.Changelog-Banner {
  width: 405px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.Changelog-Item {
  color: #c4c9ce;
}
.Changelog-Item .Changelog-Header {
  display: flex;
  text-transform: uppercase;
  font-weight: 700;
  align-items: center;
  margin-bottom: 10px;
}
.Changelog-Item .Changelog-Header.added {
  color: #45BA6A;
}
.Changelog-Item .Changelog-Header.changed {
  color: #F0B232;
}
.Changelog-Item .Changelog-Header.fixed {
  color: #EC4245;
}
.Changelog-Item .Changelog-Header.improved {
  color: #5865F2;
}
.Changelog-Item .Changelog-Header::after {
  content: "";
  flex-grow: 1;
  height: 1px;
  margin-left: 7px;
  background: currentColor;
}
.Changelog-Item span {
  display: list-item;
  list-style: inside;
  margin-left: 5px;
}
.Changelog-Item span::marker {
  color: var(--background-accent);
}`);

/* ../common/Changelog/index.tsx */
function showChangelog(manifest) {
    if (Data.load("lastVersion") === manifest.version) return;
    const i18n = Webpack.getByKeys("getLocale");
    const formatter = new Intl.DateTimeFormat(i18n.getLocale(), {
        month: "long",
        day: "numeric",
        year: "numeric"
    });
    const title = React.createElement("div", {
        className: "Changelog-Title-Wrapper"
    }, React.createElement("h1", null, "What's New - ", manifest.name), React.createElement("div", null, formatter.format(new Date(manifest.changelogDate)), " - v", manifest.version));
    const items = manifest.changelog.map((item) => React.createElement("div", {
        className: "Changelog-Item"
    }, React.createElement("h4", {
        className: `Changelog-Header ${item.type}`
    }, item.title), item.items.map((item2) => React.createElement("span", null, item2))));
    "changelogImage" in manifest && items.unshift(
        React.createElement("img", {
            className: "Changelog-Banner",
            src: manifest.changelogImage
        })
    );
    UI.alert(title, items);
    Data.save("lastVersion", manifest.version);
}

/* components/typingButton.scss */
Styles.sheets.push("/* components/typingButton.scss */", `.RSAProofOfConceptButton svg {
  color: var(--interactive-normal);
  overflow: visible;
  margin-top: 2.5px;
}

.RSAProofOfConceptButton .disabledStrokeThrough {
  position: absolute;
  transform: translateX(-15px) translateY(530px) rotate(-45deg);
}

.RSAProofOfConceptButton {
  background: transparent;
}
.RSAProofOfConceptButton:hover:not(.disabled) svg {
  color: var(--interactive-hover);
}

.RSAProofOfConceptTooltip {
  display: inline-flex;
}`);
var styles = {
    "RSAProofOfConceptButton": "RSAProofOfConceptButton",
    "disabledStrokeThrough": "disabledStrokeThrough"
};

/* components/icons/LockIcon.tsx */
function LockIcon({ locked, ...props }) {
  const paths = {
    locked: "🔒", // Geschlossenes Schloss-Emoji
    unlocked: "🔓" // Offenes Schloss-Emoji
  };

  return React.createElement("span", { ...props }, locked ? paths.locked : paths.unlocked);
}

/* modules/shared.js */
const Dispatcher = Webpack.getByKeys("_dispatch");
const Flux = Webpack.getByKeys("Store");
const useStateFromStores = Webpack.getByStrings("useStateFromStores", {
    searchExports: true
});
const buildClassName = (...args) => {
    return args.reduce((classNames, arg) => {
        if (!arg) return classNames;
        if (typeof arg === "string" || typeof arg === "number") {
            classNames.push(arg);
        } else if (Array.isArray(arg)) {
            const nestedClassNames = buildClassName(...arg);
            if (nestedClassNames) classNames.push(nestedClassNames);
        } else if (typeof arg === "object") {
            Object.keys(arg).forEach((key) => {
                if (arg[key]) classNames.push(key);
            });
        }
        return classNames;
    }, []).join(" ");
};

/* modules/rsaProofrsaProofSettings.js */
const rsaProofSettings = new class rsaProofSettings2 extends Flux.Store {
    constructor() {
        super(Dispatcher, {});
    }
    _rsaProofSettings = Data.load("rsaProofSettings") ?? {};

    get(key, def) {
        return this._rsaProofSettings[key] ?? def;
    }
    set(key, value) {
        this._rsaProofSettings[key] = value;
        Data.save("rsaProofSettings", this._rsaProofSettings);
        this.emitChange();
    }
}();

/* components/typingButton.tsx */
const ChatBarClasses = Webpack.getByKeys("channelTextArea", "button");
const removeItem = function(array, item) {
    while (array.includes(item)) {
        array.splice(array.indexOf(item), 1);
    }
    return array;
};

function RSAProofOfConceptContextMenu(channel) {
    const enabled = useStateFromStores([rsaProofSettings], () => rsaProofSettings.get("autoEnable", true));
    
    // Retrieve the initial RSA public key for the specific channel
    const initialRsaPublicKey = useStateFromStores([rsaProofSettings], () => rsaProofSettings.get(`rsaPublicKey-${channel.channel}`, ""));
    // Local state for the input field (to keep React controlled)
    const [rsaPublicKey, setRsaPublicKey] = React.useState(initialRsaPublicKey);

    // Update local state when settings change
    React.useEffect(() => {
        setRsaPublicKey(initialRsaPublicKey);
    }, [initialRsaPublicKey]);

    return React.createElement(
        ContextMenu.Menu,
        {
            navId: "typing-context-menu",
            onClose: ContextMenu.close
        },
        React.createElement(
            ContextMenu.Item,
            {
                id: "globally-disable-or-enable-typing",
                label: enabled ? "Disable Globally" : "Enable Globally",
                action: () => {
                    rsaProofSettings.set("autoEnable", !enabled);
                }
            }
        ),
        React.createElement(
            ContextMenu.ControlItem,
            {
                id: "rsa-public-key-field",
                control: (props) => React.createElement("input", {
                    ...props,
                    type: "text",
                    placeholder: "Enter RSA Public Key...",
                    value: rsaPublicKey,
                    onChange: (e) => {
                        setRsaPublicKey(e.target.value);
                        rsaProofSettings.set(`rsaPublicKey-${channel.channel}`, e.target.value);
                        //console.log(channel.channel);
                    },
                    style: {
                        width: "100%",
                        padding: "4px",
                        fontSize: "14px",
                        borderRadius: "4px",
                        backgroundColor: "var(--background-secondary)",
                        color: "var(--text-normal)",
                        border: "1px solid var(--background-tertiary)"
                    }
                })
            }
        ),
        React.createElement(
            ContextMenu.Item,
            {
                id: "send-my-public-key",
                label: "Send My Public Key",
                action: async () => {
                    const myPublicKey = rsaProofSettings.get("ownPublicKey", null);
                    if (!myPublicKey) {
                        UI.showToast("No public key found. Generate one first.", { type: "error" });
                        return;
                    }

                    // Remove PEM headers and footers and any surrounding whitespace
                    const cleanKey = myPublicKey
                        .replace(/-----BEGIN PUBLIC KEY-----/g, "")
                        .replace(/-----END PUBLIC KEY-----/g, "")
                        .replace(/\r?\n|\r/g, "") // Remove all newlines
                        .trim();

                    try {
                        const MessageEvents = Webpack.getModule(m => m?.sendMessage && m?.receiveMessage);
                        if (!MessageEvents?.sendMessage) throw new Error("Message module not found");

                        await MessageEvents.sendMessage(channel.channel, {
                            content: `\`\`\`[RSA-PUBLIC-KEY]\n${cleanKey}\n\`\`\``,
                            tts: false
                        });

                        UI.showToast("Public key sent successfully.", { type: "success" });
                    } catch (err) {
                        Logger.error("Failed to send public key", err);
                        UI.showToast("Failed to send public key.", { type: "error" });
                    }
                }
            }
        ),
        React.createElement(
            ContextMenu.Item,
            {
                color: "danger",
                label: "Reset Config",
                disabled: !rsaProofSettings.get("exclude", []).length,
                id: "reset-config",
                action: () => {
                    rsaProofSettings.set("exclude", []);
                    UI.showToast("Successfully reset config for all channels.", {
                        type: "success"
                    });
                }
            }
        )
    );
}

function RSAProofOfConceptButton({
    channel,
    isEmpty
}) {
    const enabled = useStateFromStores([rsaProofSettings], RSAProofOfConceptButton.getState.bind(this, channel.id));
    const handleClick = React.useCallback(() => {
        const excludeList = [...rsaProofSettings.get("exclude", [])];
        if (excludeList.includes(channel.id)) {
            removeItem(excludeList, channel.id);
        } else {
            excludeList.push(channel.id);
        }
        rsaProofSettings.set("exclude", excludeList);
    }, [enabled]);
    const handleContextMenu = React.useCallback((event) => {
        ContextMenu.open(event, () => {
            return React.createElement(RSAProofOfConceptContextMenu, { channel: channel.id});
        });
    }, [enabled]);
    return React.createElement(
        "div", {
            style: {
                marginRight: "2.5px"
            },
            className: ChatBarClasses.buttons
        },
        React.createElement(Components.Tooltip, {
            text: enabled ? "RSA Enabled" : "RSA Disabled"
        }, (props) => React.createElement(
            "button", {
                ...props,
                className: buildClassName(styles.RSAProofOfConceptButton, {
                    enabled,
                    disabled: !enabled
                }),
                onClick: handleClick,
                onContextMenu: handleContextMenu
            },
            React.createElement(LockIcon, {
                locked: enabled
            })
        ))
    );
}
RSAProofOfConceptButton.getState = function(channelId) {
    const isGlobal = rsaProofSettings.get("autoEnable", true);
    const isExcluded = rsaProofSettings.get("exclude", []).includes(channelId);
    if (isGlobal && isExcluded) return false;
    if (isExcluded && !isGlobal) return true;
    return isGlobal;
};

/* components/rsaProofSettings.json */
var rsaProofSettingsItems = [{
    type: "switch",
    name: "Automatically enable",
    note: "Automatically enables the typing indicator for each channel that isn't manually disabled",
    id: "autoEnable",
    value: true
}];

/* components/rsaProofSettings.jsx */
const {
    SettingItem,
    SwitchInput
} = Components;

function SwitchItem(props) {
    const value = useStateFromStores([rsaProofSettings], () => rsaProofSettings.get(props.id, props.value));
    return React.createElement(
        SettingItem, {
            ...props,
            inline: true
        },
        React.createElement(
            SwitchInput, {
                value,
                onChange: (v) => {
                    rsaProofSettings.set(props.id, v);
                }
            }
        )
    );
}

function renderItems(items) {
    return items.map((item) => {
        switch (item.type) {
            case "switch":
                return React.createElement(SwitchItem, {
                    ...item
                });
            default:
                return null;
        }
    });
}

function rsaProofSettingsPanel() {
    return React.createElement("div", null, renderItems(rsaProofSettingsItems));
}

const cryptoSubtle = window.crypto?.subtle;

async function importRsaPublicKey(pem) {
    const clean = pem.replace(/-----BEGIN PUBLIC KEY-----|-----END PUBLIC KEY-----|\s+/g, "");
    const binaryDer = Uint8Array.from(atob(clean), c => c.charCodeAt(0));
    return cryptoSubtle.importKey(
        "spki",
        binaryDer.buffer,
        {
            name: "RSA-OAEP",
            hash: "SHA-256",
        },
        false,
        ["encrypt"]
    );
}

async function encryptWithRsaPublicKey(pemKey, message) {
    const encoder = new TextEncoder();
    const publicKey = await importRsaPublicKey(pemKey);
    const encrypted = await cryptoSubtle.encrypt(
        {
            name: "RSA-OAEP"
        },
        publicKey,
        encoder.encode(message)
    );
    return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
}

async function generateRsaKeyPair() {
    const keyPair = await cryptoSubtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 2048,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256",
        },
        true,
        ["encrypt", "decrypt"]
    );
    return keyPair;
}

async function exportKeyToPem(key, type = "public") {
    const exportFormat = type === "public" ? "spki" : "pkcs8";
    const exported = await cryptoSubtle.exportKey(exportFormat, key);
    const exportedAsString = String.fromCharCode(...new Uint8Array(exported));
    const exportedAsBase64 = btoa(exportedAsString);
    const pemHeader = type === "public" ? "-----BEGIN PUBLIC KEY-----" : "-----BEGIN PRIVATE KEY-----";
    const pemFooter = type === "public" ? "-----END PUBLIC KEY-----" : "-----END PRIVATE KEY-----";
    const pemBody = exportedAsBase64.match(/.{1,64}/g).join("\n");
    return `${pemHeader}\n${pemBody}\n${pemFooter}`;
}

async function ensureOwnRsaKeyPairExists() {
    const hasPublicKey = rsaProofSettings.get("ownPublicKey", null);
    const hasPrivateKey = rsaProofSettings.get("ownPrivateKey", null);
    
    if (!hasPublicKey || !hasPrivateKey) {
        const { publicKey, privateKey } = await generateRsaKeyPair();
        const publicPem = await exportKeyToPem(publicKey, "public");
        const privatePem = await exportKeyToPem(privateKey, "private");

        rsaProofSettings.set("ownPublicKey", publicPem);
        rsaProofSettings.set("ownPrivateKey", privatePem);

        Logger.log("Generated new RSA key pair.");
    } else {
        Logger.log("RSA key pair already exists.");
    }
}



/* index.tsx */
class RSAProofOfConcept {
    start() {
        Styles.load();
        showChangelog(manifest);
        this.patchSendMessage();
        this.patchChannelTextArea();
        this.patchMessages(); // ← Add this line
        ensureOwnRsaKeyPairExists();
    }


    stop() {
        Styles.unload();
        Patcher.unpatchAll();
    }
    patchChannelTextArea() {
        const ChannelTextArea = Webpack.getModule((m) => m?.type?.render?.toString?.()?.includes?.("CHANNEL_TEXT_AREA"));
        Patcher.after(ChannelTextArea.type, "render", (_, __, res) => {
            const isProfilePopout = Utils.findInTree(res, (e) => Array.isArray(e?.value) && e.value.some((v) => v === "bite size profile popout"), {
                walkable: ["children", "props"]
            });
            if (isProfilePopout) return;
            const chatBar = Utils.findInTree(res, (e) => Array.isArray(e?.children) && e.children.some((c) => c?.props?.className?.startsWith("attachButton")), {
                walkable: ["children", "props"]
            });
            if (!chatBar) return Logger.error("Failed to find ChatBar");
            const textAreaState = Utils.findInTree(chatBar, (e) => e?.props?.channel, {
                walkable: ["children"]
            });
            if (!textAreaState) return Logger.error("Failed to find textAreaState");
            chatBar.children.splice(-1, 0, React.createElement(RSAProofOfConceptButton, {
                channel: textAreaState?.props?.channel,
                isEmpty: !Boolean(textAreaState?.props?.editorTextContent)
            }));
        });
    }
    getrsaProofSettingsPanel() {
        return React.createElement(rsaProofSettingsPanel, null);
    }
    patchSendMessage() {
        const MessageEvents = Webpack.getModule(m => m?.sendMessage && m?.receiveMessage);
        if (!MessageEvents?.sendMessage) return Logger.error("Failed to patch sendMessage");

        Patcher.instead(MessageEvents, "sendMessage", async (thisObject, args, originalFunction) => {
            const [channelId, message] = args;
            const enabled = RSAProofOfConceptButton.getState(channelId);

            //console.log("ORGINAL: ",message.content,channelId);
            if (enabled && message?.content) {
                //console.log("encryption startet");
                const pemKey = rsaProofSettings.get(`rsaPublicKey-${channelId}`, "");
                //console.log(pemKey);
                if (pemKey?.startsWith("-----BEGIN PUBLIC KEY-----")) {
                    //console.log("Readed RSA key");
                    try {
                        const encrypted = await encryptWithRsaPublicKey(pemKey, message.content);
                        message.content = `[ENCRYPTED]: ${encrypted}`;
                    } catch (err) {
                        Logger.error("Encryption failed", err);
                        UI.showToast("RSA encryption failed. Message sent unencrypted.", {type: "error"});
                    }
                } else {
                    //console.log("Readed RSA key");
                    try {
                        const encrypted = await encryptWithRsaPublicKey(pemKey, message.content);
                        message.content = `[ENCRYPTED]: ${encrypted}`;
                    } catch (err) {
                        Logger.error("Encryption failed", err);
                        UI.showToast("RSA encryption failed. Message sent unencrypted.", {type: "error"});
                    }
                }
            }
            //console.log("AFTER: ",channelId,message.content);
            return originalFunction(channelId, message);
        });
    }

    patchMessages() {
        const MessageContent = Webpack.getModule(m => m?.default && m?.default.displayName === "MessageContent");
        if (!MessageContent) {
            Logger.warn("MessageContent module not found!");
            return;
        }

        Patcher.after(MessageContent, "default", (_, [props], ret) => {
            try {
                // Only patch messages in certain channels or DMs if you want:
                // const channelId = props.message.channel_id;

                // Get original message content element (React element)
                const originalContent = ret;

                // Add a prefix to the message content, e.g. "[Peek] "
                // Or inject something else like encrypted badge, timestamp, etc.
                const newContent = React.createElement(
                    "div",
                    { style: { display: "flex", alignItems: "center" } },
                    React.createElement("span", { style: { fontWeight: "bold", color: "#5865F2", marginRight: 5 } }, "[Peek]"),
                    originalContent
                );

                return newContent;
            } catch (error) {
                Logger.error("Failed to patch message content:", error);
                return ret;
            }
        });
    }
}

module.exports = RSAProofOfConcept;

