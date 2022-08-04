import bodyParser from 'body-parser';
import express, {Request,Response,Application, response} from 'express';
import { dialogflow } from 'actions-on-google';
import { DialogCall } from './df-call';
import { getConversation } from './conversation/getConversation';
import { create } from './conversation/create';
import { sendMsg } from './adapter/send';
const df = dialogflow({debug: true});

const app:Application = express();
const PORT = process.env.PORT || 8000;
const parser = bodyParser.json()
app.use(parser)

app.get("/", (req:Request, res:Response):void => {
  res.send("Hello Typescript with Node.js!")
});
app.post("/webhjook/dialogflow", (req:Request, res:Response):void => {
  const dfc = new DialogCall().setPayload(req.body)
  const hash  = dfc.getSession(true)
  console.log(hash);
  if (!hash) {
    res.send("Hello Typescript with Node.js!")
    return
  }

  let userparams = {
    ...dfc.getParams()?.parameters,
    hash: hash
  }

  getConversation(hash)
  .then((data) => {
    create(hash, userparams)
  })

  const allParams = dfc.allRequiredParams()

  if (!allParams) {
    res.send("Hello Typescript with Node.js!")
    return;
  }

  const complements = [
    {
      action: "conversation",
      param: {
        token: "456da9af44359f590b6a6a751b17451c",
        hash
      }
    },
    {
      action: "user_data",
      param: {
        id: "1001-202202170",
        hash,
        picture: null,
        firstname: null,
        lastname: null,
        email: "dpineda@aivo.co",
        phone: null,
        country: null,
        state: null,
        city: null,
        ip: null
      }
    }
  ];

  console.log("Consultando a adapter", dfc.getDetectedIntention())
  const sendmsj = sendMsg(dfc.getDetectedIntention(), complements);
  sendmsj.data
  .then((data) => {
    console.log(data?.data)
    const response = {
      "fulfillmentMessages": [
        {
          "text": {
            "text": [
              `${data?.data.text}`
            ]
          }
        }
      ]
    }
    res.send(response)
  })
  .catch((err) => {
    console.log("err", err);
    res.send("Hello Typescript with Node.js!")
  })
});
app.listen(PORT, ():void => {
  console.log(`Server Running here 👉 https://localhost:${PORT}`);
});