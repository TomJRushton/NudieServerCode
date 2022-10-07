export async function SendAPIPost(Response){
    const URLAddition = await FormatAPICall(Response)

    const APIUrl = "https://xbo7nsndj7.execute-api.us-west-1.amazonaws.com/default/ShopSQSPost" + URLAddition
    console.log(APIUrl)

    const APIResponse = fetch(APIUrl, {
                                method: 'POST',
                            })
                        .then((response) => response.json())
                        .then((actualData) => printResponse(actualData))
                        .catch((err) => {
                            console.log(err.message);
                        });
    console.log(APIResponse)
    var resposeFromAPI = await APIResponse
    var statusCode = resposeFromAPI.status

    return statusCode
}

export async function SendProposalAPIPost(Response){
    const URLAddition = await FormatAPICall(Response)

    const APIUrl = "https://6tfsz9ijz4.execute-api.us-west-1.amazonaws.com/default/ProposalSQS" + URLAddition
    console.log(APIUrl)

    const APIResponse = fetch(APIUrl, {
                                method: 'POST',
                            })
                        .then((response) => response.json())
                        .then((actualData) => printResponse(actualData))
                        .catch((err) => {
                            console.log(err.message);
                        });
    console.log(APIResponse)
    var resposeFromAPI = await APIResponse
    var statusCode = resposeFromAPI.status
    console.log(statusCode)

    return statusCode
}

async function printResponse(data){
    console.log(data)
}

async function FormatAPICall(ResponseString){
    var APIString

    APIString = "?" + "message=" + ResponseString.message + "&" + "signature=" + ResponseString.signature + "&" + "address=" + ResponseString.address
    console.log(APIString)

    return APIString
}

