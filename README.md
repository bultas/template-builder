# Pages Template builder

Tool for build Templates for Pages platform

## Get started

1.  `npm install` or `yarn install`

2.  `npm start`

3.  go to `localhost:3000/yourTemplateID`

## Commands

### `npm start` or `npm run watch-and-preview`

start server for simple Template development and build Templates for Editor

### `npm run watch`

watch templates folder and auto rebuild template after change

###`npm run build-templates`
one-off build all Templates to use in Editor

###`npm run preview-templates`
start server for simple Template development (without any build)

### `npm run clean`

remove dist folder where are builded versions of Templates (for Editor)

## Examples

### template.json

```
{
  "id": "template",
  "name": "Template",
  "fields": [
    {
      "id": "name",
      "type": "input",
      "label": "Example",
      "placeholder": "Example",
      "defaultValue": "Hello World",
      "group": "group1"
    }
  ],
  "groups": [
    {
      "id": "group1",
      "name": "Group Name"
    }
  ]
}
```

### template.html

```
<style>
  body {
    margin: 0;
    height: 100%;
  }
</style>
<div>
  <div class="content">
    <h1>Hi {{ page.name }}</h1>
  </div>
</div>
```
