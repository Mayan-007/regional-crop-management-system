import express from "express";
import cors from "cors";

import routes from "./routes";
import aiRoutes from "./ai/routes/ai.routes";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (_req, res) => {
	res.json({
		message: "Regional Crop Management API Running",
	});
});

app.use("/api", routes);

app.use("/api/ai", aiRoutes);

export default app;
