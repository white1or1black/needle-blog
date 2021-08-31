const get = function (opt) {
  const pathSplit = opt.url.split('/');
  const articles = [
    {
      view: 5,
      id: 4,
      title: "What's up with Jimi?",
      content: "Nothing ",
      updatedAt: "2001-07-15T14:22:32.000Z"
    },
    {
      view: 2,
      id: 11,
      title: "are you ok?",
      content: "I am ok!",
      updatedAt: "2018-01-21T14:22:32.000Z"
    }
  ];

  if (pathSplit.length === 5) {
    const pageId = parseInt(pathSplit[pathSplit.length - 1]);
    return articles.find(item => item.id === pageId);
  } else {
    return articles;
  }
}

export default {
  get: opt => get(opt)
};