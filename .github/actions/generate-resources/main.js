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
 * @param {*} authorTwitter a string containing the twitter handle possibly with other undesired content
 * @returns the string twitter handler from the input
 */
const cleanTwitterString = (authorTwitter) => {
  if (!authorTwitter) return;
  // prevent casing weirdness and ensure lowercasae for checking
  const compare = authorTwitter.toLowerCase();
  // lazy, ifs for the common distortions
  // either the '.com/' construct or starting with @
  if (compare.indexOf('twitter.com') > -1) {
    const comIndex = compare.indexOf('.com/') + 5;
    return authorTwitter.substring(comIndex, authorTwitter.length);
  }
  if (compare.startsWith('@')) {
    return authorTwitter.substring(1, authorTwitter.length);
  }
  return authorTwitter;
};

/**
 *
 */
const init = async () => {
  // Retrieve airtable data
  const resourcesData = await fetchAirtableData('Resource');
  const authorsData = await fetchAirtableData('Author');
  console.log(
    `received ${resourcesData.length} resources and ${authorsData.length} authors`,
  );

  // ids used with resources
  const authorMap = {};
  authorsData.forEach((item) => {
    if (item?.id && item?.fields) { 
      authorMap[item.id] = {
        ...item.fields,
        Twitter: cleanTwitterString(item.fields.Twitter)
      }
    }
  });

  /**
   * 
   * @param {Author} author the airtable author, notably included Name and optional Twitter value
   * returns the string (markdown) value for the author
   */
  const buildAuthorText = (author) => {
    if(author.Twitter){
      return `[${author.Name ?? 'No name given'}](https://twitter.com/${author.Twitter})`;
    }
    return author.Name ?? '';
  }

  const buildSection = (title, resourceList) => {
    let resource_string = `##${title}\n\n`;
    return resource_string.concat(resourceList.map(
        (item) => (
          `- [${item?.fields?.Title}](${item?.fields?.Source})\n\n  Author${
            item?.fields?.Author?.length > 1 ? 's' : ''
          }: ${item?.fields?.Author?.map((authorId) => buildAuthorText(authorMap[authorId]))}${
            item?.fields?.Summary ? '\n\n  ' + item?.fields?.Summary : ''
          }`
        )
      )
      .join('\n\n')
    );
  }

  const README_RESOURCE_BODY = 
    buildSection('Beginner', resourcesData.filter((item) => item.fields?.Level==='Beginner'))+'\n\n'
    + buildSection('Intermediate', resourcesData.filter((item) => item.fields?.Level==='Intermediate'))+'\n\n'
    + buildSection('Expert', resourcesData.filter((item) => item.field?.Level==='Expert'))+'\n\n';
  console.log(
    'writing to ./README.md',
    README_RESOURCE_HEADER,
    README_RESOURCE_BODY,
  );

  // Write README.md file
  fs.writeFileSync(
    './README.md',
    `${README_RESOURCE_HEADER}${README_RESOURCE_BODY}`,
  );
};

// Exports
// ========================================================
module.exports = {
  fetchAirtableData,
  init,
  AIRTABLE_READONLY_KEY,
  AIRTABLE_RESOURCE_BASE,
  README_RESOURCE_HEADER,
};
