const {
  conversation,
  Card,
  Collection,
  Simple,
  List,
  Media,
  Image,
  Table,
  Canvas,
} = require("@assistant/conversation");
const functions = require("firebase-functions");

const app = conversation({ debug: true });

const ASSISTANT_LOGO_IMAGE = new Image({
  url: "https://developers.google.com/assistant/assistant_96.png",
  alt: "Google Assistant logo",
});

app.handle("greeting", (conv) => {
  if (!conv.device.capabilities.includes("INTERACTIVE_CANVAS")) {
    conv.add("Sorry, this device does not support Interactive Canvas!");
    conv.scene.next.name = "actions.page.END_CONVERSATION";
    return;
  }
  // console.log("inside greeting app index.js");
  // console.log(firebaseConfig);
  // console.log("is this here too?");
  // if (conv.user.lastSeenTime === undefined) {
  //   conv.add(`<speak>${NEW_GREETING}</speak>`);
  // } else {
  //   conv.add(`<speak>${randomArrayItem(RETURNING_GREETINGS)}</speak>`);
  // }
  // conv.add("Would you like to start playing the game?");
  conv.add(`<speak>Welcome to React-with-Canvas!</speak>`);
  // conv.ask(
  //   new HtmlResponse({
  //     url: `https://${firebaseConfig.projectId}.firebaseapp.com/`,
  //     data: {
  //       scene: "WELCOME",
  //     },
  //   })
  // );
  conv.add(
    new Canvas({
      data: {
        scene: "WELCOME",
      },
    })
  );
});

// Simple
app.handle("simple", (conv) => {
  conv.add(
    new Simple({
      speech: "This is the first simple response.",
      text: "This is the 1st simple response.",
    })
  );
  conv.add(
    new Simple({
      speech: "This is the last simple response.",
      text: "This is the last simple response.",
    })
  );
});

// Image
app.handle("image", (conv) => {
  conv.add("This is an image prompt!");
  conv.add(ASSISTANT_LOGO_IMAGE);
});

// Card
app.handle("card", (conv) => {
  conv.add("This is a card.");
  // conv.add(
  //   new Card({
  //     title: "Card Title",
  //     subtitle: "Card Subtitle",
  //     text: "Card Content",
  //     image: ASSISTANT_LOGO_IMAGE,
  //   })
  // );
  conv.add(
    new Canvas({
      data: {
        scene: "CARD",
      },
    })
  );
});

// Table
app.handle("table", (conv) => {
  conv.add("This is a table.");
  conv.add(
    new Table({
      title: "Table Title",
      subtitle: "Table Subtitle",
      image: ASSISTANT_LOGO_IMAGE,
      columns: [
        {
          header: "Column A",
        },
        {
          header: "Column B",
        },
        {
          header: "Column C",
        },
      ],
      rows: [
        {
          cells: [
            {
              text: "A1",
            },
            {
              text: "B1",
            },
            {
              text: "C1",
            },
          ],
        },
        {
          cells: [
            {
              text: "A2",
            },
            {
              text: "B2",
            },
            {
              text: "C2",
            },
          ],
        },
        {
          cells: [
            {
              text: "A3",
            },
            {
              text: "B3",
            },
            {
              text: "C3",
            },
          ],
        },
      ],
    })
  );
});

