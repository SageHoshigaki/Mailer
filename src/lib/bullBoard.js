// lib/bullBoard.js
import { createBullBoard } from "bull-board";
import { BullAdapter } from "bull-board/bullAdapter";
import { puppetQueue } from "@queue/puppetQueue";

const { router: bullBoardRouter, setQueues } = createBullBoard([
  new BullAdapter(puppetQueue),
]);

export { bullBoardRouter };
