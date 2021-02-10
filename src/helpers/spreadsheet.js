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
                    if(range === 'Week 1!A2:F11'){
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

export function setDataToSpreadsheets(score) {
    console.log('score', score);
    const lastField = 15 + score.length - 1;
    return window.gapi.client.sheets.spreadsheets.values.update({
        "spreadsheetId": config.spreadsheetId,
        "range": `Week 1!A15:B${lastField}`,
        "valueInputOption": "RAW",
        "resource": {
            "majorDimension": "ROWS",
            "range": `Week 1!A15:B${lastField}` ,
            "values": score
        }
    }).then(function (response) {
            console.log("Response", response);
        },
        function (err) {
            console.error("Execute error", err);
        });
}

export const setPersonalData = score => {

    function isQuizFinished(isSignedIn) {
        // if (isSignedIn) {
        console.log('isSignedIn', isSignedIn);
        console.log('score', score);
        setDataToSpreadsheets(score);
        // }
    }

    window.gapi.load('auth2', function () {
        window.gapi.auth2.init({
            // apiKey: config.apiKey,
            // discoveryDocs: config.discoveryDocs,
            scope: config.scope,
            client_id: config.clientId,
        }).then(() => {
            console.log('here');
            window.gapi.auth2.getAuthInstance().isSignedIn.listen(isQuizFinished);
            isQuizFinished(window.gapi.auth2.getAuthInstance().isSignedIn.get());
        });
    });

}


// export function getDataFromSpreadsheets(callback, range) {
//     window.gapi.client.load("sheets", "v4", () => {
//         window.gapi.client.sheets.spreadsheets.values
//             .get({
//                 spreadsheetId: config.spreadsheetId,
//                 range: range
//             })
//             .then(
//                 response => {
//                     const data = response.result.values;
//                     if(range === 'Week 1!A2:F11'){
//                     const questions = data.map(question => ({
//                         question: question[0],
//                         answers: [question[1], question[2], question[3], question[4]],
//                         correct: question[5]
//                     })) || [];
//                         callback({
//                         questions
//                     })} else {
//                         callback(data)
//                     }
//                 },
//                 response => {
//                     callback(false, response.result.error);
//                 }
//             );
//     });
// }
//
// export function setDataToSpreadsheets(score) {
//     console.log('score', score);
//     const lastField = 15 + score.length - 1;
//     return window.gapi.client.sheets.spreadsheets.values.update({
//         "spreadsheetId": config.spreadsheetId,
//         "range": `Week 1!A15:B${lastField}`,
//         "valueInputOption": "RAW",
//         "resource": {
//             "majorDimension": "ROWS",
//             "range": `Week 1!A15:B${lastField}` ,
//             "values": score
//         }
//     }).then(function (response) {
//                 console.log("Response", response);
//             },
//             function (err) {
//                 console.error("Execute error", err);
//             });
// }
//
// export const setPersonalData = score => {
//
//     function isQuizFinished(isSignedIn) {
//         // if (isSignedIn) {
//         console.log('isSignedIn', isSignedIn);
//         console.log('score', score);
//         setDataToSpreadsheets(score);
//         // }
//     }
//
//     window.gapi.load('auth2', function () {
//         window.gapi.auth2.init({
//                 // apiKey: config.apiKey,
//                 // discoveryDocs: config.discoveryDocs,
//                 scope: config.scope,
//                 client_id: config.clientId,
//             }).then(() => {
//             console.log('here');
//             window.gapi.auth2.getAuthInstance().isSignedIn.listen(isQuizFinished);
//             isQuizFinished(window.gapi.auth2.getAuthInstance().isSignedIn.get());
//         });
//     });
//
// }
//
//
// export const setPersonalData = score => {
//
//     function isQuizFinished(isSignedIn) {
//         // if (isSignedIn) {
//             console.log(isSignedIn);
//             console.log('score', score);
//             setDataToSpreadsheets(score);
//         // }
//     }
//
//     const initClient = () => {
//
//         window.gapi.client
//             .init({
//                 apiKey: config.apiKey,
//                 discoveryDocs: config.discoveryDocs,
//                 client_id: config.clientId,
//                 scope: [config.scope]
//             }).then(() => {
//                     console.log('here', window.gapi.auth2.getAuthInstance().isSignedIn.listen(isQuizFinished));
//                     window.gapi.auth2.getAuthInstance().isSignedIn.listen(isQuizFinished);
//                     isQuizFinished(window.gapi.auth2.getAuthInstance().isSignedIn.get());
//                 });
//     };
//     window.gapi.load('auth2', initClient);
//     // window.gapi.load("client:auth2", initClient);
// }

