import { createHash, Hash } from "crypto";

interface Intent {
    name: string;
    displayName: string;
}
interface QueryResult {
    queryText: string;
    speechRecognitionConfidence: number;
    parameters: object;
    allRequiredParamsPresent: boolean;
    fulfillmentText: string;
    intent: Intent;
    intentDetectionConfidence: number
}
interface DfPayload {
    responseId: string;
    queryResult: QueryResult;
    originalDetectIntentRequest: OriginalDetection;
    session: string
}
interface OriginalDetection {
    source: string;
    payload: object;
}

export class DialogCall {
    pl: DfPayload | undefined;

    setPayload = (object: DfPayload): DialogCall => {
        this.pl = object
        return this
    }
    getSession = (hashed: boolean) => {
        if (!hashed) {
            return this.pl?.session
        }

        const str = this.pl?.session;

        if (!str) {
            return this.pl?.session
        }

        return createHash("sha256").update(str).digest("hex")
    }
    getParams = (): QueryResult | undefined => {
        return this.pl?.queryResult;
    }
    getDetectedConfidence = (): number => {
        return this.pl?.queryResult.speechRecognitionConfidence ?? 0
    }
    getQueryText = (): string => {
        return this.pl?.queryResult.queryText ?? ""
    }
    getDetectedIntention = (): string => {
        return this.pl?.queryResult.intent.displayName ?? ""
    }
    allRequiredParams = (): boolean => {
        return this.pl?.queryResult.allRequiredParamsPresent ?? false
    }
}

