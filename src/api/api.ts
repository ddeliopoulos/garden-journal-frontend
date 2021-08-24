
interface JournalEntry {
    plantId:string,
    type:string,
    data:string
}

const postJournal = async (entry:JournalEntry) => {
    await fetch('/api/journal-entries', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            plantId: entry.plantId,
            createdAt: Date.now(),
            type: entry.type,
            data: entry.data,
        }),
    })
    console.log("Entry Successfully Posted")

}

export {
    postJournal
}