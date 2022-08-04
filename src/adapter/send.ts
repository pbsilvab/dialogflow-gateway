import { Handler } from "../call-handler"

const apiurl = "https://adapter.aivo.co/api/v1/voice"
const handler = new Handler().setAPIUrl(apiurl)

interface Complements {
    action: string
    param: object
}

interface AdapterBody {
    text: string;
    complements: Complements[];
}

const sendMsg = (text: string, complements: Complements[]) => {
    const adapterBody: AdapterBody = {
        text,
        complements: complements
    }
    const resp = handler.callPost("messages", adapterBody)
    return {
        status: handler.getStatusCode(),
        data: resp
    }
}

export {
    sendMsg
}