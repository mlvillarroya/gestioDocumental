import json

# load a json file
# Specify the path to the JSON file
file_path = 'file.json'

# Load the JSON file
with open(file_path, 'r') as file:
    data = json.load(file)
for file in data['files']:
    if ('name' in file.keys()):
        title = file['name']
        content = file['source']
        # Generate a file with the title and the content variables
        with open(title + '.txt', 'w') as file:
            file.write(content)