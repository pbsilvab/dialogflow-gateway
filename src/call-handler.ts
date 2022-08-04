import axios from "axios";
import { format } from "path";

export class Handler {
    url: string | undefined;
    statusCode: number | undefined;

    setAPIUrl(url: string): Handler {
        this.url = url
        return this
    }

    async get(endpoint: string) {
        const resp = await axios.get(`${this.url}/${endpoint}`)
        .catch((err) => {
            console.log(err)
        })

        this.statusCode = resp?.status
        return resp?.data;
    }

    async callPost(endpoint: string, body: object) {
        const resp = await axios.post(`${this.url}/${endpoint}`, body).catch((err) => {
            console.log(err)
        })
        this.statusCode = resp?.status
        return resp;
    }

    getStatusCode(): number {
        return this.statusCode ?? 0
    }
}