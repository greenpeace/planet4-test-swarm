import json
import requests

JIRA_API_QUERY='https://jira.greenpeace.org/rest/api/2/search?jql=project%20%3D%20PLANET%20AND%20status%20in%20(%22IN%20PROGRESS%22%2C%20%22IN%20DEVELOPMENT%22%2C%20%22IN%20TESTING%22%2C%20%22In%20Review%22)%20AND%20Track%20in%20(Development%2C%20Infra)&fields=summary,customfield_13000'

BLOCKS_ENDPOINT='https://api.github.com/repos/greenpeace/planet4-plugin-gutenberg-blocks/issues?state=open&labels=env-test-{0}'
THEME_ENDPOINT='https://api.github.com/repos/greenpeace/planet4-master-theme/issues?state=open&labels=env-test-{0}'

# https://namingschemes.com/Solar_System
SWARM = {
    'atlas': 1,
    'deimos': 1,
    'iocaste': 1,
    'janus': 1,
    'jupiter': 1,
    'leda': 1,
    'mars': 1,
    'neptune': 1,
    'nix': 1,
    'oberon': 1,
    'pandora': 1,
    'phobos': 1,
    'phoebe': 1,
    'pluto': 1,
    'proteus': 1,
    'rhea': 1,
    'saturn': 1,
    'sinope': 1,
    'tavros': 1,
    'telesto': 1,
    'titan': 1,
    'umbriel': 1,
    'uranus': 1,
    'venus': 1
}


def main(request):
    response = requests.get(JIRA_API_QUERY, verify=False)

    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '1800',
        'Content-Type': 'application/json'
    }

    binary = response.content
    data = json.loads(binary)

    for ticket in data['issues']:
        fields = ticket['fields']
        environments = fields['customfield_13000']
        if environments:
            for item in environments:
                env = item['value']
                if env in SWARM:
                    SWARM[env] = ticket['key']

    for name in SWARM:
        theme_response = requests.get(THEME_ENDPOINT.format(name)
        print(theme_response)
        blocks_response = requests.get(BLOCKS_ENDPOINT.format(name)
        print(blocks_response)


    output = json.dumps(SWARM)

    return (output, 200, headers)
