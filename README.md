### Message API
List Template
```
{ 
    type: 'list',
    author: 'support',
    data: {
        "template_type": "list",
        "top_element_style": "<LARGE | COMPACT>",
        "elements": [
            {
            "title": "<TITLE_TEXT>",
            "subtitle": "<SUBTITLE_TEXT>",
            "image_url": "<IMAGE_URL_FOR_THUMBNAIL>",          
            "buttons": [<BUTTON_OBJECT>],
            "default_action": {
                "type": "web_url",
                "url": "<URL_TO_OPEN_WHEN_ITEM_IS_TAPPED>",
                "messenger_extensions": <TRUE | FALSE>,
                "webview_height_ratio": "<COMPACT | TALL | FULL>"
            }
            },
            ...
        ],
        "buttons": [<BUTTON_OBJECT>]  
    }

}

```

 
Card Template
```
{ 
    type: 'card',
    author: 'support',
    data: {
        "template_type": "generic",
        "elements": [
            {
            "title": "<TITLE_TEXT>",
            "subtitle": "<SUBTITLE_TEXT>",
            "image_url": "<IMAGE_URL_FOR_THUMBNAIL>",          
            "buttons": [<BUTTON_OBJECT>],
            "default_action": {
                "type": "web_url",
                "url": "<URL_TO_OPEN_WHEN_ITEM_IS_TAPPED>",
                "messenger_extensions": <TRUE | FALSE>,
                "webview_height_ratio": "<COMPACT | TALL | FULL>"
            }
            },
            ...
        ],
        "buttons": [<BUTTON_OBJECT>]  
    }

}

```

Button Template
```
{ 
    type: 'button',
    author: 'support',
    data: {
        "template_type":"button",
        "text":"<MESSAGE_TEXT>",
        "buttons":[
            <BUTTON_OBJECT>, 
            <BUTTON_OBJECT>, 
            ...
        ]
    }
}
```

Quick Reply
```
{ 
    type: 'text', 
    author: 'support', 
    data: { 
        text: <Text> 
    }, 
    suggestions: [<Text>]
}
```

Image Template
```
{ 
    type: 'image',
    author: 'support',
    data: { 
      elements:
        [
          { url: <URL> }
        ]
    } 
}
```

Video Template
```
{ 
    type: 'video', 
    author: 'support', 
    data: { 
        text: <Text>,
        media_type: 'Video',
        source: 'Youtube || null,
        url: <Url>
    }
}
```

Text Template 
```
{ 
    type: 'text', 
    author: 'support', 
    data: { 
        text: <Text> 
    }
}
```


