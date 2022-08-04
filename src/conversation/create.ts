import { Handler } from "../call-handler"

const apiurl = "https://conversation-user.aivo.co/api/v1/users"
const handler = new Handler().setAPIUrl(apiurl)


const create = async (hash: string, userData : {}) => {
    const resp = (await handler.callPost(hash, userData))
    return {
        status: handler.getStatusCode(),
        data: resp
    }
}

export {
    create
}