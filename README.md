# JcInk Post Templates Injection

Inject your HTML templates into specific forums or topics to prevent users from having to find and then copy/paste site specific templates.

## Table of Contents

- [JcInk Post Templates Injection](#jcink-post-templates-injection)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Use Case](#use-case)
  - [Forums/Sub-forums Template Injection](#forumssub-forums-template-injection)
  - [Topics Template Injection](#topics-template-injection)
  - [Using Forums/Sub-forums & Topics Template Injection](#using-forumssub-forums--topics-template-injection)
  - [Example](#example)
  - [Issues](#issues)

## Introduction

The purpose of this script is to limit the need for a user to find the proper template when posting in a forum. You'll be able to define what forum or sub-forum should have a template automatically injected into the textarea. You may also define a specific topic to have a template injection.

This script requires the use of JcInk global variables, which means the script needs to be loaded inline with your code instead of a script src. However, the script is able to remain minified (woo!).

I personally feel like this script is a bit harder to explain so, if you run into any issues, please [email me](mailto:jessica@jessicastamos.com) or reach me via discord: jessikuh#8376.

## Use Case

I have an Applications forum and within that forum, I have 'Complete', 'Incomplete', and 'Pending' sub-forums. For the Complete and Incomplete sub-forums, whenever a user posts a new topic, I want my application template to appear in the textarea. For all sub-forums, whenever an Admin or Moderator posts a reply, I want my accept or deny template to appear in the textarea.

I also want my Shippers forum, which has two sub-forums 'Angel' and 'Demon', to have the shipper template for that group injected when posting a new topic. Whenever someone adds a reply, I want my shipper response template injected using their group's class.

For all sub-forums in my Out of Character forum, I want my generic OOC template to appear.

## Forums/Sub-forums Template Injection

```html
<script>
  CODE FROM post-templates-injection.min.js GOES HERE

  forumPostTemplates.initialize({
    'Forum Name': [
      {
        html: '',
        newTopicsOnly: true,
        subforums: [''],
        userGroups: ['']
      }
    ]
  });
</script>
```

|Property|Description|
|-|-|
|html|The template's HTML.|
|newTopicsOnly|Boolean, so either a true or false value. You may also remove this property.|
|subforums|Array of the sub-forums the template should inject into. Remove if not applicable.|
|userGroups|Array of the user groups the template should show for. Remove if not applicable.|

If your HTML contains any apostrophes ('), you must add a back slash (`\`) to prevent the code from breaking. Additionally, your template code must be a single line. If you'd like your template to show breaks for better readability, you can use \n to indicate a line break.

**Advanced use:** Instead of html: '', you could instead use html: ``. This is referred to as a template literal, allowing the use of line breaks and apostrophes without interfering with the code. This means you wouldn't need to adjust your code into a single line nor use \n for line breaks. However, template literals do not work in Internet Explorer and you would either need to [compile the code](https://babeljs.io/repl) or not worry with Internet Explorer.

## Topics Template Injection

```html
<script>
  CODE FROM post-templates-injection.min.js GOES HERE

  topicPostTemplates.initialize({
    'Topic Name': [
      {
        html: '',
        forum: ''
      }
    ]
  });
</script>
```

|Property|Description|
|-|-|
|html|The template's HTML.|
|forum|In the event you fear that another forum could have a topic with the same name, use this property. Otherwise, you may remove it.|

The HTML rules from the forums/sub-forums section applies here as well. As of version 1, I have opted not to apply user groups to topics. If this is something you feel is important, let me know and I'll expedite the process of adding it in.

## Using Forums/Sub-forums & Topics Template Injection

```html
<script>
  CODE FROM post-templates-injection.min.js GOES HERE

  forumPostTemplates.initialize({
    'Forum Name': [
      {
        html: '',
        newTopicsOnly: true,
        subforums: [''],
        userGroups: ['']
      }
    ]
  });

  topicPostTemplates.initialize({
    'Topic Name': [
      {
        html: '',
        forum: ''
      }
    ]
  });
</script>
```

## Example

This example is based off the ['Use Case'](#use-case) scenario.

```html
<script>
  CODE FROM post-templates-injection.min.js GOES HERE

  forumPostTemplates.initialize({
    'Applications': [
      {
        html: '[dohtml]\n<div class="new-user">NAME</div>\n<div class="new-user-group">GROUP</div>\n[/dohtml]',
        newTopicsOnly: true,
        subforums: ['Complete', 'Incomplete']
      },
      {
        html: '[dohtml]\n<div class="title">ACCEPT/DENY</div>\n<div class="reason">EXPLANATION</div>\n[/dohtml]',
        newTopicsOnly: false,
        userGroups: ['Admin', 'Moderator']
      }
    ],
    'Shippers': [
      {
        html: '[dohtml]\n<div class="shipper-reply angel">NAME + NAME\n<div class="reasoning">WORDS HERE</div>\n</div>\n[/dohtml]',
        userGroups: ['Angel']
      },
      {
        html: '[dohtml]\n<div class="shipper-reply demon">NAME + NAME\n<div class="reasoning">WORDS HERE</div>\n</div>\n[/dohtml]',
        userGroups: ['Demon']
      },
      {
        html: '[dohtml]\n<div class="shipper angel">NAME\n<div class="relationships">RELATIONSHIPS</div>\n</div>\n[/dohtml]',
        newTopicsOnly: true,
        subforums: ['Angel']
      },
      {
        html: '[dohtml]\n<div class="shipper demon">NAME\n<div class="relationships">RELATIONSHIPS</div>\n</div>\n[/dohtml]',
        newTopicsOnly: true,
        subforums: ['Demon']
      }
    ],
    'Out of Character': [
      {
        html: '[dohtml]\n<div class="base">OOC THINGS</div>\n[/dohtml]'
      }
    ]
  });
</script>
```

What you see happening here is that for the forum 'Applications', I have an object that depicts what I want to happen for each use case. If I were to decide that I wanted a reply template for all users, I would add in another object beneath the last one for Applications like below.

```javascript
  'Applications': [
      {
        html: '[dohtml]\n<div class="new-user">NAME</div>\n<div class="new-user-group">GROUP</div>\n[/dohtml]',
        newTopicsOnly: true,
        subforums: ['Complete', 'Incomplete']
      },
      {
        html: '[dohtml]This is a template for all replies.[/dohtml]',
        newTopicsOnly: false
      },
      {
        html: '[dohtml]\n<div class="title">ACCEPT/DENY</div>\n<div class="reason">EXPLANATION</div>\n[/dohtml]',
        newTopicsOnly: false,
        userGroups: ['Admin', 'Moderator']
      }
    ],
```

It's important to note that this behaves similarly to CSS in that it cascades. What this means is that if there is a template that applies to everything in that forum (and, by nature, its subforums), if it isn't placed at the beginning, it will override the other settings. See the example below for more clarification.

```javascript
  'Locations': [
    {
      subforums: ['New York'],
      newTopicsOnly: true,
      userGroups: ['Admin'],
      html: '[dohtml]\nAdmin\n[/dohtml]'
    },
    {
      subforums: ['New York'],
      newTopicsOnly: true,
      userGroups: ['Moderator'],
      html: '[dohtml]\nModerator\n[/dohtml]'
    },
    {
      subforums: ['New York'],
      newTopicsOnly: false,
      html: '[dohtml]\nGeneric Template\n[/dohtml]'
    }
  ]
```

Even though we have declared user groups for the 'New York' sub-forum, since the 'Generic Template' is last, it is applied last, therefore overwriting the templates for the defined groups.

This is houw it should look to avoid override:

```javascript
  'Locations': [
    {
      subforums: ['New York'],
      newTopicsOnly: false,
      html: '[dohtml]\nGeneric Template\n[/dohtml]'
    },
    {
      subforums: ['New York'],
      newTopicsOnly: true,
      userGroups: ['Admin'],
      html: '[dohtml]\nAdmin\n[/dohtml]'
    },
    {
      subforums: ['New York'],
      newTopicsOnly: true,
      userGroups: ['Moderator'],
      html: '[dohtml]\nModerator\n[/dohtml]'
    }
  ]
```

## Issues

- If any forum or sub-forum have similar names, overrides will occur.
- Sub-forums that have sub-forums (sub-sub-forums) may struggle to work (needs additional testing to be certain).