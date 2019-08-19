const emojiList = require('emojis-list');

/**
 * Checks if a string is a single emoji
 * @param {string} text String to test
 * @returns {boolean} True if text is a single emoji
 */
const isSingleEmoji = text => emojiList.indexOf(text.trim()) > -1;

// TODO: Certain properties maybe should be checked to see if they are a url or a nested mf2 object
/**
 * Accepts a microformats 2 object and attempts to determine the post type
 * @param {object} mf2 A valid microformats 2 object
 * @returns {string|null} The post type or null if unknown
 */
function ptd(mf2) {
  // If is not h-entry then use that for the post type. E.g. event, recipe, resume etc.
  if (mf2.type && mf2.type[0] !== 'h-entry' && mf2.type[0].startsWith('h-')) {
    return mf2.type[0].substring(2);
  }

  /**
   * Checks that the microformats object contains the givin property and it is not empty
   * @param {string} property Property name to check for
   * @returns {boolean} True if exists and not empty
   */
  const propertyExists = property =>
    mf2.properties &&
    mf2.properties[property] &&
    Array.isArray(mf2.properties[property]) &&
    typeof mf2.properties[property][0] !== 'undefined' &&
    mf2.properties[property][0] !== null &&
    mf2.properties[property].map(s => s !== '');

  // Get the main content of the post
  let content = null;
  if (propertyExists('content')) {
    [content] = mf2.properties.content;
  } else if (propertyExists('summary')) {
    [content] = mf2.properties.summary;
  }
  if (content && typeof content !== 'string') {
    if (content.value) {
      content = content.value;
    } else if (content.html) {
      content = content.html;
    }
  }
  if (content) {
    content = content.trim();
  }

  // Then continue to base post type discovery
  if (propertyExists('rsvp')) {
    return 'rsvp';
  }
  if (propertyExists('in-reply-to')) {
    if (content && isSingleEmoji(content)) {
      return 'reacji';
    }
    return 'reply';
  }
  if (propertyExists('repost-of')) {
    return 'repost';
  }
  if (propertyExists('bookmark-of')) {
    return 'bookmark';
  }
  if (propertyExists('quotation-of')) {
    return 'quotation';
  }
  if (propertyExists('like-of')) {
    return 'like';
  }
  if (propertyExists('checkin')) {
    return 'checkin';
  }
  if (propertyExists('listen-of')) {
    return 'listen';
  }
  if (propertyExists('read-of')) {
    return 'read';
  }
  if (propertyExists('watch-of')) {
    return 'watch';
  }
  if (propertyExists('isbn')) {
    return 'book';
  }
  if (propertyExists('video')) {
    return 'video';
  }
  if (propertyExists('audio')) {
    return 'audio';
  }
  if (propertyExists('ate')) {
    return 'ate';
  }
  if (propertyExists('drank')) {
    return 'drank';
  }
  if (mf2.children && Array.isArray(mf2.children) && mf2.children.length > 0) {
    return 'collection';
  }
  if (propertyExists('photo')) {
    return 'photo';
  }
  if (propertyExists('name') && propertyExists('content')) {
    const name = mf2.properties.name[0].trim();
    if (!content.startsWith(name)) {
      return 'article';
    }
  }

  return 'note';
}

module.exports = ptd;
