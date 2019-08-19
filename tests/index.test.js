const ptd = require('../index');

test('basic note post type discovery', () => {
  const mf2 = {
    type: ['h-entry'],
    properties: {
      content: ['Basic note'],
    },
  };
  const type = ptd(mf2);
  expect(type).toBe('note');
});

test('note with name post type discovery', () => {
  const mf2 = {
    type: ['h-entry'],
    properties: {
      name: ['Title'],
      content: ['Title: Note content'],
    },
  };
  const type = ptd(mf2);
  expect(type).toBe('note');
});

test('note with summary post type discovery', () => {
  const mf2 = {
    type: ['h-entry'],
    properties: {
      name: ['Title'],
      summary: ['Note summary'],
    },
  };
  const type = ptd(mf2);
  expect(type).toBe('note');
});

test('article post type discovery', () => {
  const mf2 = {
    type: ['h-entry'],
    properties: {
      name: ['Title'],
      content: ['content'],
    },
  };
  const type = ptd(mf2);
  expect(type).toBe('article');
});

test('article with HTML post type discovery', () => {
  const mf2 = {
    type: ['h-entry'],
    properties: {
      name: ['Title'],
      content: [
        {
          html: '<p>Content in <em>HTML</em> format.</p>',
        },
      ],
    },
  };
  const type = ptd(mf2);
  expect(type).toBe('article');
});

test('article with plain text post type discovery', () => {
  const mf2 = {
    type: ['h-entry'],
    properties: {
      name: ['Title'],
      content: [
        {
          value: 'Content in _Markdown_ format.',
        },
      ],
    },
  };
  const type = ptd(mf2);
  expect(type).toBe('article');
});

test('article with HTML and plain text post type discovery', () => {
  const mf2 = {
    type: ['h-entry'],
    properties: {
      name: ['Title'],
      content: [
        {
          html: '<p>Content in <em>HTML</em> format.</p>',
          value: 'Content in _Markdown_ format.',
        },
      ],
    },
  };
  const type = ptd(mf2);
  expect(type).toBe('article');
});

test('article with summary post type discovery', () => {
  const mf2 = {
    type: ['h-entry'],
    properties: {
      name: ['Title'],
      summary: ['Summary of content'],
      content: [
        {
          html: '<p>Content</p>',
          value: 'Content',
        },
      ],
    },
  };
  const type = ptd(mf2);
  expect(type).toBe('article');
});

test('photo post type discovery', () => {
  const mf2 = {
    type: ['h-entry'],
    properties: {
      photo: ['https://example.com/photo.jpg'],
    },
  };
  const type = ptd(mf2);
  expect(type).toBe('photo');
});

test('video post type discovery', () => {
  const mf2 = {
    type: ['h-entry'],
    properties: {
      video: ['https://example.com/video.mp4'],
    },
  };
  const type = ptd(mf2);
  expect(type).toBe('video');
});

test('audio post type discovery', () => {
  const mf2 = {
    type: ['h-entry'],
    properties: {
      audio: ['https://example.com/audio.mp3'],
    },
  };
  const type = ptd(mf2);
  expect(type).toBe('audio');
});

test('like post type discovery', () => {
  const mf2 = {
    type: ['h-entry'],
    properties: {
      'like-of': ['https://example.com'],
    },
  };
  const type = ptd(mf2);
  expect(type).toBe('like');
});

test('repost post type discovery', () => {
  const mf2 = {
    type: ['h-entry'],
    properties: {
      'repost-of': ['https://example.com'],
    },
  };
  const type = ptd(mf2);
  expect(type).toBe('repost');
});

test('bookmark post type discovery', () => {
  const mf2 = {
    type: ['h-entry'],
    properties: {
      'bookmark-of': ['https://example.com'],
    },
  };
  const type = ptd(mf2);
  expect(type).toBe('bookmark');
});

test('quotation post type discovery', () => {
  const mf2 = {
    type: ['h-entry'],
    properties: {
      'quotation-of': ['https://example.com'],
      content: ['This is a quote'],
    },
  };
  const type = ptd(mf2);
  expect(type).toBe('quotation');
});

test('rsvp post type discovery', () => {
  const mf2 = {
    type: ['h-entry'],
    properties: {
      rsvp: ['yes'],
    },
  };
  const type = ptd(mf2);
  expect(type).toBe('rsvp');
});

test('reply post type discovery', () => {
  const mf2 = {
    type: ['h-entry'],
    properties: {
      'in-reply-to': ['https://example.com'],
      content: ['Reply text'],
    },
  };
  const type = ptd(mf2);
  expect(type).toBe('reply');
});

test('reactji post type discovery', () => {
  const mf2 = emoji => ({
    type: ['h-entry'],
    properties: {
      'in-reply-to': ['https://example.com'],
      content: [emoji],
    },
  });
  const type = ptd(mf2('👩'));
  expect(type).toBe('reacji');
  const type2 = ptd(mf2('👨‍👨‍👧‍👧'));
  expect(type2).toBe('reacji');
  // TODO: Complex emoji maybe doesn't work
  // const type3 = ptd(mf2("👩🏻‍🤝‍🧑🏿"));
  // expect(type3).toBe("reacji");
});

test('watch post type discovery', () => {
  const mf2 = {
    type: ['h-entry'],
    properties: {
      'watch-of': ['https://example.com/video.mp4'],
    },
  };
  const type = ptd(mf2);
  expect(type).toBe('watch');
});

test('listen post type discovery', () => {
  const mf2 = {
    type: ['h-entry'],
    properties: {
      'listen-of': ['https://example.com/audio.mp3'],
    },
  };
  const type = ptd(mf2);
  expect(type).toBe('listen');
});

test('read post type discovery', () => {
  const mf2 = {
    type: ['h-entry'],
    properties: {
      'read-of': ['https://example.com/article'],
    },
  };
  const type = ptd(mf2);
  expect(type).toBe('read');
});

test('checkin post type discovery', () => {
  const mf2 = {
    type: ['h-entry'],
    properties: {
      checkin: ['https://example.com/place'],
    },
  };
  const type = ptd(mf2);
  expect(type).toBe('checkin');
});

test('collection post type discovery', () => {
  const mf2 = {
    type: ['h-entry'],
    properties: {
      name: ['Collection'],
    },
    children: ['https://example.com/child-1', 'https://example.com/child-2'],
  };
  const type = ptd(mf2);
  expect(type).toBe('collection');
});

test('event post type discovery', () => {
  const mf2 = {
    type: ['h-event'],
    properties: {
      name: ['Event title'],
    },
  };
  const type = ptd(mf2);
  expect(type).toBe('event');
});

test('book post type discovery', () => {
  const mf2 = {
    type: ['h-entry'],
    properties: {
      name: ['Book title'],
      isbn: ['isbnnumber'],
    },
  };
  const type = ptd(mf2);
  expect(type).toBe('book');
});

test('ate post type discovery', () => {
  const mf2 = {
    type: ['h-entry'],
    properties: {
      ate: ['Chicken Salad'],
    },
  };
  const type = ptd(mf2);
  expect(type).toBe('ate');
});

test('drank post type discovery', () => {
  const mf2 = {
    type: ['h-entry'],
    properties: {
      drank: ['water'],
    },
  };
  const type = ptd(mf2);
  expect(type).toBe('drank');
});
