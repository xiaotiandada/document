# Fiber

- https://github.com/ValenW/fed-e-task-04-01/blob/101958bc7e0ded15e033444fa287e8b96cf037c7/notes/12%20React.md

## Init

- https://github.com/Microsoft/TypeScript-Babel-Starter
- https://github.com/xiaotiandada/blog/issues/115

Babel 7 不需要 ts-loader。从 Babel 7 开始，ts-loader是不必要的，因为 Babel 7 支持 TypeScript。

 

## Tsx

```tsx
const tsx = <div>Hello</div>;
console.log('tsx', tsx);

{
    "type": "div",
    "props": {
        "children": [
            {
                "type": "text",
                "props": {
                    "children": [],
                    "textContent": "Hello"
                }
            }
        ]
    }
}
```

