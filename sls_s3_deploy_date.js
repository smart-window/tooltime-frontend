// This module provides the prefix for the s3 bucket.
// Currently not used.
// In a future update, it will be.
module.exports = () => {
  const dt = new Date()
  return [
    dt.getFullYear(),
    Number(dt.getMonth() + 1).toLocaleString('en-US', { minimumIntegerDigits: 2 }),
    Number(dt.getDate()).toLocaleString('en-US', { minimumIntegerDigits: 2 }),
    Number(dt.getHours()).toLocaleString('en-US', { minimumIntegerDigits: 2 }),
    Number(dt.getMinutes()).toLocaleString('en-US', { minimumIntegerDigits: 2 }),
    Number(dt.getSeconds()).toLocaleString('en-US', { minimumIntegerDigits: 2 }),
  ].join('')
}
