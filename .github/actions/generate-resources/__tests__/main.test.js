// Mocks
// **NOTE:** Mocks needs to be init before main is imported
// ex: ReferenceError: Cannot access 'mockAirtableBase' before initialization
// ========================================================
// To suppress the console.error
global.console = {
  ...jest.requireActual('console'),
  error: jest.fn(),
};

/**
 *
 */
const mockAirtableEachPageNextPage = jest.fn();

/**
 *
 */
const mockAirtableEachPage = jest.fn();

/**
 *
 */
const mockAirtableSelect = jest.fn(() => ({
  eachPage: mockAirtableEachPage,
}));

/**
 *
 */
const mockAirtableBase = jest.fn(() => {
  return () => ({
    select: mockAirtableSelect,
  });
});

/**
 *
 */
jest.mock('airtable', () => {
  return jest.fn().mockImplementation(() => ({
    base: mockAirtableBase,
  }));
});

/**
 *
 */
const mockWriteFileSync = jest.fn();

/**
 *
 */
jest.mock('fs', () => {
  return {
    writeFileSync: mockWriteFileSync,
  };
});

/**
 *
 */
afterEach(() => {
  jest.clearAllMocks();
});

// Imports
// ========================================================
const main = require('../main');

// Tests
// ========================================================
/**
 * Failure - fetchAirtableData
 */
test('[Failure]: fetchAirtableData handles errors and returns empty array', async () => {
  // Setup

  // Pre Expectations
  expect(mockAirtableBase).not.toHaveBeenCalled();

  // Init
  const result = await main.fetchAirtableData();

  // Post Expectatations
  expect(mockAirtableBase).not.toHaveBeenCalled();
  expect(result).toEqual([]);
});

/**
 * Success - fetchAirtableData
 */
test('[Success]: fetchAirtableData returns array', async () => {
  // Setup
  mockAirtableEachPage.mockImplementation((callback) => {
    callback(
      [
        {
          _rawJson: 'entry1',
        },
        {
          _rawJson: 'entry2',
        },
      ],
      mockAirtableEachPageNextPage,
    );
  });

  // Pre Expectations
  expect(mockAirtableBase).not.toHaveBeenCalled();

  // Init
  const result = await main.fetchAirtableData('random');

  // Post Expectatations
  expect(mockAirtableBase).toHaveBeenCalledWith(main.AIRTABLE_RESOURCE_BASE);
  expect(mockAirtableBase).toHaveBeenCalled();
  expect(mockAirtableSelect).toHaveBeenCalled();
  expect(mockAirtableEachPage).toHaveBeenCalled();
  expect(mockAirtableEachPageNextPage).toHaveBeenCalled();
  expect(result).toEqual(['entry1', 'entry2']);
});

/**
 * Failure - init
 */
test('[Failure]: init returns a default README.md', async () => {
  // Setup
  const airTableResourceData = [
    {
      _rawJson: {
        fields: {
          Title: 'Title1',
          Source: 'Source1',
          Author: ['unknownAuthorId1'],
          Summary: 'Summary1',
        },
      },
    },
  ];
  mockAirtableEachPage.mockImplementation((callback) => {
    callback(airTableResourceData, mockAirtableEachPageNextPage);
  });
  const README_RESOURCE_BODY = airTableResourceData.map(
    (item) =>
      `- [${item?._rawJson?.fields?.Title}](${
        item?._rawJson?.fields?.Source
      })\n\n  Author${
        item?._rawJson?.fields?.Author?.length > 1 ? 's' : ''
      }: ${item?._rawJson?.fields?.Author?.map(() => '')}${
        item?._rawJson?.fields?.Summary
          ? '\n' + item?._rawJson?.fields?.Summary
          : ''
      }`,
  );

  // Pre Expectatations
  expect(mockAirtableBase).not.toHaveBeenCalled();

  // Init
  await main.init();

  // Post Expectatations
  expect(mockAirtableBase).toHaveBeenCalled();
  expect(mockWriteFileSync).toHaveBeenCalled();
  expect(mockWriteFileSync).toHaveBeenCalledWith(
    './README.md',
    `${main.README_RESOURCE_HEADER}${README_RESOURCE_BODY}`,
  );
});

/**
 * Success - init
 */
test('[Success]: init returns full README.md', async () => {
  // Setup
  const airTableAuthorData = [
    {
      _rawJson: {
        id: 'unknownAuthorId1',
        fields: {
          Name: 'AuthorName1',
        },
      },
    },
    {
      _rawJson: {
        id: 'unknownAuthorId2',
        fields: {
          Name: 'AuthorName2',
        },
      },
    },
    {
      _rawJson: {
        id: 'unknownAuthorId3',
        fields: {
          Name: '',
        },
      },
    },
  ];
  const airTableResourceData = [
    {
      _rawJson: {
        fields: {
          Title: 'Title1',
          Source: 'Source1',
          Author: ['unknownAuthorId1', 'unknownAuthorId2', 'unknownAuthorId3'],
          Summary: 'Summary1',
        },
      },
    },
  ];

  mockAirtableBase.mockImplementation(() => {
    return (tableName) => {
      if (tableName === 'Author') {
        return {
          select: () => ({
            eachPage: (callback) => {
              callback(airTableAuthorData, mockAirtableEachPageNextPage);
            },
          }),
        };
      }
      return {
        select: () => ({
          eachPage: (callback) => {
            callback(airTableResourceData, mockAirtableEachPageNextPage);
          },
        }),
      };
    };
  });

  const authorMap = {};
  airTableAuthorData.forEach((item) => {
    if (item?._rawJson?.id && item?._rawJson?.fields) {
      authorMap[item?._rawJson?.id] = item?._rawJson?.fields;
    }
  });

  const README_RESOURCE_BODY = airTableResourceData.map(
    (item) =>
      `- [${item?._rawJson?.fields?.Title}](${
        item?._rawJson?.fields?.Source
      })\n\n  Author${
        item?._rawJson?.fields?.Author?.length > 1 ? 's' : ''
      }: ${item?._rawJson?.fields?.Author?.map(
        (authorId) => authorMap[authorId]?.Name ?? '',
      )}${
        item?._rawJson?.fields?.Summary
          ? '\n' + item?._rawJson?.fields?.Summary
          : ''
      }`,
  );

  // Pre Expectatations
  expect(mockAirtableBase).not.toHaveBeenCalled();

  // Init
  await main.init();

  // Post Expectatations
  expect(mockAirtableBase).toHaveBeenCalled();
  expect(mockWriteFileSync).toHaveBeenCalledWith(
    './README.md',
    `${main.README_RESOURCE_HEADER}${README_RESOURCE_BODY}`,
  );
});
