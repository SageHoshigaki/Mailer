import Bull from "bull";
import { client } from "@utils/redis";
import { processDocument } from "@utils/processDocument";

//Producer
export const puppetQueue = new Bull("puppetQueue", {
  redis: client,
});

//Consumer
puppetQueue.process(async (job) => {
  const { documentUrl, documentId } = job.data;
  await processDocument(documentUrl, documentId);
});
