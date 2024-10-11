// #popclip
// name: Copy And Paste
// identifier: copyandpaste
// description: PopClip will copy and paste.
// icon: paste-enter.png
// entitlements: [dynamic]
// popclipVersion: 4151

module.exports = {
  name: `${util.localize("Copy + Paste")}`,
  options: [{
    identifier: "showIcon",
    type: "boolean",
    label: util.localize("Show as Icon"),
    defaultValue: false,
  },{
    identifier: "Enter",
    type: "boolean",
    label: util.localize("Press Enter (↵)"),
    defaultValue: false,
  }],
  actions() {
    if (popclip.context.canPaste) {
      return {
        // `undefined` will fall back to the extension's icon; `null` sets no icon
        icon: popclip.options.showIcon ? undefined : null,
        code() {
          popclip.copyText(popclip.input.text);
          if (popclip.modifiers.shift) {
            popclip.pasteText(pasteboard.text);
          } else {
            popclip.performCommand("paste");
          }
          if (popclip.options.Enter) {
            popclip.pressKey(util.constant.KEY_RETURN);
          }
        },
      };
    }
  },
};
