/* @flow */
"use strict"

const hasInterpolation = require("../utils/hasInterpolation")
/**
 * Check whether a value is standard
 */
module.exports = function (value/*: string*/)/*: boolean*/ {
  let normalizedValue = value

  // Ignore signs before variable (example `-$variable`)
  // Sings `*` and `/` should be removed after resolve this issue in `postcss-value-parser`
  if (value[0] === "-" || value[0] === "*" || value[0] === "/") {
    normalizedValue = normalizedValue.slice(1)
  }

  // SCSS variable
  if (normalizedValue[0] === "$") {
    return false
  }

  // Less variable
  if (normalizedValue[0] === "@") {
    return false
  }

  // SCSS or Less interpolation
  if (hasInterpolation(normalizedValue)) {
    return false
  }

  return true
}
