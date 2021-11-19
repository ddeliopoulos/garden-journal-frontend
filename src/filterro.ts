interface JournalEntry {
    createdAt: number
    data: string
}

// find entry with max createdAt
const entries: Array<JournalEntry> = [
    {createdAt: 5, data: 'bla'},
    {createdAt: 123, data: 'hey'},
    {createdAt: 456, data: 'ho'},
    {createdAt: 22, data: 'bro'}
];


