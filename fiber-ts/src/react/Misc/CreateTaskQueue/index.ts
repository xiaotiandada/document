const createTaskQueue = () => {
  const taskQueue: any[] = [];
  return {
    push: (item: any) => taskQueue.push(item),
    pop: () => taskQueue.shift(),
    isEmpty: () => taskQueue.length === 0,
  };
};

export default createTaskQueue;
