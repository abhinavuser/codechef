# codechef
### BACKEND ###
## API Documentation

### /generate

**Description:** Generates an HTML page using a template and content.

Request Format:
json
{
    "template": "<html><body><div id='content'></div></body></html>",
    "content": "This is the content."
}

Response Format:

json
{
    "result": "<html><body><div id='content'>This is the content.</div></body></html>"
}

### /modify

**Description:** Modifies an HTML page using html code and instructions from user.

Request Format:

json
{
    "html_code": "<html><head><title>Old Title</title></head><body></body></html>",
    "instructions": "change title to 'New Title'"
}

Response Format:

json
{
    "result": "<html><body><div id='content'>This is the content.</div></body></html>"
}