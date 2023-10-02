import requests
import json
import time

# import api key from .env.local file
from dotenv import load_dotenv
load_dotenv()

# load api key OPEN_SEA_API_KEY from .env.local file and assign to api_key variable
import os


url = "https://api.opensea.io/v2/collection/foundingfrens/nfts"
api_key = os.getenv("OPENSEA_API_KEY")
limit = 50
offset = 0

headers = {
    "X-API-KEY": api_key,
    "Accept": "application/json"
}

all_nfts = []

while True:
    response = requests.get(url, params={"limit": limit, "offset": offset}, headers=headers)
    
    if response.status_code != 200:
        print(f"Failed to retrieve data: {response.content}")
        break

    data = response.json()
    nfts = data.get("nfts", [])
    
    if not nfts:
        break

    # Save the nfts in a json file per page
    with open(f'foundingfrencollection-{offset}.json', 'w') as f:
        json.dump(nfts, f)

    offset += limit

    # Add a throttle to avoid hitting the rate limit of the API, define 
    time.sleep(1)
    
    # all_nfts.extend(nfts)
    # offset += limit

# Save the results into a JSON file
# with open('foundingfrencollection.json', 'w') as f:
#     json.dump(all_nfts, f)
