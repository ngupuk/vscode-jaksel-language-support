"use strict"
const vscode = require("vscode")

/**
 *
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  vscode.languages.registerDocumentFormattingEditProvider("jaksel", {
    provideDocumentFormattingEdits(document) {
      // Indentation formatter
      const increaseIndentMatch =
        /(backstab$|kalogak$|yaudahlahya$|trust issue$|fomo|kalo|perhaps|kalogak|overthinking|so about)/
      const decreaseIndentMatch =
        /(backstab$|udahan$|perhaps|kalogak$|yaudahlahya|thats it sih)/
      const cmd = []
      let indent = 0
      for (let i = 0; i < document.lineCount; i++) {
        const doc = document.lineAt(i)
        if (doc.text.match(decreaseIndentMatch))
          indent = indent > 0 ? indent - 1 : indent
        cmd.push(
          vscode.TextEdit.replace(
            doc.range,
            doc.text.replace(
              /^\s*/g,
              [...Array(indent)].map(() => "\t").join("")
            )
          )
        )
        if (doc.text.match(increaseIndentMatch)) indent++
      }
      return cmd
    },
  })
}

module.exports = { activate }
