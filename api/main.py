import json
import requests

JIRA_API_QUERY='https://jira.greenpeace.org/rest/api/2/search?jql=project%20%3D%20PLANET%20AND%20status%20in%20(%22IN%20PROGRESS%22%2C%20%22IN%20DEVELOPMENT%22%2C%20%22IN%20TESTING%22%2C%20%22In%20Review%22)%20AND%20Track%20in%20(Development%2C%20Infra)&fields=environment,summary'

# https://namingschemes.com/Solar_System
SWARM = {
    'venus': 1,
    'mars': 1,
    'jupiter': 1,
    'saturn': 1,
    'uranus': 1,
    'neptune': 1,
    'pluto': 1,
    'phobos': 1,
    'deimos': 1,
    'titan': 1,
    'pandora': 1,
    'phoebe': 1,
    'tavros': 1,
    'iocaste': 1,
    'atlas': 1
}


def main(request):
    response = requests.get(JIRA_API_QUERY)

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
        env = fields['environment']
        if env in SWARM:
            SWARM[env] = ticket['key'];

    output = json.dumps(SWARM)

    return (output, 200, headers)
