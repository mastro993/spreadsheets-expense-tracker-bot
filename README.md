# spreadsheets-expense-tracker-bot

Telegram bot to track expenses on a Google Spreadsheet

## ⚡️ How to use it

Prerequisites:

- A telegram bot. You can create one using [@BotFather](https://t.me/botfather) on Telegram, just follow [these instructions](https://core.telegram.org/bots/tutorial). Remember to write down the bot token that it will give to you.
- A Google Spreadsheet document where to insert the expenses. You can create a new one or use an existing one, just make sure to have a Sheet where the bot can put the data.
- `clasp` cli, we'll use it to push the code to the Google Spreadsheet and manage deployments. Of course you can do it manually... but it's not cool :P

#### `clasp` configuration

If you want to update the code manually skip this step.

To enable clasp cli in this project follow the instructions [here](https://developers.google.com/apps-script/guides/clasp?hl=en) and make sure to be logged into your Google accout.

Once you have logged in, use the command below inside the bot project folder

```
clasp clone <scriptId>
```

where `scriptId` is the ID of your project. You can find it under **Project Settings** in the App Script page.

### 🔨 Build

Before build the project we need to setup some environment variables, so just create an .env file in the root project with the following content:

```bash
TELEGRAM_TOKEN = <telegramToken>
TELEGRAM_USER_ID = <telegramUserId>
```

`<telegramToken>` is your bot token, `<telegramUserId>` is the chat ID associated to your Telegram account. Checkout [@userinfobot](https://t.me/userinfobot) to know what's your.

Once the environment is set up we are good to go with the build phase.

Unfortunately, Google App Script doesn't support ES6 modules, so it's nearly impossible to directly put this bot code into the App Script project.
To be honest you could, but you'll have to put everything in one giant file, which isn't that nice to read and maintain.

This project uses [rollup.js](https://rollupjs.org/) to transpile the code into one single Javascript file and make it possibile to upload it to Google App Script project. Just use

```bash
yarn build
```

and you'll find on single big, ugly and almost unreadable file in `build/index.js`. But hey, it's good for App Script!

At this point, if you have configured clasp, you can push the code to the project using

```bash
yarn push
```

Alternatively you can just copy and paste it the App Script root folder.

### 🌐 Deploy

To make the code reachable from the web we need to create an app deployment.

- From the App Script dashboard click **Deploy > New deployment**
- Select Web Application
- Make sure to put `Everyone` in the access tab.
- Click **Deploy**

Now the app can handle external requests via the associated url `https://script.google.com/macros/s/<deployId>/exec`

### 🎣 Setup Telegram Bot webhook

From the App Script project page you can link the Telegram Bot just by calling `setTelegramWebook`.
Or you can simply call `https://api.telegram.org/bot<telegramToken>/setWebhook?url=<webAppUrl>` from any REST client like Postman. 

Now under **Deploy > Manage deployment** you can see the deployment ID.
If you want to deploy a new version directly from the `clasp` cli, put that ID in your `package.json` file under `appscript_deploy_id`.

In this way you can build and deploy a new version with

```bash
yarn release
```

### 

### Configuration

#### Expense categories

You can customize expense categories by changing `EXPENSE_CATEGORIES` under `src/config/categories.ts`.

#### Expenses Sheet

In `src/config/spreadhseet.ts` you can change the spreadsheet configuration:

- `SHEET_ID`: id of your Google Spreadsheet document
- `SHEET_NAME`: name of the sheet where the bot will put the expense data

## TODO

- [ ] `/summary` command to show expense summary of current week/month/year
- [ ] Expense charts and projections
- [ ] Automatically pick category based on expense description (if quick expense)
