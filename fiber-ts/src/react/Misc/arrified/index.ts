const arrified = (args: any[] | object): any[] =>
  Array.isArray(args) ? args : [args];

export default arrified;
