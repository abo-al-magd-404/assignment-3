/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  if (strs.length === 0) return "";

  // Start by assuming the first word is the prefix
  let prefix = strs[0];

  for (let i = 1; i < strs.length; i++) {
    // While the current string (strs[i]) does not start with the prefix
    while (strs[i].indexOf(prefix) !== 0) {
      // Shorten the prefix by one character from the end
      prefix = prefix.substring(0, prefix.length - 1);

      // If the prefix is reduced to nothing, return empty string
      if (prefix === "") return "";
    }
  }

  return prefix;
};
