import express, { Application, json, Request, Response } from "express";

const app: Application = express();

app.use(json());

interface iWorkOrderRequest {
  description: string;
  mechanical: string;
  client: string;
  price: number;
}

interface iWorkOrder extends iWorkOrderRequest {
  start_date: Date;
  end_date: Date;
  id: number;
}

const orders: Array<iWorkOrderRequest> = [];
const ids: Array<number> = [];

app.post("/work-order", (req: Request, res: Response): Response => {
  const orderData: iWorkOrderRequest = req.body;
  const id: number = ids.length+1;

  const newOrderData: iWorkOrder = {
    id: id,
    start_date: new Date(),
    end_date: new Date(Date.now() + 86400 * 1000),
    ...orderData,
  };

  ids.push(id);
  orders.push(newOrderData);

  return res.status(201).json(newOrderData);
});

app.get("/", (req: Request, res: Response): Response => {
  return res.status(200).json({ data: orders });
});

const PORT: number = 3000;

const runningMsg: string = `Server running on http://localhost:${PORT}`;

app.listen(PORT, () => console.log(runningMsg));
