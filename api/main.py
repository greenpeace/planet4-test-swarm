from base64 import b64decode
from jira import JIRA
import json
import os

JIRA_SERVER = 'https://greenpeace-planet4.atlassian.net/'
JQL = 'project=PLANET and status in ("IN DEVELOPMENT", "IN REVIEW")'
JIRA_USER = os.getenv('JIRA_USER')
JIRA_TOKEN = os.getenv('JIRA_TOKEN')

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
    'venus': 1
}

HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '1800',
    'Content-Type': 'application/json'
}


def main(request):
    token = b64decode(JIRA_TOKEN).decode('utf-8').replace('\n', '')
    jira = JIRA(server=JIRA_SERVER, basic_auth=(JIRA_USER, token))

    tickets = jira.search_issues(JQL)

    for ticket in tickets:
        if ticket.fields.customfield_10201:
            instance = ticket.fields.customfield_10201.value
            if instance in SWARM:
                SWARM[instance] = ticket.key

    output = json.dumps(SWARM)

    return (output, 200, HEADERS)
