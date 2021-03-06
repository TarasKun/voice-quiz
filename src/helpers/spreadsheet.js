const { REACT_APP_SPREADSHEET_ID, REACT_APP_CURRENT_ANSWERS_TABLE, REACT_APP_CURRENT_QUESTIONS_TABLE } = process.env;

export function getDataFromSpreadsheets(callback, range) {
    const currentRange = REACT_APP_CURRENT_QUESTIONS_TABLE + '!A2:F11';

    window.gapi.client.load("sheets", "v4", () => {
        window.gapi.client.sheets.spreadsheets.values
            .get({
                spreadsheetId: REACT_APP_SPREADSHEET_ID,
                range: range
            })
            .then(
                response => {
                    const data = response.result.values;
                    if(range === currentRange){
                        const questions = data.map(question => ({
                            question: question[0],
                            answers: [question[1], question[2], question[3], question[4]],
                            correct: question[5]
                        })) || [];
                        callback({
                            questions
                        })} else {
                        callback(data)
                    }
                },
                response => {
                    callback(false, response.result.error);
                }
            );
    });
}

export const setDataToSpreadsheets = async score => {
    const currentLink = "https://v1.nocodeapi.com/taraskun/google_sheets/JBgbrumLVPNnBOVM?tabId=" + REACT_APP_CURRENT_ANSWERS_TABLE

    try {
        const response = await fetch(
            currentLink,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify([score])
            }
        );
        await response.json()

    } catch (e) {
        console.error(e)
    }
}