// messageList: [
  //   { type: 'text', author: `me`, data: { text: `Hi.` } },
  //   { type: 'text', author: `support`, data: { text: `No story?` } },
  //   { type: 'system', data: { text: 'You have been transferred to another operator', meta: '04-07-2018 15:57' } },
  //   { type: 'file', author: `support`, data: { text: `No forget the story. `, file: { name: 'file.mp3', url: 'https://blissmotorsimages.s3.us-east-2.amazonaws.com/dthonda/images/thumbs/big/000ce3ac068721f7857fcf7aeb949d7975c4a060.jpg' } } },
  //   { type: 'file', author: `me`, data: { text: `What about this one instead?? `, file: { name: 'song.mp3', url: 'https://blissmotorsimages.s3.us-east-2.amazonaws.com/dthonda/images/thumbs/big/000ce3ac068721f7857fcf7aeb949d7975c4a060.jpg' }, meta: '✓✓ Read' } },
  //   { type: 'text', author: `support`, data: { text: `You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. ` } },
  //   { type: 'emoji', author: `me`, data: { emoji: `😋` } },
  //   { type: 'text', author: `me`, data: { text: `Do you read me...`, meta: '✓✓ Read' } },
  //   { type: 'text', author: `me`, data: { text: `...or not?`, meta: '✓ Delivered' } },
  //   { type: 'ack', author: `me`, data: {text: 'Sent', meta: '04-08-2018 15:57'} },
  //   { type: 'video', author: `support`, data: { text: `...or not?`, video: {title: 'Honda 2019', text: 'Hello', url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'} } },
  //   { type: 'video', author: `support`, data: { text: `...or not?`, video: {title: 'Honda 2019', text: 'Hello', source: 'youtube', url: 'https://www.youtube.com/embed/Wi8skWmobkY'} } },
  //   { type: 'system', data: { text: 'User changed security key', meta: '04-08-2018 15:57' } },
  //   { type: 'list',
  //     author: `support`,
  //     data: { text: `No forget the story. `,
  //       top_element_style: 'large',
  //       elements: [{
  //         title: 'Test Card 1',
  //         subtitle: 'This is a test message',
  //         url: 'https://blissmotorsimages.s3.us-east-2.amazonaws.com/dthonda/images/thumbs/big/000ce3ac068721f7857fcf7aeb949d7975c4a060.jpg',
  //         buttons: [
  //           {title: "You've got to have a story.",
  //             payload: "You've got to have a story"},
  //           {title: "You've got to have a story.",
  //             payload: "You've got to have a story"}] },
  //       {
  //         title: 'Test Card 2',
  //         subtitle: 'This is a test message',
  //         url: 'https://blissmotorsimages.s3.us-east-2.amazonaws.com/dthonda/images/thumbs/big/000ce3ac068721f7857fcf7aeb949d7975c4a060.jpg',
  //         buttons: [
  //           {title: "You've got to have a story.",
  //             payload: "You've got to have a story"},
  //           {title: "You've got to have a story.",
  //             payload: "You've got to have a story"}]
  //       },
  //       {
  //         title: 'Test Card 3',
  //         subtitle: 'This is a test message',
  //         url: 'https://blissmotorsimages.s3.us-east-2.amazonaws.com/dthonda/images/thumbs/big/000ce3ac068721f7857fcf7aeb949d7975c4a060.jpg',
  //         buttons: [
  //           {title: "You've got to have a story.",
  //             payload: "You've got to have a story"},
  //           {title: "You've got to have a story.",
  //             payload: "You've got to have a story"}]
  //       },
  //       {
  //         title: 'Test Card 4',
  //         subtitle: 'This is a test message',
  //         url: 'https://blissmotorsimages.s3.us-east-2.amazonaws.com/dthonda/images/thumbs/big/000ce3ac068721f7857fcf7aeb949d7975c4a060.jpg',
  //         buttons: [
  //           {title: "You've got to have a story.",
  //             payload: "You've got to have a story"},
  //           {title: "You've got to have a story.",
  //             payload: "You've got to have a story"}]
  //       }
  //       ] } },
  //   { type: 'image',
  //     author: `support`,
  //     data: { text: `No forget the story. `,
  //       elements:
  //   [
  //     { url: 'https://blissmotorsimages.s3.us-east-2.amazonaws.com/dthonda/images/thumbs/big/000ce3ac068721f7857fcf7aeb949d7975c4a060.jpg' },
  //     { url: 'https://blissmotorsimages.s3.us-east-2.amazonaws.com/dthonda/images/thumbs/big/000ce3ac068721f7857fcf7aeb949d7975c4a060.jpg',
  //       title: 'Image 1',
  //       text: 'Text' },
  //     { url: 'https://blissmotorsimages.s3.us-east-2.amazonaws.com/dthonda/images/thumbs/big/000ce3ac068721f7857fcf7aeb949d7975c4a060.jpg',
  //       title: 'Image 1',
  //       text: 'Text' }
  //   ]
  //     } },
  //   { type: 'image',
  //     author: `support`,
  //     data: { text: `No forget the story. `,
  //       elements:
  //   [
  //     { url: 'https://blissmotorsimages.s3.us-east-2.amazonaws.com/dthonda/images/thumbs/big/000ce3ac068721f7857fcf7aeb949d7975c4a060.jpg' }
  //   ]
  //     } },
  //   { type: 'card',
  //     author: `support`,
  //     data: { text: `No forget the story. `,
  //       elements: [
  //         { name: 'file.mp3',
  //           title: 'Test Card 1',
  //           url: 'https://blissmotorsimages.s3.us-east-2.amazonaws.com/dthonda/images/thumbs/big/000ce3ac068721f7857fcf7aeb949d7975c4a060.jpg',
  //           buttons: [
  //             {title: "You've got to have a story.",
  //               payload: "You've got to have a story"},
  //             {title: "You've got to have a story.",
  //               payload: "You've got to have a story"}]
  //         },
  //         { name: 'file.mp3',
  //           title: 'Test Card 2',
  //           url: 'https://blissmotorsimages.s3.us-east-2.amazonaws.com/dthonda/images/thumbs/big/000ce3ac068721f7857fcf7aeb949d7975c4a060.jpg',
  //           buttons: [
  //             {title: "You've got to have a story.",
  //               payload: "You've got to have a story"},
  //             {title: "You've got to have a story.",
  //               payload: "You've got to have a story"}]
  //         }
  //       ] } },
  //   { type: 'button',
  //     author: `support`,
  //     data: { text: `What about suggestions?`,
  //       buttons:
  //   [
  //     {title: 'I am a button 1',
  //       payload: 'I am testing 2'},
  //     {title: 'I am a button 2',
  //       payload: 'I am testing 2'},
  //     {title: 'I am a button 3',
  //       payload: 'I am testing 3'},
  //     {title: 'I am a button 4',
  //       payload: 'I am testing 4'},
  //     {title: 'I am a button 5',
  //       payload: 'I am testing 5'},
  //     {title: 'I am a button 6',
  //       payload: 'I am testing 6'},
  //     {title: 'I am a button 7',
  //       payload: 'I am testing 7'},
  //     {title: 'I am a button 8',
  //       payload: 'I am testing 8'},
  //     {title: 'I am a button 9',
  //       payload: 'I am testing 9'},
  //     {title: 'I am a button 10',
  //       payload: 'I am testing 10'},
  //     {title: 'I am a button 11',
  //       payload: 'I am testing 11'},
  //     {title: 'I am a button 12',
  //       payload: 'I am testing 12'},
  //     {title: 'I am a button 1222222222222222222222222222222',
  //       payload: 'I am testing 12'}
  //   ]
  //     }},
  //   { type: 'text', author: `support`, data: { text: `What about suggestions?` }, suggestions: ['Looks good!', "It's OK.", 'Uhh.. Do I really have to say something?', "This suggestion is way too long for css purpose. Let's make it long... Longer, and more and more.. Never ending."] }
  // ],
  // messageList: [{ type: 'form', author: `support`, data: { text: `What about suggestions?`, title: 'Hello', subtitle: 'World', buttons: [{title: 'Submit'}] }}],