// Collection
app.handle("collection", (conv) => {
  conv.add("This is a collection.");
  // Override prompt_option Type with display
  // information for Collection items.
  conv.session.typeOverrides = [
    {
      name: "prompt_option",
      mode: "TYPE_REPLACE",
      synonym: {
        entries: [
          {
            name: "ITEM_1",
            synonyms: ["Item 1", "First item"],
            display: {
              title: "Item #1",
              description: "Description of Item #1",
              image: ASSISTANT_LOGO_IMAGE,
            },
          },
          {
            name: "ITEM_2",
            synonyms: ["Item 2", "Second item"],
            display: {
              title: "Item #2",
              description: "Description of Item #2",
              image: ASSISTANT_LOGO_IMAGE,
            },
          },
          {
            name: "ITEM_3",
            synonyms: ["Item 3", "Third item"],
            display: {
              title: "Item #3",
              description: "Description of Item #3",
              image: ASSISTANT_LOGO_IMAGE,
            },
          },
          {
            name: "ITEM_4",
            synonyms: ["Item 4", "Fourth item"],
            display: {
              title: "Item #4",
              description: "Description of Item #4",
              image: ASSISTANT_LOGO_IMAGE,
            },
          },
        ],
      },
    },
  ];
  conv.add(
    new Collection({
      title: "Collection Title",
      subtitle: "Collection subtitle",
      items: [
        {
          key: "ITEM_1",
        },
        {
          key: "ITEM_2",
        },
        {
          key: "ITEM_3",
        },
        {
          key: "ITEM_4",
        },
      ],
    })
  );
});

// List
app.handle("list", (conv) => {
  conv.add("This is a list.");
  // Override prompt_option Type with display
  // information for List items.
  conv.session.typeOverrides = [
    {
      name: "prompt_option",
      mode: "TYPE_REPLACE",
      synonym: {
        entries: [
          {
            name: "ITEM_1",
            synonyms: ["Item 1", "First item"],
            display: {
              title: "Item #1",
              description: "Description of Item #1",
              image: ASSISTANT_LOGO_IMAGE,
            },
          },
          {
            name: "ITEM_2",
            synonyms: ["Item 2", "Second item"],
            display: {
              title: "Item #2",
              description: "Description of Item #2",
              image: ASSISTANT_LOGO_IMAGE,
            },
          },
          {
            name: "ITEM_3",
            synonyms: ["Item 3", "Third item"],
            display: {
              title: "Item #3",
              description: "Description of Item #3",
              image: ASSISTANT_LOGO_IMAGE,
            },
          },
          {
            name: "ITEM_4",
            synonyms: ["Item 4", "Fourth item"],
            display: {
              title: "Item #4",
              description: "Description of Item #4",
              image: ASSISTANT_LOGO_IMAGE,
            },
          },
        ],
      },
    },
  ];
  conv.add(
    new List({
      title: "List title",
      subtitle: "List subtitle",
      items: [
        {
          key: "ITEM_1",
        },
        {
          key: "ITEM_2",
        },
        {
          key: "ITEM_3",
        },
        {
          key: "ITEM_4",
        },
      ],
    })
  );
});

// Option
app.handle("option", (conv) => {
  const selectedOption = conv.session.params.prompt_option
    .toLowerCase()
    .replace(/_/g, " #");
  conv.add(`You selected ${selectedOption}.`);
});

// Media
app.handle("media", (conv) => {
  conv.add("This is a media response");
  // conv.add(
  //   new Media({
  //     mediaObjects: [
  //       {
  //         name: "Media name",
  //         description: "Media description",
  //         url: "https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg",
  //         image: {
  //           large: ASSISTANT_LOGO_IMAGE,
  //         },
  //       },
  //     ],
  //     mediaType: "AUDIO",
  //     optionalMediaControls: ["PAUSED", "STOPPED"],
  //   })
  // );
  conv.add(
    new Canvas({
      data: {
        scene: "MEDIA",
      },
    })
  );
});

// Media Status
app.handle("media_status", (conv) => {
  const mediaStatus = conv.intent.params.MEDIA_STATUS.resolved;
  switch (mediaStatus) {
    case "FINISHED":
      conv.add("Media has finished playing.");
      break;
    case "FAILED":
      conv.add("Media has failed.");
      break;
    case "PAUSED" || "STOPPED":
      conv.add(
        new Media({
          mediaType: "MEDIA_STATUS_ACK",
        })
      );
      break;
    default:
      conv.add("Unknown media status received.");
  }
});

exports.ActionsOnGoogleFulfillment = functions.https.onRequest(app);
