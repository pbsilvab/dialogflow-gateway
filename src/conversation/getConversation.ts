import { Handler } from "../call-handler"

const apiurl = "https://conversation-user.aivo.co/api/v1/users"
const handler = new Handler().setAPIUrl(apiurl)

const getConversation = async (hash: string) => {
    const resp = (await handler.get(hash))
    return {
        status: handler.getStatusCode(),
        data: resp
    }
}

export {
    getConversation
}