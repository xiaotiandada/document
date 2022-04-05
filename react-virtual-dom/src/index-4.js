function sleep(d) {
  for (let t = Date.now(); Date.now() - t <= d; );
}

const works = [
  () => {
    console.log("1start");
    sleep(20);
    console.log("1end");
  },
  () => {
    console.log("2start");
    sleep(10);
    console.log("2end");
  },
  () => {
    console.log("3start");
    sleep(2);
    console.log("3end");
  },
];

requestIdleCallback(workLoop);

function workLoop(deadline) {
  console.log("本帧剩余时间", parseInt(deadline.timeRemaining()));
  console.log("deadline", deadline, deadline.timeRemaining());

  while (deadline.timeRemaining() > 1 && works.length > 0) {
    performUnitWork();
  }

  if (works.length > 0) {
    console.log(
      `只剩下${parseInt(
        deadline.timeRemaining()
      )}ms,时间片到了等待下次空闲时间的调度`
    );

    requestIdleCallback(workLoop);
  }
}

function performUnitWork() {
  const work = works.shift();
  work();
}
