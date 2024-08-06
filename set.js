const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0hCMWZXQUtwL3JPRHNhTVpXSWpCcnhBTk84UFVlMHhadTZhKzVMRjdVTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZWU1ZDFINWltS0pEMzRTNjQ2YnQ1VnhDMWFlRzZ4ZmZ0R0lsZnBlTHFRUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNTXZSZmFmWFgySDJEZmsrdE9BSFRiOXhGbnhHWHJ4R2VQWnA0cGIwOUZFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRL01SQVdRSmJnOEUvTHlmSDY5cFFNWGNCUVpVN2tSVEJuV0M3NUJrbFVFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFNcVAxY0FFMW84MGY0WlR5RHc4QmZKWHVQdkZReEJxaFlwcFd5Mk9kV009In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlQ5UG9mdGwwVlNqZXZLc2ZsSGUwWkZ1bWtrR0tiUTFscGo2SWNXbmwzd0k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0Q1N01zZ090T1FoVW5rVm02ZmE5eGlkQmNmZ0loVVI1cGxsUURRTFlrZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMzdya214eGhQc0tTc3ZpTzVpMkM4cm9OS3RKR3pjM0JOMG10eU0rWDlYMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjVJNU55UGZ4R280b0huVURiQkxyb2NJWUZPK2lIVDdGemNQNXlscHluYlluTHQzT2NZZERjMnc3WWxWSUYzc2dHYzZ3MmlOVDJLaERLL2hWMUprM0RBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzMsImFkdlNlY3JldEtleSI6IldJQTJSclVWUmV5N3VnZ2k0ejlvV2ZzUFBVM2pjVTZpSmJPV0NZcDdFRzg9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IkhCeHA0SUNsUTltZWJtWTRJREZ3U3ciLCJwaG9uZUlkIjoiOGQxOTQzMDEtMmY1ZS00ZWE0LTljMTQtMmIwMTk4NTg4ZDI5IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVwa2xFdmNiS0tYTisyZFI2eEpmZkpnQmh5Yz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRQlRldVl6WkJHaFJ3WitBTTZiQjJsZFZKK289In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiWTFTOERIM1ciLCJtZSI6eyJpZCI6IjI1NDcxNjA5MTA3MDo4QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPVElvcmdFRUlmdnlyVUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJKcGliN2ZtSHFVeVlIdkc0eWtXaGFFN2dvMHR1L2J6Y2preEFXYkNEZzA4PSIsImFjY291bnRTaWduYXR1cmUiOiJ0SVA2aGRXNGhrdlBMandDdXo2akxXWXBPc2dHL3BScVVXeHlUZjRxMWpHdlpxRmY5UXRVeVRnY1pmdi9EOXZ3QTdUeFprWWN4R1VzS0pFL3ZIL2lBUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoianNCUFNqMmphR2xsVG9JZmJ0ekwzRnVDUTdYRjA4ZHppYWF5UDdSS1o4WW1mZ3JSYkg5YzV0L0Z1WkU4c280aTJtelZnaDVCMzB1NVBUVzgvc3ZSQlE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3MTYwOTEwNzA6OEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJTYVltKzM1aDZsTW1CN3h1TXBGb1doTzRLTkxidjI4M0k1TVFGbXdnNE5QIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIyOTg4NDM3fQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "MESH KE",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 254716091070",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'MESH KE',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
