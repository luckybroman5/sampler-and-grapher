
## What is this?

This is a simple tool that uses the popular google charts js library to take results from autocannon and display them in a pretty UI

## What is nice about it?

Simply running autocannon with the `-j` flag (to pipe the output as cdjson) and pointing this script at the file will create a html page that auto updates as new data comes in!

## Setup:

Install Autocannon
```
npm install -g autocannon
```

Install Deps:

```
npm install
```

## Usage

```
$ autocannon -j localhost:4140/screens_v1/screens/home >> $FILE_LOCATION

## Or to have a continuously running test:
$ autocannon -f -j localhost:4140/screens_v1/screens/home >> $FILE_LOCATION
```

Then just run this script, pointing at the directory of where autocannon is pointing above:

```
$ node index.js $FILE_LOCATION
GENERATING REPORT:  /home/kade/code/sampler-and-grapher/output/video-on0.html  Open in any browser!
```

As new data from autocannon comes in, the report will be automatically regenerated and the html page will refresh!
