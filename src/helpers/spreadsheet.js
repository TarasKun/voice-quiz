import config from "../config";


export function getDataFromSpreadsheets(callback, range) {
    window.gapi.client.load("sheets", "v4", () => {
        window.gapi.client.sheets.spreadsheets.values
            .get({
                spreadsheetId: config.spreadsheetId,
                range: range
            })
            .then(
                response => {
                    const data = response.result.values;
                    if(range === 'Week1_question!A2:F11'){
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

// export function setDataToSpreadsheets(score) {
//     const lastField = 15 + score.length - 1;
//     return window.gapi.client.sheets.spreadsheets.values.update({
//         "spreadsheetId": config.spreadsheetId,
//         "range": `Week1_question!A15:B${lastField}`,
//         "valueInputOption": "RAW",
//         "resource": {
//             "majorDimension": "ROWS",
//             "range": `Week 1!A15:B${lastField}` ,
//             "values": score
//         }
//     }).then(function () {
//             console.log("Successful connect");
//         },
//         function (err) {
//             console.error("Execute error", err);
//         });
// }

export const setDataToSpreadsheets = async score => {
    // e.preventDefault();

    try {
        const response = await fetch(
            "https://v1.nocodeapi.com/taraskun/google_sheets/JBgbrumLVPNnBOVM?tabId=Week1_results", {
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