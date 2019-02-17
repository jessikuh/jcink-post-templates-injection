const forumPostTemplates = {
  execute (forum, data) {
    const input = '<!-- |input_act| -->';

    if (input === 'ST' || input === 'Post') {
      const navStrip = document.querySelector('#navstrip').innerHTML,
            [{ subforums }] = data;

      if (data.length > 1) {
        // all this needs to become a function
        for (let key = 0; key < data.length; key += 1) {
          if (navStrip.indexOf(forum) > -1) {
            const { subforums: loopSubforums } = data[key];

            if (loopSubforums) {
              loopSubforums.forEach((subforum) => {
                if (navStrip.indexOf(subforum) > -1) {
                  this.ifStatements(data[key]);
                }
              });
            } else {
              this.ifStatements(data[key]);
            }
          }
        }
      } else if (navStrip.indexOf(forum) > -1) {
        if (subforums) {
          subforums.forEach((subforum) => {
            if (navStrip.indexOf(subforum) > -1) {
              this.ifStatements(data[0]);
            }
          });
        } else {
          this.ifStatements(data[0]);
        }
      }
    }
  },
  ifStatements (data) {
    const newTopicUrl = 'Post&CODE=00',
          thisUsersGroup = '<!-- |g_title| -->',
          { html, newTopicsOnly, userGroups } = data;

    if (newTopicsOnly && window.location.href.indexOf(newTopicUrl) > -1 && userGroups) {
      userGroups.forEach((userGroup) => {
        if (thisUsersGroup === userGroup) {
          this.injectTemplate(html);
        }
      });
    } else if (newTopicsOnly && window.location.href.indexOf(newTopicUrl) > -1 && !userGroups) {
      this.injectTemplate(html);
    }

    if (!newTopicsOnly && userGroups) {
      userGroups.forEach((userGroup) => {
        if (thisUsersGroup === userGroup) {
          this.injectTemplate(html);
        }
      });
    } else if (!newTopicsOnly && !userGroups) {
      this.injectTemplate(html);
    }
  },
  initialize (forums) {
    for (const forum in forums) {
      if ({}.hasOwnProperty.call(forums, forum)) {
        this.execute(forum, forums[forum]);
      }
    }
  },
  injectTemplate (html) {
    const textarea = document.querySelector('textarea');

    // Prevent override if performing a full edit
    if (window.location.href.indexOf('Post&CODE=08') === -1) {
      textarea.value = html;
    }
  }
};

var topicPostTemplates = {
  execute(topic, topics) {
    if (window.location.href.indexOf('showtopic') > -1 || window.location.href.indexOf('Post&CODE=02') > -1) {
      const navStrip = document.querySelector('#navstrip').innerHTML,
            { html, forum } = topics;
      let topicTitle = '';

      if (window.location.href.indexOf('showtopic') > -1) {
        topicTitle = document.querySelector('.topic-title').innerHTML;
      } else {
        const replyTopicTitle = document.querySelector('#posting-form .maintitle').innerHTML;

        topicTitle = replyTopicTitle.substring(replyTopicTitle.indexOf('to') + 3);
      }

      if (topicTitle === topic) {
        if (forum && navStrip.indexOf(forum) > -1) {
          forumPostTemplates.injectTemplate(html);
        } else {
          forumPostTemplates.injectTemplate(html);
        }
      }
    }
  },
  initialize (topics) {
    for (const topic in topics) {
      if ({}.hasOwnProperty.call(topics, topic)) {
        this.execute(topic, topics[topic]);
      }
    }
  }
};

//

// Copyright (c) 2019 Jessica Stamos
// @author Jessica Stamos
// @version 0.1.0
// githublinkhere