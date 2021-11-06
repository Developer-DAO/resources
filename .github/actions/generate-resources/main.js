// Imports
// ========================================================
const Airtable = require('airtable');
const fs = require('fs');

// Constants
// ========================================================
// airtable resources managed by @kempsterrrr
const AIRTABLE_READONLY_KEY = 'keyDaaDlZelNrerXQ';
const AIRTABLE_RESOURCE_BASE = 'appPP6MpO5hrfQwqI';
const README_RESOURCE_HEADER = `# Resources
Welcome to the [DeveloperDAO](https://github.com/Developer-DAO/developer-dao) **Resource Base**.
The community has created this knowledge base to help you **learn** and **grow** in your Web3 journey, whether you want to start learning about Web3, or you're building your first dApp, or you're deep into the world of solidity.
## Terminology
- Visit the [Glossary](GLOSSARY.md) to understand more about a specific term.
## Resources
`;

// Config
// ========================================================
const airtable = new Airtable({ apiKey: AIRTABLE_READONLY_KEY });

// Functions
// ========================================================
/**
 *
 * @param {*} tableName
 * @returns
 */
const fetchAirtableData = async (tableName) => {
  let DATA = [];
  try {
    if (!tableName) throw new Error('Invalid name.');

    await airtable
      .base(AIRTABLE_RESOURCE_BASE)(tableName)
      .select()
      .eachPage((records, fetchNextPage) => {
        DATA = records
          ? [...DATA, ...records.map((item) => item?._rawJson || '')]
          : DATA;
        fetchNextPage();
      });
  } catch (error) {
    console.error(`ERROR: Fetching '${tableName}''`, { error });
  }

  return DATA;
};

/**
 *
 */
const init = async () => {
  // Retrieve airtable data
  const resourcesData = await fetchAirtableData('Resource');
  const authorsData = await fetchAirtableData('Author');
  console.log(`received ${resourcesData.length} resources and ${authorsData.length} authors`)
  // ids used with resources
  const authorMap = {};
  authorsData.forEach((item) => {
    if (item?.id && item?.fields) { 
      authorMap[item.id] = item.fields;
    }
  });

  // Build markdown body
  const README_RESOURCE_BODY = resourcesData
    .map(
      (item) =>
        `- [${item?.fields?.Title}](${item?.fields?.Source})\n\n  Author${
          item?.fields?.Author?.length > 1 ? 's' : ''
        }: ${item?.fields?.Author?.map((authorId) => authorMap[authorId]?.Name ?? '')}${
          item?.fields?.Summary ? '\n' + item?.fields?.Summary : ''
        }`
    )
    .join('\n\n');
  console.log('writing to ./README.md',README_RESOURCE_HEADER,README_RESOURCE_BODY);
  // Write README.md file
  fs.writeFileSync(
    './README.md',
    `${README_RESOURCE_HEADER}${README_RESOURCE_BODY}`,
  );
};


/**
 * On the condition of flag node main.js --run
 */
// if (process.argv && process.argv.includes('--run')) {  
init();
// }

// Exports
// ========================================================
module.exports = {
  fetchAirtableData,
  init,
  AIRTABLE_READONLY_KEY,
  AIRTABLE_RESOURCE_BASE,
  README_RESOURCE_HEADER
};
