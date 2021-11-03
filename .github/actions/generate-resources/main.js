const Airtable = require('airtable');
const fs = require('fs');

// airtable resources managed by @kempsterrrr
const AIRTABLE_READONLY_KEY = 'keyDaaDlZelNrerXQ';
const AIRTABLE_RESOURCE_BASE = 'appPP6MpO5hrfQwqI';

// copy pasta from the old README.md
const RESOURCE_HEADER = `# Resources

Welcome to the [DeveloperDAO](https://github.com/Developer-DAO/developer-dao) **Resource Base**.

The community has created this knowledge base to help you **learn** and **grow** in your Web3 journey, whether you want to start learning about Web3, or you're building your first dApp, or you're deep into the world of solidity.

## Terminology

- Visit the [Glossary](GLOSSARY.md) to understand more about a specific term.

## Resources

`;

const airtable = new Airtable({ apiKey: AIRTABLE_READONLY_KEY });

let completed = { 
  resources: false, 
  authors: false
};

let resourceList = [];
airtable.base(AIRTABLE_RESOURCE_BASE)('Resource')
  .select()
  .eachPage((records, fetchNextPage) => {
    try{
      resourceList = records ? resourceList.concat(records.map(item => item._rawJson)) : resourceList;
      fetchNextPage();
    }catch(e){
      console.error('error fetching resources',e);
    }
  },
  (err) => {
    if(err){
      console.error('error fetching Resources',err);
    }
    completed.resources = true;
    tryProcessData();
  });

let authorList = [];
airtable.base(AIRTABLE_RESOURCE_BASE)('Author')
  .select({})
  .eachPage(
    (records, fetchNextPage) => {
      try{
        authorList = records ? authorList.concat(
          records.map((item) => item._rawJson),
        ) : authorList;
        fetchNextPage();
      }catch(e){
        console.error('error fetching authors',e);
      }
    },
    (err) => {
      if (err) {
        console.error('error fetching Authors', err);
      }
      completed.authors = true;
      tryProcessData();
    },
  );

// note that blockchains, categories, and tags are also availble but not used in the existing Resources format

const tryProcessData = () => {
  if(completed.authors && completed.resources){
    processData();
  }
}

const processData = () => {
  // easy to look up from resource author list
  const authorMap = {};
  authorList.forEach(item => { authorMap[item.id] = item.fields });

  const resourceString = resourceList.map(item => {
    // convert it to a formatted string
    return `- [${item.fields.Title}](${item.fields.Source})\n\n  Author${item.fields.Author?.length>1 ? 's' : ''}: ${item.fields.Author?.map(authorId => authorMap[authorId].Name)}${item.fields.Summary ? '\n'+item.fields.Summary : ''}` 
  }).join('\n\n');

  let returnString = RESOURCE_HEADER + resourceString;
  fs.writeFileSync('./README.md', returnString);
}